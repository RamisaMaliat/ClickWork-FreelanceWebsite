from django.urls import path

from . import views

urlpatterns = [
    path('uploadprofilephoto',views.uploadphoto,name=''),
    path('updateprofilephoto',views.updatephoto,name=''),
    path('getprofilepicture',views.getphoto,name=''),
    path('getallphotos',views.getallphotos,name=''),
    path('getallclientphotos',views.getallclientphotos,name=''),
    path('getfreelancerprofilepicture/viewfreelancerprofile/<slug:username>',views.getfreelancerphoto,name=''),
    path('getclientphoto/<slug:username>',views.getfreelancerphoto,name=''),
    
] 
