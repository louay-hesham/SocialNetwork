from django.http import HttpResponse
from SocialNetwork.helper_functions import *
from backend.models import *
import json

def register(request):
  data = extract_data(request)
  try:
    user = User.objects.get(email = data['email'])
    response = make_error_response('Email already used')
  except:
    user = User()
    
    user.email = data['email']
    user.firstname = data['firstName']
    user.lastname = data['lastName']
    user.password = decode_password(data['password'])
    user.gender = data['gender']
    user.birthdate = data['birthdate']

    # user.nickname = data['nickname']
    # user.phone = data['phone']
    # user.profilepic = data['profilePic']
    # user.hometown = data['hometown']
    # user.maritalstatus = data['maritalStatus']
    # user.aboutme = data['aboutMe']
    user.save()
    print('of a7')
    response = make_success_response(data)
  return HttpResponse(json.dumps(response))