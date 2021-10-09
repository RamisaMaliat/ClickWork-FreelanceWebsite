from django import forms
from .models import *
  
class ProfilePictureForm(forms.ModelForm):
  
    class Meta:
        model = ProfilePicture
        fields = ['username', 'imagefile']