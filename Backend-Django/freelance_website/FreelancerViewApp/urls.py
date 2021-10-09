from django.urls import path

from . import views

urlpatterns = [

    path('freelancer/viewfreelancerprofile/<slug:username>/approved',views.viewfreelancerprofileapproved,name=''),
    path('freelancer/viewfreelancerprofile/<slug:username>/assigned',views.viewfreelancerprofileassigned,name=''),
    path('freelancer/viewfreelancerprofile/<slug:username>/completed',views.viewfreelancerprofilecompleted,name=''),
    path('freelancer/sentProposal',views.sentProposal,name=''),
    path('freelancer/sentRequest',views.sentRequest,name=''),
    path('freelancer/profile',views.viewmyprofile,name=''),
    path('freelancer/freelancers',views.findfreelancer,name=''),
    path('freelancer/jobs',views.findwork,name=''),
    path('freelancer/viewinvitedjobs',views.viewinvitedjobs,name=''),
    path('freelancer/viewproposedjobs',views.viewproposedjobs,name=''),
    path('freelancer/viewassignedjobs',views.viewassignedjobs,name=''),
    path('freelancer/viewcompletedjobs',views.viewcompletedjobs,name=''),
    path('freelancer/viewapprovedjobs',views.viewapprovedjobs,name=''),
    path('freelancer/findCategory',views.findcategory,name=''),
    path('freelancer/getCategory',views.getcategory,name=''),
    path('freelancer/signup',views.signup,name=''),
    path('freelancer/update',views.update,name=''),
    path('freelancer/feed',views.myfeed,name=''),
    path('job/client/sendinvitation<slug:jobid>/to<slug:freelancerid>',views.viewjobdetails2,name=''),
    path('job/sendinvitation<slug:jobid>',views.viewjobdetails,name=''),
    path('assignjob/<slug:jobid>',views.viewjobdetails,name=''),
    path('client/job/details/<slug:jobid>/proposals/details',views.viewjobdetails,name=''),
    path('client/job/details/<slug:jobid>/assigned/details',views.viewjobdetails,name=''),
    path('client/job/details/<slug:jobid>',views.viewjobdetails,name=''),
    path('job/details/<slug:jobid>',views.viewjobdetails,name=''),
    path('freelancer/viewfreelancerprofile/<slug:username>',views.viewfreelancerprofile,name=''),


]
