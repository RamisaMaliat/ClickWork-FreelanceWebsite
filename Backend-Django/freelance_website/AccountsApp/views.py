from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from AccountsApp.models import *
from AccountsApp.serializers import *
import json
import sqlite3
from rest_framework.authtoken.models import Token

# Create your views here.
@csrf_exempt
def SetAccount(request):
    if request.method=='POST':
        success  = False
        
        username = request.POST.get('username')
        acctype = request.POST.get('acctype')
        print(username,acctype)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        query = "SELECT username FROM auth_user WHERE username = '{variable}' ".format(variable = username)
        cur.execute(query)
        username = cur.fetchone()[0] 
        print(username)
        query = '''INSERT INTO AccountType(Username, AccountType) VALUES ('{var_username}','{var_acctype}') '''.format(var_username=username,var_acctype=acctype)
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        success = True
        return JsonResponse(success, safe=False) 

def getAccount(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    query = '''SELECT * FROM AccountType WHERE Username = '{var_user}'
    '''.format(var_user=user)
    if request.method == 'GET':
        items = AccountTypeModel.objects.raw(query)
        items_serializer = AccountTypeSerializer(items, many=True)
        return JsonResponse(items_serializer.data, safe=False)
