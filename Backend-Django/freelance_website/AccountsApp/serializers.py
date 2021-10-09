from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class AccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountTypeModel
        fields = (
            'Username',
            'AccountType'
        )
