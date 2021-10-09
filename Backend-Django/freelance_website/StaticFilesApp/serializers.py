from rest_framework import serializers
from StaticFilesApp.models import *

class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePicture
        fields = ('username',
                  'imagefile')

class ClientProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfilePicture
        fields = ('username',
                  'jobid',
                  'clientid',
                  'imagefile')

