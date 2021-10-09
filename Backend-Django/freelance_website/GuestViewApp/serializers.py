from rest_framework import serializers
from GuestViewApp.models import CategoryModel,JobModel,FreelancerModel

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ('CategoryId',
                  'CategoryName')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobModel
        fields = (
            'JobId',
            'ClientName',
            'CompanyName',
            'Email',
            'City',
            'Country',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName'
        )

class FreelancerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreelancerModel
        fields = ('FreelancerId',
                'Username',
                'Name', 
                'City', 
                'Country', 
                'EducationalInstitution', 
                'EducationalQualifications',
                'Employment', 
                'CompanyName', 
                'Skills',
                'CategoryName', 
                'Email', 
                'AdditionalContactDetails')
