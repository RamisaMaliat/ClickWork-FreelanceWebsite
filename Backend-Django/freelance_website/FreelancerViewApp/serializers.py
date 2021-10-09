from rest_framework import serializers
from FreelancerViewApp.models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ('CategoryID',
                  'CategoryName')

class ViewMyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewMyProfileModel
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

class ViewFreelancerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewFreelancerProfileModel
        fields = ('FreelancerID',
                'Description',
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

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobModel
        fields = (
            'JobID',
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

class HistorySerializer(serializers.ModelSerializer):
     class Meta:
        model = HistoryModel
        fields = (
            'JobID',
            'ClientName',
            'ClientCompanyName',
            'ClientEmail',
            'ClientCity',
            'ClientCountry',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName',
            'Status',
            'ClientComment',
            'Rating'
        )

class InvitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitedModel
        fields = (
            'JobID',
            'ClientName',
            'ClientCompanyName',
            'ClientEmail',
            'ClientCity',
            'ClientCountry',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName'
        )


class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalModel
        fields = (
            'JobID',
            'ClientName',
            'ClientCompanyName',
            'ClientEmail',
            'ClientCity',
            'ClientCountry',
            'Headline',
            'Description',
            'Skills',
            'AdditionalRequirements',
            'CategoryName'
        )
