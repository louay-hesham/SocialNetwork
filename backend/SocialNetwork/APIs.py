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

    if 'nickname' in data:
      user.nickname = data['nickname']
    if 'phone' in data:
      user.phone = data['phone']
    if 'profilePic' in data:
      user.profilepic = data['profilePic']
    if 'hometown' in data:
      user.hometown = data['hometown']
    if 'maritalStatus' in data:
      user.maritalstatus = data['maritalStatus']
    if 'aboutMe' in data:
      user.aboutme = data['aboutMe']
    user.save()
    response = get_user_data(user.email, user.password)
  return HttpResponse(json.dumps(response))


def login(request):
  data = extract_data(request)
  email = data['email']
  hashed_password = decode_password(data['password'])
  response = get_user_data(email, hashed_password)
  return HttpResponse(json.dumps(response))

def hashed_login(request):
  data = extract_data(request)
  email = data['email']
  hashed_password = data['password']
  response = get_user_data(email, hashed_password)
  return HttpResponse(json.dumps(response))
