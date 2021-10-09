from django.db import models
from datetime import datetime

# Create your models here.

def upload_to(instance, filename):
    now = datetime.now()
    print("now =", now)
    dt_string = now.strftime("%d%m%Y%H%M%S")
    return 'images/{username}/{time}/{filename}'.format(
        username=instance.username, filename=filename, time=dt_string)

class ProfilePicture(models.Model):
    username = models.TextField(primary_key=True)
    imagefile = models.ImageField(upload_to=upload_to, default='/image.png')

class ClientProfilePicture(models.Model):
    username = models.TextField(primary_key=True)
    clientid = models.IntegerField()
    jobid = models.IntegerField()
    imagefile = models.ImageField(upload_to=upload_to, default='/image.png')

