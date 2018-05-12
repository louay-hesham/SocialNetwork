import json, sys, base64
from backend.models import *
from django.core import serializers

def decode_password(password):
  numbers = password['words']
  n = int(password['sigBytes'] / 8)
  hashed = bytes([])
  for b in numbers:
    if b < 0:
      b = abs(b)
    hashed += b.to_bytes(n, 'big')
  return hashed

def extract_data(request):
  json_string = request.body.decode()
  return json.loads(json_string)

def make_error_response(message):
  return {
    'status': 'error',
    'error_message': message
  }

def make_success_response(data):
  return {
    'status': 'success',
    'data': data
  }

def jsonify_user(user):
  if user.profilepic == None:
    pp = None
  else :
    pp = base64.b64encode(user.profilepic).decode()
  return {
    'email': user.email,
    'firstname': user.firstname,
    'lastname': user.lastname,
    'nickname': user.nickname,
    'password': user.password,
    'phone': user.phone,
    'gender': user.gender,
    'birthdate': str(user.birthdate),
    'profilepic': pp,
    'hometown': user.hometown,
    'maritalstatus':user.maritalstatus,
    'aboutme': user.aboutme
  }

def get_user_data(email, password):
  try:
    user = User.objects.get(email = email, password = password)
    user_data = jsonify_user(user)
    response = make_success_response(user_data)
  except Exception as e :
    print(e)
    print(sys.exc_info()[0], sys.exc_info()[1], sys.exc_info()[2])
    # raise e
    response = make_error_response('Incorrect email or password')
  return response


def decode_base64(data):
 if '=' in data:
  data = data[:data.index('=')]
 missing_padding = len(data) % 4
 if missing_padding == 1:
  data += 'A=='
 elif missing_padding == 2:
  data += '=='
 elif missing_padding == 3:
  data += '='
 return base64.b64decode(data)

def jsonify_requests(requests): 
  return [jsonify_user(request.user1) for request in requests]

def jsonify_friends(friends1, friends2):
  friends_data = [jsonify_user(friendship.user2) for friendship in friends1]
  friends_data += [jsonify_user(friendship.user1) for friendship in friends2]
  return friends_data
