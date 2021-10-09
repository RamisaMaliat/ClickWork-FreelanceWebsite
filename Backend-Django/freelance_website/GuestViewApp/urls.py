from django.urls import path

from . import views

urlpatterns =[
    path('',views.findcategory, name='findcategory'),
    path('freelancers',views.findfreelancer, name='findfreelancer'),
    path('searchfreelancersbycategory<slug:id>',views.searchfreelancersbycategory, name='searchfreelancersbycategory'),
    path('searchjobsbycategory<slug:id>',views.searchjobsbycategory, name='searchjobsbycategory'),
    path('freelanceJobs',views.findwork, name='freelanceJobs')
]