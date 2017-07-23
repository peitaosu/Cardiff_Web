from django.http import HttpResponse
from django.shortcuts import render

import os, sys, inspect, StringIO
current_path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
cardiff_path = os.path.join(os.path.dirname(current_path), "Cardiff")
sys.path.insert(0, cardiff_path)

from Cardiff import Cardiff

cardiff = Cardiff()
cardiff_settings_path = os.path.join(cardiff_path, "settings.json")
cardiff.load_settings(cardiff_settings_path)


def response_console_output(func):
    def new_func(*args, **kwargs):
        console_output = StringIO.StringIO()
        sys.stdout = console_output
        func(*args, **kwargs)
        sys.stdout = sys.__stdout__
        return HttpResponse(['<BR>' if char == '\n' else char for char in console_output.getvalue()])
    return new_func

@response_console_output
def info(request):
    cardiff.exec_cmd(["info"])

@response_console_output
def init(request):
    if "username" in request.GET:
        cardiff.settings["user.name"] = request.GET["username"]
    if "useremail" in request.GET:
        cardiff.settings["user.email"] = request.GET["useremail"]
    if "repo" in request.GET:
        cardiff.exec_cmd(["init", request.GET["repo"]])

def about(request):
    context = cardiff.settings["information"]
    return render(request, 'about.html', context)

def repo(request):
    context = {}
    vcs = cardiff.setup_vcs()
    context["current_repo"] = cardiff.settings["repo"]
    context["current_branch"] = cardiff.vcs_current_branch
    context["commit_logs"] = cardiff.vcs.log()
    return render(request, 'repo.html', context)
