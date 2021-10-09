from django.conf.urls import url, include
from django.urls import path
from . import views

accounts_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
]

urlpatterns = [
    path('SetAccount',views.SetAccount,name=''),
    path('GetAccount',views.getAccount,name=''),
]