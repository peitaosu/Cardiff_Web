from django.http import HttpResponse
from django.shortcuts import render
from django.utils.encoding import smart_str

import os, sys, inspect, StringIO, shutil, time, json
current_path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
cardiff_path = os.path.join(os.path.dirname(current_path), "Cardiff")
sys.path.insert(0, cardiff_path)

from Cardiff import Cardiff

cardiff = Cardiff()
cardiff_settings_path = os.path.join(cardiff_path, "settings.json")

repo_path = os.path.join(".", "repositories")
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

load()
os.environ["SILENT_MODE"] = "1"

def index(request):
    context = {}
    context["vcs"] = cardiff.settings["vcs"]
    if not is_set(cardiff.settings["repo"]["current"]):
        context["repo_set"] = False
        if not is_set(cardiff.settings["user.name"]):
            context["name_set"] = False
        else:
            context["name_set"] = cardiff.settings["user.name"]
        if not is_set(cardiff.settings["user.email"]):
            context["email_set"] = False
        else:
            context["email_set"] = cardiff.settings["user.email"]
        return render(request, "prepare.html", context)
    else:
        return repo(request)

def response_console_output(func):
    def new_func(*args, **kwargs):
        console_output = StringIO.StringIO()
        sys.stdout = console_output
        func(*args, **kwargs)
        sys.stdout = sys.__stdout__
        return HttpResponse(["<BR>" if char == "\n" else char for char in console_output.getvalue()])
    return new_func

def init(request):
    if not os.path.isdir(repo_path):
        os.mkdir(repo_path)
    if "username" in request.GET:
        cardiff.settings["user.name"] = request.GET["username"]
    if "useremail" in request.GET:
        cardiff.settings["user.email"] = request.GET["useremail"]
    if "repo" in request.GET:
        init_result = cardiff.exec_cmd(["init", os.path.join(repo_path, request.GET["repo"])])
    context = {}
    context["initial_result"] = init_result
    if init_result:
        save()
        return repo(request)
    else:
        context["initial_info"] = {
            "repo": request.GET["repo"],
            "username": cardiff.settings["user.name"],
            "useremail": cardiff.settings["user.email"]
        }
        return render(request, "error.html", context)

def about(request):
    context = cardiff.settings["information"]
    return render(request, "about.html", context)

def explore(request):
    context = {}
    return render(request, "explore.html", context)

def settings(request):
    context = {
        "cardiff": cardiff.settings
        }
    return render(request, "settings.html", context)

def imagediffview(request):
    context = {
        "file1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAADH0lEQVR4nO3UAQkAQRDEsFl4/2pO4AtpArXQ2967bZJ6fbsBUQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYQYAYT8G2QdkN37KsAAAAABJRU5ErkJggg==",
        "file2": "data:image/png;base64,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"
    }
    diff_type = {
        "image": "imagediffview.html"
    }
    return render(request, diff_type["image"], context)

def repo(request):
    context = {}
    if request.method == "GET":
        if "init" in request.GET:
            if "username" in request.GET:
                cardiff.settings["user.name"] = request.GET["username"]
            if "useremail" in request.GET:
                cardiff.settings["user.email"] = request.GET["useremail"]
            cardiff.exec_cmd(["init", request.GET["init"]])
            save()
        if "repo" in request.GET:
            repo_to_switch = os.path.join(repo_path, request.GET["repo"])
            cardiff.exec_cmd(["repo", repo_to_switch])
            save()
        if "branch" in request.GET:
            branch_to_switch = request.GET["branch"]
            context["branch_ret_str"] = cardiff.exec_cmd(["branch", branch_to_switch])
        vcs = cardiff.setup_vcs()
        if "version" in request.GET:
            file_to_checkout = request.GET["file"]
            file_version = request.GET["version"]
            cardiff.exec_cmd(["checkout", file_to_checkout, file_version])
            file_path = os.path.join(cardiff.settings["repo"]["current"], file_to_checkout)
            if "download" in request.GET:
                response = HttpResponse(file(file_path))
                response['Content-Type'] = 'application/force-download'
                response['Content-Length'] = os.path.getsize(file_path)
                response['Content-Disposition'] = 'attachment; filename=%s' % smart_str(file_to_checkout)
                response['Accept-Ranges'] = 'bytes'
                return response
            file_format = os.path.splitext(os.path.basename(file_path))[-1]
            temp_file_name = os.path.basename(file_path).replace(file_format, "")
            temp_file = os.path.join(temp_path, temp_file_name + str(time.time()) + file_format)
            if not os.path.isdir(temp_path):
                os.mkdir(temp_path)
            shutil.copyfile(file_path, temp_file)
            context["temp_file"] = os.path.basename(temp_file)
            if "diff" in request.GET:
                version_to_diff = request.GET["diff"]
                cardiff.exec_cmd(["checkout", file_to_checkout, version_to_diff])
                temp_file = os.path.join(temp_path, temp_file_name + str(time.time()) + file_format)
                shutil.copyfile(file_path, temp_file)
                context["temp_file_to_diff"] = os.path.basename(temp_file)
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
    context["current_repo"] = cardiff.settings["repo"]["current"]
    context["other_repo"] = cardiff.settings["repo"]["others"]
    context["current_branch"] = cardiff.vcs_current_branch
    context["commit_logs"] = cardiff.vcs.log()
    return render(request, "repo.html", context)
