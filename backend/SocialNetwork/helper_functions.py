import json
from SocialNetwork.models import *
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

def get_user_data(email, password):
  try:
    user = User.objects.get(email = email, password = password)
    user_data = serializers.serialize('json', [user])
    response = make_success_response(user_data)
  except:
    response = make_error_response('Incorrect email or password')
  return response