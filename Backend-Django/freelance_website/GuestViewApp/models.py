from django.db import models

# Create your models here.

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
