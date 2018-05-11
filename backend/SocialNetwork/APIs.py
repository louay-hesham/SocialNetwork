from django.http import HttpResponse
from SocialNetwork.helper_functions import *
import json

def register(request):
  data = extract_data(request)
  print(data);
  response = make_success_response(data)
  return HttpResponse(json.dumps(response))