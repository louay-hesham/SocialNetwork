"""SocialNetwork URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt
from SocialNetwork.APIs import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^register/', csrf_exempt(register)),
    url(r'^login/', csrf_exempt(login)),
    url(r'^hashedlogin/', csrf_exempt(hashed_login)),
    url(r'^updateprofile/', csrf_exempt(update_profile)),
    url(r'^getrequestscount/', csrf_exempt(count_received_requests)),
    url(r'^getfriendrequests/', csrf_exempt(get_friend_requests)),
    url(r'^getfriends/', csrf_exempt(get_friends)),
    url(r'^acceptfriendrequest/', csrf_exempt(accept_friend_request)),
    url(r'^rejectfriendrequest/', csrf_exempt(reject_friend_request)),
    url(r'^searchpoeple/', csrf_exempt(search_poeple)),
    url(r'^publishpost/', csrf_exempt(publish_post)),
    url(r'^getallposts/', csrf_exempt(get_all_posts)),
    url(r'^searchposts/', csrf_exempt(search_posts)),
    url(r'^getprofile/', csrf_exempt(get_profile)),
    url(r'^sendrequest/', csrf_exempt(send_friend_request)),
    url(r'^deletefriend/', csrf_exempt(delete_friend)),
    url(r'^deletepost/', csrf_exempt(delete_post)),
]
