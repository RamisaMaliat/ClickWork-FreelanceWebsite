from django.db import models

# Create your models here.

class AccountTypeModel(models.Model):
   Username = models.TextField(primary_key=True)
   AccountType = models.TextField()
   