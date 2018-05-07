from django.http import HttpResponse
import json

def test(request):
  return HttpResponse(json.dumps('of a7'))