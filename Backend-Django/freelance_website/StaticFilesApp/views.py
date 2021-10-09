from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from StaticFilesApp.serializers import *
from StaticFilesApp.models import *
from StaticFilesApp.forms import *
from rest_framework.authtoken.models import Token
import sqlite3
  
# Create your views here.

@csrf_exempt
def uploadphoto(request):
    if request.method == 'POST':
        print(request.META['HTTP_AUTHORIZATION'])

        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        print(request.FILES)
        print(request.POST)       

        form = ProfilePictureForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return JsonResponse('successfully uploaded',safe=False)
        return JsonResponse('upload failed!',safe=False)

@csrf_exempt
def updatephoto(request):
    if request.method == 'POST':
        print(request.META['HTTP_AUTHORIZATION'])

        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        print(request.FILES)
        print(request.POST)       

        form = ProfilePictureForm(request.POST, request.FILES)

        query = '''delete from StaticFilesApp_profilepicture where
        username = '{varuser}'
        '''.format(varuser=user)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close() 
        
        if form.is_valid():
            print("saving")
            form.save()
              
            return JsonResponse('successfully uploaded',safe=False)
        return JsonResponse('upload failed!',safe=False)

@csrf_exempt
def getphoto(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT username, imagefile from StaticFilesApp_profilepicture WHERE
        username = '{varuser}'
        '''.format(varuser=user)
        pictures = ProfilePicture.objects.raw(query)
        pictures_serializer = ProfilePictureSerializer(pictures, many=True)
        print(pictures_serializer.data)
        return JsonResponse(pictures_serializer.data, safe=False)

@csrf_exempt
def getfreelancerphoto(request,username):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT username, imagefile from StaticFilesApp_profilepicture WHERE
        username = '{varuser}'
        '''.format(varuser=username)
        pictures = ProfilePicture.objects.raw(query)
        pictures_serializer = ProfilePictureSerializer(pictures, many=True)
        print(pictures_serializer.data)
        return JsonResponse(pictures_serializer.data, safe=False)

@csrf_exempt
def getclientphoto(request,username):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT username, imagefile from StaticFilesApp_profilepicture WHERE
        username = '{varuser}'
        '''.format(varuser=username)
        pictures = ProfilePicture.objects.raw(query)
        pictures_serializer = ProfilePictureSerializer(pictures, many=True)
        print(pictures_serializer.data)
        return JsonResponse(pictures_serializer.data, safe=False)

@csrf_exempt
def getallphotos(request):
    if request.method == 'GET':
        query = '''SELECT username, imagefile from StaticFilesApp_profilepicture'''
        pictures = ProfilePicture.objects.raw(query)
        pictures_serializer = ProfilePictureSerializer(pictures, many=True)
        print(pictures_serializer.data)
        return JsonResponse(pictures_serializer.data, safe=False)

@csrf_exempt
def getallclientphotos(request):
    if request.method == 'GET':
        query = '''SELECT StaticFilesApp_profilepicture.username as username, StaticFilesApp_profilepicture.imagefile as imagefile,
        Job.ID as jobid, Job.ClientID as clientid
        from StaticFilesApp_profilepicture, auth_user, Client, Job
        Where
        Job.ClientID = Client.ID AND
        Client.Username = auth_user.username AND
        StaticFilesApp_profilepicture.username = Client.Username
        '''
        pictures = ClientProfilePicture.objects.raw(query)
        pictures_serializer = ClientProfilePictureSerializer(pictures, many=True)
        print(pictures_serializer.data)
        return JsonResponse(pictures_serializer.data, safe=False)


