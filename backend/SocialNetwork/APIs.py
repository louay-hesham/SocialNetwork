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
  friends = get_all_friends(email)
  friends_data = [jsonify_user(friend) for friend in friends]
  response = make_success_response(friends_data)
  return HttpResponse(json.dumps(response))

def accept_friend_request(request):
  data = extract_data(request)
  user = User.objects.get(email = data['accepter'])
  friend = User.objects.get(email = data['friend'])
  friendship = Friendship.objects.get(user1 = friend, user2 = user)
  friendship.status = 1
  friendship.save()
  if data['returnProfile']:
    return get_profile(request)
  else:
    requests = Friendship.objects.filter(user2 = user, status = 0)
    requests_data = jsonify_requests(requests)
    response = make_success_response(requests_data)
    return HttpResponse(json.dumps(response))

def reject_friend_request(request):
  data = extract_data(request)
  user = User.objects.get(email = data['rejector'])
  friend = User.objects.get(email = data['friend'])
  friendship = Friendship.objects.get(user1 = friend, user2 = user)
  friendship.delete()
  if data['returnProfile']:
    return get_profile(request)
  else:
    requests = Friendship.objects.filter(user2 = user, status = 0)
    requests_data = jsonify_requests(requests)
    response = make_success_response(requests_data)
    return HttpResponse(json.dumps(response))

def search_poeple(request):
  data = extract_data(request)
  query = data['query']
  by_email = User.objects.filter(email__icontains = query)
  by_fname = User.objects.filter(firstname__icontains = query)
  by_lname = User.objects.filter(lastname__icontains = query)
  by_hometown = User.objects.filter(hometown__icontains = query)
  users = (by_email | by_hometown | by_lname | by_fname)
  users_data = [jsonify_user(user) for user in users]
  response = make_success_response(users_data)
  return HttpResponse(json.dumps(response))

def publish_post(request):
  data = extract_data(request)
  user = User.objects.get(email = data['poster'])
  post = Post()
  post.caption = data['caption']
  post.public = data['isPublic']
  post.poster = user
  if 'image' in data:
    post.image = decode_base64(data['image'])
  post.save()
  response = make_success_response('Indomie')
  return HttpResponse(json.dumps(response))

def get_all_posts(request):
  data = extract_data(request)
  email = data['email']
  user = User.objects.get(email = email)
  by_user = Post.objects.filter(poster=user)
  friends = get_all_friends(email)
  by_friends = Post.objects.filter(poster__in=friends)
  non_friends = User.objects.all().exclude(email__in=friends).exclude(email=user.email)
  by_non_friends = Post.objects.filter(poster__in=non_friends, public=1)
  posts = (by_user | by_friends | by_non_friends).order_by('-publishtime')
  posts_data = jsonify_posts(posts)
  response = make_success_response(posts_data)
  return HttpResponse(json.dumps(response))

def search_posts(request):
  data = extract_data(request)
  query = data['query']
  posts = Post.objects.filter(caption__icontains = query).order_by('-publishtime')
  posts_data = jsonify_posts(posts)
  response = make_success_response(posts_data)
  return HttpResponse(json.dumps(response))

def get_profile(request):
  data = extract_data(request)
  user_email = data['email']
  viewed_user_email = data['viewed']
  user = User.objects.get(email=user_email)
  viewed_user = User.objects.get(email=viewed_user_email)
  if user_email == viewed_user_email:
    is_friends = True
    friendship_status = 'self'
  else:
    f1 = Friendship.objects.filter(user1=user, user2=viewed_user)
    f2 = Friendship.objects.filter(user2=user, user1=viewed_user)
    f = (f1 | f2)
    if len(f) == 0:
      is_friends = False
      friendship_status = 'nothing'
    elif f[0].status == 0:
      is_friends = False
      friendship_status = 'sent' if len(f1) != 0 else 'received'
    else:
      is_friends = True
      friendship_status = 'friends'
  posts = Post.objects.filter(poster = viewed_user).order_by('-publishtime') if is_friends else Post.objects.filter(poster=viewed_user, public=1).order_by('-publishtime')
  data = {
    'userData': jsonify_user(viewed_user, is_friends),
    'posts': jsonify_posts(posts),
    'friendshipStatus': friendship_status
  }
  response = make_success_response(data)
  return HttpResponse(json.dumps(response))

def send_friend_request(request):
  data = extract_data(request)
  user_email = data['email']
  viewed_user_email = data['viewed']
  user = User.objects.get(email=user_email)
  viewed_user = User.objects.get(email=viewed_user_email)
  friendship = Friendship()
  friendship.user1 = user
  friendship.user2 = viewed_user
  friendship.status = 0
  friendship.save()
  return get_profile(request)

def delete_friend(request):
  data = extract_data(request)
  user_email = data['email']
  viewed_user_email = data['viewed']
  user = User.objects.get(email=user_email)
  viewed_user = User.objects.get(email=viewed_user_email)
  f1 = Friendship.objects.filter(user1=user, user2=viewed_user)
  f2 = Friendship.objects.filter(user2=user, user1=viewed_user)
  f = (f1 | f2)
  friendship = f[0]
  friendship.delete()
  posts = Post.objects.filter(poster=viewed_user, public=1).order_by('-publishtime')
  data = {
    'userData': jsonify_user(viewed_user, False),
    'posts': jsonify_posts(posts),
    'friendshipStatus': 'nothing'
  }
  response = make_success_response(data)
  return HttpResponse(json.dumps(response))

def delete_post(request):
  data = extract_data(request)
  post_id = data['post_id']
  post = Post.objects.get(id=post_id)
  poster = post.poster
  post.delete()
  posts = Post.objects.filter(poster=poster).order_by('-publishtime')
  data = {
    'userData': jsonify_user(poster),
    'posts': jsonify_posts(posts),
    'friendshipStatus': 'self'
  }
  response = make_success_response(data)
  return HttpResponse(json.dumps(response))
