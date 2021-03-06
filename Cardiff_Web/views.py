from django.http import HttpResponse
from django.shortcuts import render
from django.utils.encoding import smart_str

import os, sys, inspect, StringIO, shutil, time, json, base64
current_path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
cardiff_path = os.path.join(os.path.dirname(current_path), "Cardiff")
sys.path.insert(0, cardiff_path)

from Cardiff import Cardiff

cardiff = Cardiff()
cardiff_settings_path = os.path.join(cardiff_path, "settings.json")

temp_path = os.path.join(".", "temp")

def is_set(value):
    if value.startswith("<") and value.endswith(">"):
        return False
    else:
        return True

def load():
    cardiff.load_settings(cardiff_settings_path)

def save():
    cardiff.save_settings(cardiff_settings_path)

def image_to_base64(image):
    with open(image, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        image_ext = image.split(".")[-1]
        return "data:image/{0};base64,{1}".format(image_ext, encoded_string)

load()
os.environ["SILENT_MODE"] = "1"

def default(request):
    context = {}
    context["vcs"] = cardiff.settings["vcs"]
    if not is_set(cardiff.settings["repo"]["current"]):
        context["repo_set"] = False
        if not is_set(cardiff.settings["user.name"]):
            context["name_set"] = False
        else:
            context["signed"] = cardiff.settings["user.name"]
            context["name_set"] = cardiff.settings["user.name"]
        if not is_set(cardiff.settings["user.email"]):
            context["email_set"] = False
        else:
            context["email_set"] = cardiff.settings["user.email"]
        return render(request, "prepare.html", context)
    else:
        return repo(request)

def login(request):
    if "username" in request.GET:
        cardiff.settings["user.name"] = request.GET["username"]
    if "useremail" in request.GET:
        cardiff.settings["user.email"] = request.GET["useremail"]
    save()
    return default(request)

def logout(request):
    cardiff.settings["user.name"] = "<username>"
    cardiff.settings["user.email"] = "<useremail>"
    save()
    return default(request)

def about(request):
    context = cardiff.settings["information"]
    if is_set(cardiff.settings["user.name"]):
        context["signed"] = cardiff.settings["user.name"]
    return render(request, "about.html", context)

def explore(request):
    context = {}
    if is_set(cardiff.settings["user.name"]):
        context["signed"] = cardiff.settings["user.name"]
    current_repo = cardiff.settings["repo"]["current"].split("/")[-1]
    other_repos = list( o_repo.split("/")[-1] for o_repo in cardiff.settings["repo"]["others"])
    repo_list = []
    repo_list.append(current_repo)
    repo_list.extend(other_repos)
    new_repo_list = zip(repo_list[::2], repo_list[1::2])
    if len(repo_list) % 2:
        new_repo_list.append((repo_list[-1], None))
    context["repo_list"] = new_repo_list
    return render(request, "explore.html", context)

def search(request):
    context = {}
    if is_set(cardiff.settings["user.name"]):
        context["signed"] = cardiff.settings["user.name"]
    if "keyword" not in request.GET or request.GET["keyword"] == "":
        return default(request)
    keywords = request.GET["keyword"].split()
    context["keywords"] = keywords
    return render(request, "search.html", context)

def settings(request):
    context = {
        "cardiff": cardiff.settings
        }
    if is_set(cardiff.settings["user.name"]):
        context["signed"] = cardiff.settings["user.name"]
    if request.method == "POST":
        for key in request.POST:
            cardiff.settings[key] = request.POST[key]
        save()
        context["saved"] = True
    return render(request, "settings.html", context)

def files(request):
    context = {}
    if "checkout" in request.GET:
        file_to_checkout = request.GET["checkout"]
        file_version = request.GET["version"]
        cardiff.exec_cmd(["checkout", file_to_checkout, file_version])
        file_path = os.path.join(cardiff.settings["repo"]["current"], file_to_checkout)
        context["file_path"] = file_path
    if "download" in request.GET:
        file_to_checkout = request.GET["download"]
        file_version = request.GET["version"]
        cardiff.exec_cmd(["checkout", file_to_checkout, file_version])
        file_path = os.path.join(cardiff.settings["repo"]["current"], file_to_checkout)
        context["file_path"] = file_path
        response = HttpResponse(file(file_path))
        response['Content-Type'] = 'application/force-download'
        response['Content-Length'] = os.path.getsize(file_path)
        response['Content-Disposition'] = 'attachment; filename=%s' % smart_str(file_to_checkout)
        response['Accept-Ranges'] = 'bytes'
        return response
    if "diff" in request.GET:
        file_to_checkout = request.GET["diff"]
        file_version = request.GET["before"]
        cardiff.exec_cmd(["checkout", file_to_checkout, file_version])
        file_path = os.path.join(cardiff.settings["repo"]["current"], file_to_checkout)
        file_format = os.path.splitext(os.path.basename(file_path))[-1]
        temp_file_name = os.path.basename(file_path).replace(file_format, "")
        temp_file_before = os.path.join(temp_path, temp_file_name + str(time.time()) + file_format)
        if not os.path.isdir(temp_path):
            os.mkdir(temp_path)
        shutil.copyfile(file_path, temp_file_before)
        context["temp_file"] = os.path.basename(temp_file_before)
        version_to_diff = request.GET["after"]
        cardiff.exec_cmd(["checkout", file_to_checkout, version_to_diff])
        temp_file_after = os.path.join(temp_path, temp_file_name + str(time.time()) + file_format)
        shutil.copyfile(file_path, temp_file_after)
        context["temp_file_to_diff"] = os.path.basename(temp_file_after)
        file_diffs = cardiff.exec_cmd(["diff", file_to_checkout, file_version, version_to_diff])
        diff_before_name = os.path.basename(file_diffs[0])
        diff_before = os.path.join(temp_path, diff_before_name)
        shutil.copyfile(file_diffs[0], diff_before)
        context["temp_file_diff_before"] = diff_before_name
        diff_after_name = os.path.basename(file_diffs[1])
        diff_after = os.path.join(temp_path, diff_after_name)
        shutil.copyfile(file_diffs[1], diff_after)
        context["temp_file_diff_after"] = diff_after_name
        with open(file_diffs[2], "r") as file_diff_parameters:
            context["temp_file_diff_parameters"] = json.load(file_diff_parameters)
        diff_type = {
            "image": "diffview/image.html"
        }
        if file_format in [".jpg", ".png", ".bmp", ".gif"]:
            context = {
                "file1": image_to_base64(temp_file_before),
                "file2": image_to_base64(temp_file_after)
            }
            if "changes" in request.GET:
                context = {
                    "file1": image_to_base64(diff_before),
                    "file2": image_to_base64(diff_after)                    
                }
            return render(request, diff_type["image"], context)
    return default(request)

def view(request):
    context = {
        "diff": request.GET["diff"],
        "before": request.GET["before"],
        "after": request.GET["after"],
        "aspect_ratio": "80%",
        "diff_view": True
    }
    return render(request, "view.html", context)

def branch(request):
    if "name" in request.GET:
        cardiff.exec_cmd(["branch", request.GET["name"]])
    return repo(request)

def repo(request):
    context = {}
    context["vcs"] = cardiff.settings["vcs"]
    if not is_set(cardiff.settings["user.name"]):
        context["name_set"] = False
    else:
        context["signed"] = cardiff.settings["user.name"]
        context["name_set"] = cardiff.settings["user.name"]
    if not is_set(cardiff.settings["user.email"]):
        context["email_set"] = False
    else:
        context["email_set"] = cardiff.settings["user.email"]
    if not is_set(cardiff.settings["repo"]["current"]) and request.method != "GET" and "init" not in request.GET:
        context["repo_set"] = False
        return render(request, "prepare.html", context)
    if is_set(cardiff.settings["repo"]["current"]):
        vcs = cardiff.setup_vcs()
    if request.method == "GET":
        if "init" in request.GET:
            if "username" in request.GET:
                cardiff.settings["user.name"] = request.GET["username"]
            if "useremail" in request.GET:
                cardiff.settings["user.email"] = request.GET["useremail"]
            initial_succeed = cardiff.exec_cmd(["init", request.GET["init"]])
            if not initial_succeed:
                context["initial_failed"] = True
                context["initial_info"] = {
                    "repo": request.GET["init"],
                    "username": cardiff.settings["user.name"],
                    "useremail": cardiff.settings["user.email"]
                }
                return render(request, "alert.html", context)
            save()
        if "switch" in request.GET:
            repo_to_switch = request.GET["switch"]
            cardiff.exec_cmd(["repo", repo_to_switch])
            save()
        vcs = cardiff.setup_vcs()
    if request.method == "POST":
        if "commit_file" in request.FILES:
            up_file = request.FILES["commit_file"]
            up_file_name = up_file.name
            save_location = os.path.join(cardiff.settings["repo"]["current"], up_file_name)
            with open(save_location, 'wb+') as destination:
                for chunk in up_file.chunks():
                    destination.write(chunk)
            context["uploaded"] = up_file_name
            context["save_loc"] = save_location
        if "commit_msg" in request.POST:
            up_file = request.POST["uploaded_file"]
            commit_msg = request.POST["commit_msg"]
            cardiff.exec_cmd(["commit", up_file, commit_msg])
            context["committed"] = up_file
    context["current_repo"] = cardiff.settings["repo"]["current"].split("/")[-1]
    context["other_repo"] = list( o_repo.split("/")[-1] for o_repo in cardiff.settings["repo"]["others"])
    context["current_branch"] = cardiff.vcs_current_branch
    context["other_branches"] = cardiff.vcs_branches["other"]
    context["commit_logs"] = reversed(cardiff.vcs.get_commits())
    return render(request, "repo.html", context)
