from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from GuestViewApp.models import CategoryModel,JobModel,FreelancerModel
from GuestViewApp.serializers import CategorySerializer,JobSerializer,FreelancerSerializer
from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt

def signup(request):
    if request.method=='POST':
        success = False
        signup_data=JSONParser().parse(request)
        signup_serializer = SignUpSerializer(data=signup_data)

        if signup_serializer.is_valid():

            print(signup_serializer.data)

            username = signup_serializer['username'].value
            password = signup_serializer['password'].value
            email = signup_serializer['email'].value
            user_type = signup_serializer['user_type'].value

            try:
                conn = sqlite3.connect('db.sqlite3')
                cur = conn.cursor()
                query = "SELECT username FROM auth_user WHERE username = '{var_user}' ".format(var_user=username)
                cur.execute(query)
                table_data = cur.fetchone() 
                cur.close()
                conn.close()

                if table_data == None:
                    user = User.objects.create_user(username=username, email=email, password=password)
                    success = True
                    return JsonResponse([success,"Thank you for signing up!",user_type], safe=False)
                else:
                    return JsonResponse([success,"Username already exists! Try another name."], safe=False)
            except:
                return JsonResponse([success,"Server not found."],safe=False)
            
        return JsonResponse([success,"Fill all the required fields with valid information."],safe=False)

    elif request.method=='GET':
        return HttpResponse("")

def findfreelancer(request):
    if request.method == 'GET':
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
        '''
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)

def searchfreelancersbycategory(request,id):
    if request.method == 'GET':
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
        WHERE Freelancer.CategoryID = Category.ID AND auth_user.username = Freelancer.username AND
        Category.ID = {var_id}
        '''.format(var_id=id)
        freelancers = FreelancerModel.objects.raw(query)
        freelancers_serializer = FreelancerSerializer(freelancers, many=True)
        return JsonResponse(freelancers_serializer.data, safe=False)


def findwork(request):
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Client.Name as ClientName,
        Client.Company as CompanyName,
        auth_user.Email as Email,
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

def searchjobsbycategory(request,id):
    if request.method == 'GET':
        query = '''SELECT Job.ID as JobId,
        Client.Name as ClientName,
        Client.Company as CompanyName,
        auth_user.Email as Email,
        Client.City as City,
        Client.Country as Country,
        Job.Headline as Headline,
        Job.Description as Description,
        Job.Skills as Skills,
        Job.Additional_requirements as AdditionalRequirements,
        Category.Name as CategoryName
        FROM Category, Client, Job, auth_user
        WHERE Category.ID = Job.CategoryID AND Job.ClientID = Client.ID AND auth_user.username = Client.username
        AND Job.Removed = 0 AND Category.ID = {var_id}   
        '''.format(var_id=id)
        jobs = JobModel.objects.raw(query)
        jobs_serializer = JobSerializer(jobs, many=True)
        return JsonResponse(jobs_serializer.data, safe=False)

def findcategory(request):
    name_map = {'ID': 'CategoryId', 'Name': 'CategoryName'}
    if request.method == 'GET':
        categories = CategoryModel.objects.raw('SELECT * FROM Category', translations=name_map)
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)