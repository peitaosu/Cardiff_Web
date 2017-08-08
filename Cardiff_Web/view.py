from django.http import HttpResponse
from django.shortcuts import render
from django.utils.encoding import smart_str

import os, sys, inspect, StringIO, shutil, time
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

def index(request):
    context = {}
    context["vcs"] = cardiff.settings["vcs"]
    if not is_set(cardiff.settings["repo"]["current"]):
        context["repo_set"] = False
        if not is_set(cardiff.settings["user.name"]):
            context["name_set"] = False
        if not is_set(cardiff.settings["user.email"]):
            context["email_set"] = False
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

@response_console_output
def init(request):
    if not os.path.isdir(repo_path):
        os.mkdir(repo_path)
    if "username" in request.GET:
        cardiff.settings["user.name"] = request.GET["username"]
    if "useremail" in request.GET:
        cardiff.settings["user.email"] = request.GET["useremail"]
    if "repo" in request.GET:
        cardiff.exec_cmd(["init", os.path.join(repo_path, request.GET["repo"])])
    save()

def about(request):
    context = cardiff.settings["information"]
    return render(request, "about.html", context)

def repo(request):
    if "init" in request.GET:
        if "username" in request.GET:
            cardiff.settings["user.name"] = request.GET["username"]
        if "useremail" in request.GET:
            cardiff.settings["user.email"] = request.GET["useremail"]
        cardiff.exec_cmd(["init", request.GET["init"]])
        save()
    context = {}
    vcs = cardiff.setup_vcs()
    context["current_repo"] = cardiff.settings["repo"]["current"]
    context["other_repo"] = cardiff.settings["repo"]["others"]
    context["current_branch"] = cardiff.vcs_current_branch
    context["commit_logs"] = cardiff.vcs.log()
    return render(request, "repo.html", context)

def upload(request):
    up_file = request.FILES["commit_file"]
    up_file_name = up_file.name
    save_location = os.path.join(cardiff.settings["repo"]["current"], up_file_name)
    with open(save_location, 'wb+') as destination:
        for chunk in up_file.chunks():
            destination.write(chunk)
    context = {}
    context["uploaded"] = up_file_name
    context["save_loc"] = save_location
    return render(request, "repo.html", context)

def commit(request):
    up_file = request.POST["uploaded_file"]
    commit_msg = request.POST["commit_msg"]
    cardiff.exec_cmd(["commit", up_file, commit_msg])
    context = {}
    context["committed"] = up_file
    return render(request, "repo.html", context)

def version(request):
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
    context = {}
    context["temp_file"] = os.path.basename(temp_file)
    return render(request, "repo.html", context)