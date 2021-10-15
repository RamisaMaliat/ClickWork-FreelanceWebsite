from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from FreelancerViewApp.models import *
from FreelancerViewApp.serializers import *
from django.core.files.storage import default_storage
from django.shortcuts import render
from django.http.response import HttpResponse
from django.contrib.auth.hashers import  make_password
from django.contrib.sessions.models import Session
from django.contrib.auth import authenticate
from django.contrib.auth.models import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token
import sqlite3
import json


# Create your views here.

@csrf_exempt
def viewmyprofile(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT Freelancer.ID as FreelancerID,
        auth_user.username as Username,
        Freelancer.Name as Name,
        City, Country,
        Educational_Institution as EducationalInstitution ,
        Educational_Qualifications as EducationalQualifications,
        Employment,
        Company_Name as CompanyName,
        Skills,
        Category.Name as CategoryName,
        auth_user.email as Email,
        Freelancer.Description as Description,
        Additional_Contact_Details as AdditionalContactDetails
        FROM Freelancer, Category, auth_user
        WHERE Freelancer.CategoryID = Category.ID AND auth_user.username = '{var_user}' AND
        Freelancer.username = '{var_user}' '''.format(var_user=user)
        freelancer = ViewFreelancerProfileModel.objects.raw(query)
        freelancer_serializer = ViewFreelancerProfileSerializer(freelancer, many=True)
        return JsonResponse(freelancer_serializer.data, safe=False)

def viewassignedjobs(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT History.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        History.Status as Status,
        History.ClientComment as ClientComment,
        History.Rating as Rating
        FROM Category, Client, Job, History, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.JobID = Job.ID AND
        History.FreelancerID = Freelancer.ID AND History.Status = 'assigned' AND auth_user.username = Client.username AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=user)
        jobs_assigned = HistoryModel.objects.raw(query)
        jobs_assigned_serializer = HistorySerializer(jobs_assigned, many=True)

        return JsonResponse(jobs_assigned_serializer.data, safe=False)

def viewcompletedjobs(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT History.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        History.Status as Status,
        History.ClientComment as ClientComment,
        History.Rating as Rating
        FROM Category, Client, Job, History, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.JobID = Job.ID AND auth_user.username = Client.username AND
        History.FreelancerID = Freelancer.ID AND History.Status = 'completed' AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=user)
        jobs_completed = HistoryModel.objects.raw(query)
        jobs_completed_serializer = HistorySerializer(jobs_completed, many=True)
        return JsonResponse(jobs_completed_serializer.data, safe=False)

def viewapprovedjobs(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT History.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        History.Status as Status,
        History.ClientComment as ClientComment,
        History.Rating as Rating
        FROM Category, Client, Job, History, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.JobID = Job.ID AND auth_user.username = Client.username AND
        History.FreelancerID = Freelancer.ID AND History.Status = 'approved' AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=user)
        jobs_approved = HistoryModel.objects.raw(query)
        jobs_approved_serializer = HistorySerializer(jobs_approved, many=True)
        return JsonResponse(jobs_approved_serializer.data, safe=False)


def viewinvitedjobs(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT Invited.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName
        FROM Category, Client, Job, Invited, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND Invited.JobID = Job.ID AND auth_user.username = Client.username AND
        Freelancer.ID = Invited.FreelancerID AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=user)
        jobs_invited = InvitedModel.objects.raw(query)
        jobs_invited_serializer = InvitedSerializer(jobs_invited, many=True)
        return JsonResponse(jobs_invited_serializer.data, safe=False)


def viewproposedjobs(request):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        query = '''SELECT Proposal.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName
        FROM Category, Client, Job, Proposal, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND Proposal.JobID = Job.ID AND auth_user.username = Client.username AND
        Freelancer.ID = Proposal.FreelancerID AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=user)
        jobs_proposal = ProposalModel.objects.raw(query)
        jobs_proposal_serializer = ProposalSerializer(jobs_proposal, many=True)
        return JsonResponse(jobs_proposal_serializer.data, safe=False)

def findfreelancer(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    if request.method == 'GET':
        query = '''SELECT Freelancer.ID as FreelancerID,
        Username,
        Freelancer.Name as Name,
        City, Country,
        Educational_Institution as EducationalInstitution ,
        Educational_Qualifications as EducationalQualifications,
        Employment,
        Company_Name as CompanyName,
        Skills,
        Category.Name as CategoryName,
        Email,
        Additional_Contact_Details as AdditionalContactDetails
        FROM Freelancer, Category
        WHERE Freelancer.CategoryID = Category.ID'''
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)

def findwork(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobID,
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
        AND Job.Removed = 0
        '''
        jobs = JobModel.objects.raw(query)
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)

def myfeed(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    query = '''select CategoryID from Freelancer where Username = '{var_user}' '''.format(var_user=user)
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    cur.execute(query)
    user_category = cur.fetchone()[0]
    print(user_category)
    conn.commit()
    cur.close()
    conn.close()

    if request.method == 'GET':
        query = '''SELECT Job.ID as JobID,
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
        AND Job.CategoryID = {var_category}
        AND Job.Removed = 0
        '''.format(var_category=user_category)
        jobs = JobModel.objects.raw(query)
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)


def viewjobdetails(request,jobid):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    query = ""

    if request.method == 'GET':
        query = '''SELECT Job.ID as JobID,
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

def viewjobdetails2(request,jobid,freelancerid):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    query = ""

    if request.method == 'GET':
        query = '''SELECT Job.ID as JobID,
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


def findcategory(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    name_map = {'ID': 'CategoryID', 'Name': 'CategoryName'}
    if request.method == 'GET':
        categories = CategoryModel.objects.raw('SELECT * FROM Category', translations=name_map)
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)

def getcategory(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    
    if request.method == 'GET':
        query = '''SELECT CategoryID FROM Freelancer where username = '{var_user}'
        '''.format(var_user=user)
        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        id = cur.fetchone()[0]
        cur.close()
        conn.close()
        return JsonResponse(id, safe=False)

def getrate(request):
    headers_token = request.META['HTTP_AUTHORIZATION'][7:]
    print(headers_token)
    user = Token.objects.get(key=headers_token).user
    print(user)
    
    if request.method == 'GET':
        query = '''SELECT Hourly_Rate FROM Freelancer where username = '{var_user}'
        '''.format(var_user=user)
        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        rate = cur.fetchone()[0]
        cur.close()
        conn.close()
        return JsonResponse(rate, safe=False)

@csrf_exempt
def sentProposal(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        success = False
        data = JSONParser().parse(request)
        msg = data['details']
        jobid = data['path'][6:]

        print(msg,jobid)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()

        query = ''' SELECT ClientID FROM Job WHERE ID = {var_id} 
        '''.format(var_id=jobid)
        cur.execute(query)
        clientid = cur.fetchone()[0]

        query = ''' SELECT ID FROM Freelancer WHERE Username = '{var_user}' 
        '''.format(var_user=user)
        cur.execute(query)
        freelancerid = cur.fetchone()[0]

        print(clientid,freelancerid)

        if msg == "":
            query = '''INSERT OR REPLACE INTO Proposal(jobID,ClientID,FreelancerID) VALUES
            ({var_jobid},{var_clientid},{var_freelancerid})
            '''.format(var_jobid=jobid,var_clientid=clientid,var_freelancerid=freelancerid)

        else:
            query = '''INSERT OR REPLACE INTO Proposal VALUES
            ({var_jobid},{var_clientid},{var_freelancerid},'{var_msg}')
            '''.format(var_jobid=jobid,var_clientid=clientid,var_freelancerid=freelancerid,var_msg=msg)
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        success = True
        return JsonResponse(success, safe=False)


@csrf_exempt
def sentRequest(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        success = False
        data = JSONParser().parse(request)
        msg = data['details']
        jobid = data['path'][16:]

        print(msg,jobid)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()

        query = ''' SELECT ClientID FROM Job WHERE ID = {var_id} 
        '''.format(var_id=jobid)
        cur.execute(query)
        clientid = cur.fetchone()[0]

        query = ''' SELECT ID FROM Freelancer WHERE Username = '{var_user}' 
        '''.format(var_user=user)
        cur.execute(query)
        freelancerid = cur.fetchone()[0]

        print(clientid,freelancerid)

        if msg == "":
            query = '''INSERT OR REPLACE INTO History(FreelancerID,JobID,Status) VALUES
            ({var_freelancerid},{var_jobid},'completed')
            '''.format(var_freelancerid=freelancerid,var_jobid=jobid)

        else:
            query = '''INSERT OR REPLACE INTO History(FreelancerID,JobID,Status,FreelancerMessage) VALUES
            ({var_freelancerid},{var_jobid},'completed',"{var_msg}")
            '''.format(var_freelancerid=freelancerid,var_jobid=jobid,var_msg=msg)
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        success = True
        return JsonResponse(success, safe=False)

@csrf_exempt
def signup(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        data = JSONParser().parse(request)
        name = data['name']
        category = data['category']
        country = data['country']
        city = data['city']
        additionalContacts= data['additionalContacts']
        skills= data['skills']
        institution= data['institution']
        degree= data['degree']
        employment= data['employment']
        company= data['company']

        query = '''INSERT OR REPLACE INTO Freelancer(Username,Name,City,Country,Educational_Institution,Educational_Qualifications,
        Employment, Company_Name, Skills, CategoryID, Additional_Contact_Details) VALUES
        ('{var_user}','{vname}','{vcity}','{vcountry}','{vinst}','{vdegree}','{vemp}','{vcomp}','{vskills}',{vcat},'{vadd}')
        '''.format(var_user=user, vname=name, vcat=category,vcomp=company,
        vcountry=country,vcity=city,vadd=additionalContacts,vskills=skills,vinst=institution,vdegree=degree,vemp=employment)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)

@csrf_exempt
def updatedescription(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        data = JSONParser().parse(request)
        details = data['details']

        query = '''Update Freelancer Set Description='{var_details}'
        where Username='{var_user}'
        '''.format(var_user=user, var_details=details)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)

@csrf_exempt
def updaterate(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        data = JSONParser().parse(request)
        details = data['details']

        query = '''Update Freelancer Set Description='{var_details}'
        where Username='{var_user}'
        '''.format(var_user=user, var_details=details)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)

@csrf_exempt
def update(request):
    if request.method=='POST':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)

        data = JSONParser().parse(request)
        name = data['name']
        category = data['category']
        country = data['country']
        city = data['city']
        additionalContacts= data['additionalContacts']
        skills= data['skills']
        institution= data['institution']
        degree= data['degree']
        employment= data['employment']
        company= data['company']

        query = '''
        UPDATE Freelancer 
        SET
        Name ='{vname}', 
        City ='{vcity}',
        Country ='{vcountry}',
        Educational_Institution='{vinst}',
        Educational_Qualifications='{vdegree}',
        Employment='{vemp}',
        Company_Name='{vcomp}',
        Skills='{vskills}',
        CategoryID={vcat},
        Additional_Contact_Details='{vadd}'
        WHERE username = '{var_user}'
        '''.format(var_user=user, vname=name, vcat=category,vcomp=company,
        vcountry=country,vcity=city,vadd=additionalContacts,vskills=skills,vinst=institution,vdegree=degree,vemp=employment)

        conn = sqlite3.connect('db.sqlite3')
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
        return JsonResponse("success", safe=False)


def viewfreelancerprofile(request,username):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        print(username)
        query = '''SELECT Freelancer.ID as FreelancerID,
        auth_user.username as Username,
        Freelancer.Name as Name,
        Freelancer.Description as Description,
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
        WHERE Freelancer.CategoryID = Category.ID AND Freelancer.username = auth_user.username AND
        auth_user.username = '{var_user}'
        '''.format(var_user=username)
        freelancer = ViewFreelancerProfileModel.objects.raw(query)
        freelancer_serializer = ViewFreelancerProfileSerializer(freelancer, many=True)
        return JsonResponse(freelancer_serializer.data, safe=False)

def viewfreelancerprofileapproved(request,username):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        print(username)
        query = '''SELECT History.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        History.Status as Status,
        History.ClientComment as ClientComment,
        History.Rating as Rating
        FROM Category, Client, Job, History, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.JobID = Job.ID AND auth_user.username = Client.username AND
        History.FreelancerID = Freelancer.ID AND History.Status = 'approved' AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=username)
        jobs_approved = HistoryModel.objects.raw(query)
        jobs_approved_serializer = HistorySerializer(jobs_approved, many=True)
        return JsonResponse(jobs_approved_serializer.data, safe=False)

def viewfreelancerprofilecompleted(request,username):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        print(username)
        query = '''SELECT History.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        History.Status as Status,
        History.ClientComment as ClientComment,
        History.Rating as Rating
        FROM Category, Client, Job, History, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.JobID = Job.ID AND auth_user.username = Client.username AND
        History.FreelancerID = Freelancer.ID AND History.Status = 'completed' AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=username)
        jobs_approved = HistoryModel.objects.raw(query)
        jobs_approved_serializer = HistorySerializer(jobs_approved, many=True)
        return JsonResponse(jobs_approved_serializer.data, safe=False)

def viewfreelancerprofileassigned(request,username):
    if request.method == 'GET':
        headers_token = request.META['HTTP_AUTHORIZATION'][7:]
        print(headers_token)
        user = Token.objects.get(key=headers_token).user
        print(user)
        print(username)
        query = '''SELECT History.JobID as JobID,
        Client.Name as ClientName,
        Client.Company as ClientCompanyName,
        auth_user.email as ClientEmail,
        Client.City as ClientCity,
        Client.Country as ClientCountry,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName,
        History.Status as Status,
        History.ClientComment as ClientComment,
        History.Rating as Rating
        FROM Category, Client, Job, History, Freelancer, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND History.JobID = Job.ID AND
        History.FreelancerID = Freelancer.ID AND History.Status = 'assigned' AND auth_user.username = Client.username AND
        Freelancer.Username = '{varuser}'
        '''.format(varuser=username)
        jobs_approved = HistoryModel.objects.raw(query)
        jobs_approved_serializer = HistorySerializer(jobs_approved, many=True)
        return JsonResponse(jobs_approved_serializer.data, safe=False)


