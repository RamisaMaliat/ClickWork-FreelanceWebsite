from django.db import models

# Create your models here.

class ViewMyProfileModel(models.Model):
   ClientId = models.AutoField(primary_key=True)
   Username = models.TextField()
   Name = models.TextField()
   CompanyName = models.TextField()
   Email = models.TextField()
   City = models.TextField()
   Country = models.TextField()

class PostedJobModel(models.Model):
   JobId = models.AutoField(primary_key=True)
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()
   Removed = models.IntegerField()

class ApprovedJobModel(models.Model):
   JobId = models.AutoField(primary_key=True)
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()
   Removed = models.IntegerField()
   Username = models.TextField()
   Name = models.TextField()
   Email = models.TextField()

class CompletedJobModel(models.Model):
   JobId = models.AutoField(primary_key=True)
   Headline = models.TextField()
   Description = models.TextField()
   Skills = models.TextField()
   AdditionalRequirements = models.TextField()
   CategoryName = models.TextField()
   Removed = models.IntegerField()
   Username = models.TextField()
   Name = models.TextField()
   Email = models.TextField()
   FreelancerMessage = models.TextField()

class InvitedModel(models.Model):
   FreelancerID = models.AutoField(primary_key=True)
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

class ProposalModel(models.Model):
   FreelancerID = models.AutoField(primary_key=True)
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
   MessagetoClient = models.TextField()

class CategoryModel(models.Model):
    CategoryId = models.AutoField(primary_key=True)
    CategoryName = models.TextField()


class FreelancerModel(models.Model):
   FreelancerId = models.AutoField(primary_key=True)
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
   JobId = models.AutoField(primary_key=True)
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
