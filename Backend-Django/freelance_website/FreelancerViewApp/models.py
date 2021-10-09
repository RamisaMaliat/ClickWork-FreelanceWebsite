from django.db import models

# Create your models here.

class CategoryModel(models.Model):
    CategoryID = models.IntegerField(primary_key=True)
    CategoryName = models.TextField()

class ViewMyProfileModel(models.Model):
   FreelancerID = models.IntegerField(primary_key=True)
   Username = models.TextField()
   Name = models.TextField()
   City = models.TextField()
   Country = models.TextField()
   EducationalInstitution = models.TextField()
   EducationalQualifications = models.TextField()
   Employment = models.TextField()
   CompanyName = models.TextField()
   Skills = models.TextField()
   CategoryName = models.TextField()
   Email = models.TextField()
   AdditionalContactDetails = models.TextField()

class ViewFreelancerProfileModel(models.Model):
   FreelancerID = models.IntegerField(primary_key=True)
   Description = models.TextField()
   Username = models.TextField()
   Name = models.TextField()
   City = models.TextField()
   Country = models.TextField()
   EducationalInstitution = models.TextField()
   EducationalQualifications = models.TextField()
   Employment = models.TextField()
   CompanyName = models.TextField()
   Skills = models.TextField()
   CategoryName = models.TextField()
   Email = models.TextField()
   AdditionalContactDetails = models.TextField()

class HistoryModel(models.Model):
   JobID = models.IntegerField(primary_key=True)
   ClientName = models.TextField()
   ClientCompanyName = models.TextField()
   ClientEmail = models.TextField()
   ClientCity = models.TextField()
   ClientCountry = models.TextField()
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()
   Status = models.TextField()
   ClientComment  = models.TextField()
   Rating = models.IntegerField()


class FreelancerModel(models.Model):
   FreelancerID = models.IntegerField(primary_key=True)
   Username = models.TextField()
   Name = models.TextField()
   City = models.TextField()
   Country = models.TextField()
   EducationalInstitution = models.TextField()
   EducationalQualifications = models.TextField()
   Employment = models.TextField()
   CompanyName = models.TextField()
   Skills = models.TextField()
   CategoryName = models.TextField()
   Email = models.TextField()
   AdditionalContactDetails = models.TextField()

class JobModel(models.Model):
   JobID = models.IntegerField(primary_key=True)
   ClientName = models.TextField()
   CompanyName = models.TextField()
   Email = models.TextField()
   City = models.TextField()
   Country = models.TextField()
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()


class InvitedModel(models.Model):
   JobID = models.IntegerField(primary_key=True)
   ClientName = models.TextField()
   ClientCompanyName = models.TextField()
   ClientEmail = models.TextField()
   ClientCity = models.TextField()
   ClientCountry = models.TextField()
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()


class ProposalModel(models.Model):
   JobID = models.IntegerField(primary_key=True)
   ClientName = models.TextField()
   ClientCompanyName = models.TextField()
   ClientEmail = models.TextField()
   ClientCity = models.TextField()
   ClientCountry = models.TextField()
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()
