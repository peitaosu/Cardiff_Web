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
