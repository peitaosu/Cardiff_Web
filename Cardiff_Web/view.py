from django.http import HttpResponse

import os, sys, inspect, StringIO
current_path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
cardiff_path = os.path.join(os.path.dirname(current_path), "Cardiff")
sys.path.insert(0, cardiff_path)

from Cardiff import Cardiff

cardiff = Cardiff()
cardiff_settings_path = os.path.join(cardiff_path, "settings.json")
cardiff.load_settings(cardiff_settings_path)

def info(request):
    origin_stdout = sys.stdout
    sys.stdout = s = StringIO.StringIO()
    cardiff.exec_cmd(["info"])
    return HttpResponse(s.getvalue())
