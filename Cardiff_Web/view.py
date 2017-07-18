from django.http import HttpResponse

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
