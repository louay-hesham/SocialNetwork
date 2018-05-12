import json
from backend.models import *
from django.core import serializers
import base64

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
    response = make_error_response('Incorrect email or password')
  return response


# def set_profilepic(self, pp):
#         self._profilepic = base64.encodestring(pp)
