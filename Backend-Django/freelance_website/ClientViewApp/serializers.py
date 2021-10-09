from rest_framework import serializers
from ClientViewApp.models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ('CategoryId',
                  'CategoryName')

class PostedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostedJobModel
        fields = (
            'JobId',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName',
            'Removed'
        )

class ApprovedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovedJobModel
        fields = (
            'JobId',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName',
            'Removed',
            'Username',
            'Name',
            'Email'
        )

class CompletedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedJobModel
        fields = (
            'JobId',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName',
            'Removed',
            'Username',
            'Name',
            'Email',
            'FreelancerMessage'
        )

class InvitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitedModel
        fields = ('FreelancerID',
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

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalModel
        fields = ('FreelancerID',
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
                'AdditionalContactDetails',
                'MessagetoClient')

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

class ViewMyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewMyProfileModel
        fields = ('ClientId',
                'Username',
                'Name', 
                'City', 
                'Country', 
                'CompanyName', 
                'Email')
