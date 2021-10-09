from django.urls import path

from . import views

urlpatterns = [

    path('client/signup',views.signup,name=''),
    path('removejob/<slug:jobid>',views.removejob, name=''),
    path('repostjob/<slug:jobid>',views.repostjob, name=''),
    path('job/removejob/<slug:jobid>',views.jobdetails,name=''),
    path('job/repostjob/<slug:jobid>',views.jobdetails,name=''),
    path('client/postedjobs',views.viewpostedjobs,name=''),
    path('client/<slug:username>/postedjobs',views.viewclientpostedjobs,name=''),
    path('client/approvedjobs',views.viewapprovedjobs,name=''),
    path('client/completedjobs',views.viewcompletedjobs,name=''),
    path('client/approve/<slug:jobid>/doneby<slug:freelancerusername>',views.approvejob,name=''),
    path('client/postjob',views.postjob,name=''),
    path('client/assignjob<slug:jobid>/to<slug:freelancerid>',views.assignjob, name=''),
    path('client/sendinvitation<slug:jobid>/to<slug:freelancerid>',views.invitefreelancer, name=''),
    path('client/job/details/<slug:jobid>/invitations',views.viewinvitations, name=''),
    path('client/job/details/<slug:jobid>/proposals',views.viewproposals, name=''),
    path('client/job/details/<slug:jobid>/assigned',views.viewassigned, name=''),
    path('sendinvitation<slug:jobid>',views.sendinvitation, name=''),
    path('assignjob<slug:jobid>',views.sendinvitation, name=''),
    path('client/profile',views.viewmyprofile,name=''),
    path('client/<slug:jobid>',views.viewclientprofile,name=''),
    path('client/update',views.update,name=''),
    
    

]
