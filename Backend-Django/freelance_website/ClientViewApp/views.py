from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from ClientViewApp.models import *
from ClientViewApp.serializers import *
from django.core.files.storage import default_storage
from rest_framework.authtoken.models import Token
import sqlite3
import json

# Create your views here.

@csrf_exempt

def viewpostedjobs(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Removed as Removed,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName
        FROM Category, Client, Job
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID
        AND Client.Username = '{varuser}' order by Job.ID desc'''.format(varuser=user)
        jobs = PostedJobModel.objects.raw(query)
        jobs_serializer = PostedJobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)

def viewclientpostedjobs(request,username):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Removed as Removed,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName
        FROM Category, Client, Job
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND
        Job.Removed = 0
        AND Client.Username = '{varuser}' order by Job.ID desc'''.format(varuser=username)
        jobs = PostedJobModel.objects.raw(query)
        jobs_serializer = PostedJobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)

def viewapprovedjobs(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Removed as Removed,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        Freelancer.username as Username,
        Freelancer.name as Name,
        auth_user.email as Email
        FROM Category, Client, Job, Freelancer, History, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.FreelancerID = Freelancer.ID 
        AND auth_user.username = Freelancer.username AND History.JobID = Job.ID 
        AND History.Status = 'approved' AND Client.username= '{var_user}' order by Job.ID desc'''.format(var_user=user)
        jobs = ApprovedJobModel.objects.raw(query)
        jobs_serializer = ApprovedJobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)

def viewcompletedjobs(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Removed as Removed,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        Freelancer.username as Username,
        Freelancer.name as Name,
        auth_user.email as Email,
        History.FreelancerMessage as FreelancerMessage
        FROM Category, Client, Job, Freelancer, History, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.FreelancerID = Freelancer.ID 
        AND auth_user.username = Freelancer.username AND History.JobID = Job.ID 
        AND History.Status = 'completed' AND Client.username= '{var_user}' order by Job.ID desc'''.format(var_user=user)
        jobs = CompletedJobModel.objects.raw(query)
        jobs_serializer = CompletedJobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)

@csrf_exempt
def update(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        data = JSONParser().parse(request)
        name = data['name']
        country = data['country']
        city = data['city']
        company= data['company']

        query = '''
        UPDATE Client 
        SET
        Name ='{vname}', 
        City ='{vcity}',
        Country ='{vcountry}',
        Company='{vcomp}'
        WHERE username = '{var_user}'
        '''.format(var_user=user, vname=name, vcomp=company,
        vcountry=country,vcity=city)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)

@csrf_exempt
def removejob(request,jobid):
    if request.method=='GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        query = '''
        UPDATE Job 
        SET
        Removed = 1
        WHERE ID = {var_id}
        '''.format(var_id=jobid)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)

@csrf_exempt
def repostjob(request,jobid):
    if request.method=='GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        query = '''
        UPDATE Job 
        SET
        Removed = 0
        WHERE ID = {var_id}
        '''.format(var_id=jobid)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)
    

@csrf_exempt
def signup(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
    
        data = JSONParser().parse(request)
        name = data['name']
        country = data['country']
        city = data['city']
        company= data['company']
        
        query = '''INSERT OR REPLACE INTO Client(Username,Name,City,Country,Company) VALUES 
        ('{var_user}','{vname}','{vcity}','{vcountry}','{vcomp}')
        '''.format(var_user=user, vname=name, vcomp=company,
        vcountry=country,vcity=city)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)

@csrf_exempt
def postjob(request):
    if request.method=='POST':
        success = False
        try:
            headers_token = request.META['HTTP_AUTHORIZATION'][7:]
            print(headers_token)
            user = Token.objects.get(key=headers_token).user
            print(user)
        
            data = JSONParser().parse(request)
            headline = data['headline']
            description = data['description']
            addreq = data['addreq']
            skills= data['skills']
            category = data['category']
            print(headline,description,category,skills,addreq)

            conn = sqlite3.connect('db.sqlite3')
            cur = conn.cursor()
            query = "SELECT ID FROM Client WHERE username = '{variable}' ".format(variable = user)
            cur.execute(query)
            clientid = cur.fetchone()[0] 
            print(clientid)
            query = '''INSERT INTO Job(ClientID,Headline,Description,Skills,Additional_requirements,CategoryID) VALUES 
            ({var_id},'{var_headline}','{var_desc}','{var_skills}','{var_req}',{var_category}) 
            '''.format(var_id=clientid,var_headline=headline,var_desc=description,var_skills=skills,var_req=addreq,var_category=category)
            cur.execute(query)
            conn.commit()
            cur.close()
            conn.close()
            success = True
        except:
            success = False
        return JsonResponse(success, safe=False)

@csrf_exempt
def approvejob(request,jobid,freelancerusername):
    if request.method=='POST':
        success = False
        try:
            headers_token = request.META['HTTP_AUTHORIZATION'][7:]
            print(headers_token)
            user = Token.objects.get(key=headers_token).user
            print(user)
        
            data = JSONParser().parse(request)
            star = data['star']
            comment = data['details']
            print(star,comment)

            conn = sqlite3.connect('db.sqlite3')
            cur = conn.cursor()
            query = "SELECT ID FROM Freelancer WHERE username = '{variable}' ".format(variable = freelancerusername)
            cur.execute(query)
            freelancerid = cur.fetchone()[0] 
            print(freelancerid)
          
            query = '''
            Update History
            Set Status='approved',
            Rating={var_star},
            ClientComment='{var_comment}'
            where JobID={var_jobid} and FreelancerID={var_freelancerid}
            '''.format(var_jobid=jobid,var_freelancerid=freelancerid,var_star=star,var_comment=comment)
            cur.execute(query)
            conn.commit()
            cur.close()
            conn.close()
            success = True
        except:
            success = False
        return JsonResponse(success, safe=False)

def invitefreelancer(request,jobid,freelancerid):
    if request.method == 'GET':
        
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        query = "SELECT ID FROM Client WHERE username = '{variable}' ".format(variable = user)
        cur.execute(query)
        clientid = cur.fetchone()[0] 
        print(clientid)
        query = '''INSERT OR REPLACE INTO Invited VALUES 
            ({var_jobid},{var_clientid},{var_freelancerid}) 
            '''.format(var_jobid=jobid,var_clientid=clientid,var_freelancerid=freelancerid)
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()    
            
        return JsonResponse(jobid, safe=False)


def jobdetails(request,jobid):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    query = ""

    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Client.Name as ClientName,
        Client.Company as CompanyName,
        auth_user.email as Email,
        Client.City as City,
        Client.Country as Country,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName
        FROM Category, Client, Job, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND auth_user.username = Client.username
        AND Job.ID = {var_id}
        '''.format(var_id=jobid)
        jobs = JobModel.objects.raw(query)
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)


def sendinvitation(request,jobid):
    if request.method == 'GET':
        print(jobid)
        query = '''SELECT Freelancer.ID as FreelancerId, 
        auth_user.Username as Username, 
        Freelancer.Name as Name, 
        City, Country, 
        Educational_Institution as EducationalInstitution , 
        Educational_Qualifications as EducationalQualifications,
        Employment, 
        Company_Name as CompanyName, 
        Skills, 
        Category.Name as CategoryName, 
        auth_user.email as Email, 
        Additional_Contact_Details as AdditionalContactDetails
        FROM Freelancer, Category, auth_user
        WHERE Freelancer.CategoryID = Category.ID AND auth_user.username = Freelancer.username
        AND Freelancer.ID NOT IN (SELECT FreelancerID from Invited where JobID={var_id})
        '''.format(var_id=jobid)
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)

def viewproposals(request,jobid):
    if request.method == 'GET':
        print(jobid)
        query = '''SELECT Freelancer.ID as FreelancerId, 
        auth_user.Username as Username, 
        Freelancer.Name as Name, 
        City, Country, 
        Educational_Institution as EducationalInstitution , 
        Educational_Qualifications as EducationalQualifications,
        Employment, 
        Company_Name as CompanyName, 
        Freelancer.Skills, 
        Category.Name as CategoryName, 
        auth_user.email as Email, 
        MessagetoClient,
        Additional_Contact_Details as AdditionalContactDetails
        FROM Freelancer, Category, auth_user, Job, Proposal
        WHERE Freelancer.CategoryID = Category.ID AND auth_user.username = Freelancer.username AND
        Job.ID = Proposal.JobID AND Job.ID = Category.ID 
        AND Freelancer.ID IN (SELECT FreelancerID from Proposal where JobID={var_id})
        '''.format(var_id=jobid)
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)

def viewassigned(request,jobid):
    if request.method == 'GET':
        print(jobid)
        query = '''SELECT Freelancer.ID as FreelancerId, 
        auth_user.Username as Username, 
        Freelancer.Name as Name, 
        City, Country, 
        Educational_Institution as EducationalInstitution , 
        Educational_Qualifications as EducationalQualifications,
        Employment, 
        Company_Name as CompanyName, 
        Skills, 
        Category.Name as CategoryName, 
        auth_user.email as Email, 
        Additional_Contact_Details as AdditionalContactDetails
        FROM Freelancer, Category, auth_user
        WHERE Freelancer.CategoryID = Category.ID AND auth_user.username = Freelancer.username
        AND Freelancer.ID IN (SELECT FreelancerID from History where JobID={var_id} and Status='assigned')
        '''.format(var_id=jobid)
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)

def viewmyprofile(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT Client.ID as ClientId,
                Client.Username as Username,
                Client.Name as Name, 
                City, 
                Country, 
                Company as CompanyName, 
                auth_user.Email as Email
        FROM Client, auth_user
        WHERE auth_user.username = '{var_user}' AND
        Client.username = '{var_user}' '''.format(var_user=user)
        client = ViewMyProfileModel.objects.raw(query)
        client_serializer = ViewMyProfileSerializer(client, many=True)
        return JsonResponse(client_serializer.data, safe=False)

def viewclientprofile(request,jobid):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        query = "SELECT ClientID FROM Job WHERE ID = {variable} ".format(variable = jobid)
        cur.execute(query)
        clientid = cur.fetchone()[0] 
        print(clientid)
        cur.close()
        conn.close()    

        query = '''SELECT Client.ID as ClientId,
                Client.Username as Username,
                Client.Name as Name, 
                City, 
                Country, 
                Company as CompanyName, 
                auth_user.Email as Email
        FROM Client, auth_user
        WHERE auth_user.username = Client.Username AND
        Client.ID = {var_id} '''.format(var_id=clientid)
        client = ViewMyProfileModel.objects.raw(query)
        client_serializer = ViewMyProfileSerializer(client, many=True)
        return JsonResponse(client_serializer.data, safe=False)

def viewinvitations(request,jobid):
    if request.method == 'GET':
        print(jobid)
        query = '''SELECT Freelancer.ID as FreelancerId, 
        auth_user.Username as Username, 
        Freelancer.Name as Name, 
        City, Country, 
        Educational_Institution as EducationalInstitution , 
        Educational_Qualifications as EducationalQualifications,
        Employment, 
        Company_Name as CompanyName, 
        Skills, 
        Category.Name as CategoryName, 
        auth_user.email as Email, 
        Additional_Contact_Details as AdditionalContactDetails
        FROM Freelancer, Category, auth_user
        WHERE Freelancer.CategoryID = Category.ID AND auth_user.username = Freelancer.username
        AND Freelancer.ID IN (SELECT FreelancerID from Invited where JobID={var_id})
        '''.format(var_id=jobid)
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)
