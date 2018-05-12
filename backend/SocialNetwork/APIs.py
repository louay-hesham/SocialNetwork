from django.http import HttpResponse
from SocialNetwork.helper_functions import *
from backend.models import *
import json
import base64


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

def update_profile(request):
  data = extract_data(request)
  original_email = data['originalEmail']
  original_hashed_password = decode_password(data['originalPassword'])
  try:
    user = User.objects.get(email = original_email, password = original_hashed_password)
    updated_user_data = data['updatedData']

    if 'firstName' in updated_user_data:
      user.firstname = updated_user_data['firstName']
    if 'lastName' in updated_user_data:
      user.lastname = updated_user_data['lastName']
    if 'password' in updated_user_data:
      user.password = decode_password(updated_user_data['password'])
    if 'nickname' in updated_user_data:
      user.nickname = updated_user_data['nickname']
    if 'phone' in updated_user_data:
      user.phone = updated_user_data['phone']
    if 'profilePic' in updated_user_data:
      user.profilepic = decode_base64(updated_user_data['profilePic'])
    if 'hometown' in updated_user_data:
      user.hometown = updated_user_data['hometown']
    if 'maritalStatus' in updated_user_data:
      user.maritalstatus = updated_user_data['maritalStatus']
    if 'aboutMe' in updated_user_data:
      user.aboutme = updated_user_data['aboutMe']
    user.save()
    response = get_user_data(user.email, user.password)
  except Exception as e :
    print(e)
    response = make_error_response('Incorrect password!')
  return HttpResponse(json.dumps(response))

def count_received_requests(request):
  data = extract_data(request)
  email = data['email']
  user = User.objects.get(email = email)
  requests_count = Friendship.objects.filter(user2 = user, status = 0).count()
  response = make_success_response(requests_count)
  return HttpResponse(json.dumps(response))

def get_friend_requests(request): 
  data = extract_data(request)
  email = data['email']
  user = User.objects.get(email = email)
  requests = Friendship.objects.filter(user2 = user, status = 0)
  requests_data = jsonify_requests(requests)
  response = make_success_response(requests_data)
  return HttpResponse(json.dumps(response))

def get_friends(request):
  data = extract_data(request)
  email = data['email']
  user = User.objects.get(email = email)
  friends1 = Friendship.objects.filter(user1 = user, status = 1)
  friends2 = Friendship.objects.filter(user2 = user, status = 1)
  friends_data = jsonify_friends(friends1, friends2)
  print(friends_data)
  response = make_success_response(friends_data)
  return HttpResponse(json.dumps(response))  