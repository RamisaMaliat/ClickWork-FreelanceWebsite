import React, { Component } from "react";
import Root from "./Root";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import DashboardAssignedJobs from "./components/dashboard/DashboardAssignedJobs";
import DashboardApprovedJobs from "./components/dashboard/DashboardApprovedJobs";
import DashboardCompletedJobs from "./components/dashboard/DashboardCompletedJobs";
import DashboardProposals from "./components/dashboard/DashboardProposals";
import DashboardInvitations from "./components/dashboard/DashboardInvitations";
import CreateProfile from "./subComponents/CreateProfile";
import requireAuth from "./utils/RequireAuth";
import FindFreelancer from "./components/FindFreelancer";
import ViewMyProfile from "./components/ViewMyProfile";
import FindWork from "./components/FindWork";
import FrontPage from "./subComponents/FrontPage";
import AddProfilePicture from "./subComponents/AddProfilePicture";
import FreelancerFeed from "./components/FreelancerFeed";
import FindWork2 from "./components/FindWork2";
import FindFreelancer2 from "./components/FindFreelancer2";
import Account from "./components/Account";
import CreateProfile2 from "./subComponents/CreateProfile2";
import PostedJobs from "./components/clientJobs/PostedJobs";
import PostAJob from "./components/clientJobs/PostAJob";
import ApprovedJobs from "./components/clientJobs/ApprovedJobs";
import CompletedJobs from "./components/clientJobs/CompletedJobs";
import ViewFreelancerProfile from "./components/ViewFreelancerProfile";
import SubmitProposal from "./components/SubmitProposal";
import ViewJobDetails from "./components/ViewJobDetails";
import SendInvitation from "./components/SendInvitation";
import Invite from "./components/Invite";
import ViewClientProfile from "./components/ViewClientProfile";
import UpdateProfilePicture from "./subComponents/UpdateProfilePicture";
import UpdateFreelancerProfile from "./components/UpdateFreelancerProfile";
import SearchFreelancer from "./components/SearchFreelancer";
import SearchFreelancerByUsername from "./components/SearchFreelancerByUsername";
import SearchFreelancerByName from "./components/SearchFreelancerByName";
import SearchFreelancerByCountry from "./components/SearchFreelancerByCountry";
import SearchFreelancerBySkills from "./components/SearchFreelancerBySkills";
import SearchFreelancerByCategory from "./components/SearchFreelancerByCategory";
import SearchFreelancerByCategory2 from "./components/SearchFreelancerByCategory2";
import ApproveAJob from "./components/ApproveAJob";
import ViewJobDetailsByClient from "./components/ViewJobDetailsByClient";
import UpdateClientProfile from "./components/UpdateClientProfile";
import ViewJobDetailsByClient2 from "./components/ViewJobDetailsByClient2";
import SearchJob from "./components/SearchJob";
import SearchJobByName from "./components/SearchJobByName";
import SearchJobBySkills from "./components/SearchJobBySkills";
import SearchJobByCountry from "./components/SearchJobByCountry";
import SearchJobByCategory from "./components/SearchJobByCategory";
import ViewClientProfile2 from "./components/ViewClientProfile2";
import JobCompleted from "./components/JobCompleted";
import RemoveJob from "./components/RemoveJob";
import RepostJob from "./components/RepostJob";
import ViewJobDetailsByClient3 from "./components/ViewJobDetailsByClient3";
import AssignJob from "./components/AssignJob";


if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

class App extends Component {
  render() {
    return ( 
      <div className="App" >
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous"></link>
        <Root>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/client/sendinvitation:jobid/to:freelancerid" component={requireAuth(Invite)} />
            <Route path="/client/approve/:jobid/doneby:freelancerusername" component={requireAuth(ApproveAJob)} />
            <Route path="/client/job/details/:id/proposals" component={requireAuth(ViewJobDetailsByClient2)} />
            <Route path="/client/job/details/:id/assigned" component={requireAuth(ViewJobDetailsByClient3)} />
            <Route path="/client/job/details/:id" component={requireAuth(ViewJobDetailsByClient)} />
            <Route path="/client/profile" component={requireAuth(ViewClientProfile)} />
            <Route path="/client/postedjobs" component={requireAuth(PostedJobs)} />
            <Route path="/client/approvedjobs" component={requireAuth(ApprovedJobs)} />
            <Route path="/client/completedjobs" component={requireAuth(CompletedJobs)} />
            <Route path="/client/:jobid" component={requireAuth(ViewClientProfile2)} />
            <Route path="/removejob/:jobid" component={requireAuth(RemoveJob)} />
            <Route path="/assignjob/:jobid" component={requireAuth(AssignJob)} />
            <Route path="/repostjob/:jobid" component={requireAuth(RepostJob)} />
            <Route path="/postjob" component={requireAuth(PostAJob)} />
            <Route path="/freelancer/myprofile" component={requireAuth(ViewMyProfile)} />
            <Route path="/dashboard/assigned" component={requireAuth(DashboardAssignedJobs)} />
            <Route path="/dashboard/completed" component={requireAuth(DashboardCompletedJobs)} />
            <Route path="/dashboard/approved" component={requireAuth(DashboardApprovedJobs)} />
            <Route path="/dashboard/myproposals" component={requireAuth(DashboardProposals)} />
            <Route path="/dashboard/myinvitations" component={requireAuth(DashboardInvitations)} />
            <Route path="/viewfreelancerprofile/:username" component={requireAuth(ViewFreelancerProfile)} />
            <Route path="/findTalent" component={FindFreelancer} />
            <Route path="/freelancejobs" component={requireAuth(FindWork2)} />
            <Route path="/freelancers" component={requireAuth(FindFreelancer2)} />
            <Route path="/searchfreelancers" component={requireAuth(SearchFreelancer)} />
            <Route path="/searchjobs" component={requireAuth(SearchJob)} />
            <Route path="/searchjobsbyname" component={requireAuth(SearchJobByName)} />
            <Route path="/searchjobsbyskills" component={requireAuth(SearchJobBySkills)} />
            <Route path="/searchjobsbycountry" component={requireAuth(SearchJobByCountry)} />
            <Route path="/searchjobsbycategory:id" component={requireAuth(SearchJobByCategory)} />
            <Route path="/searchfreelancersbycategory:id" component={requireAuth(SearchFreelancerByCategory2)} />
            <Route path="/searchfreelancersbycategory" component={requireAuth(SearchFreelancerByCategory)} />
            <Route path="/searchfreelancersbyusername" component={requireAuth(SearchFreelancerByUsername)} />
            <Route path="/searchfreelancersbyname" component={requireAuth(SearchFreelancerByName)} />
            <Route path="/searchfreelancersbycountry" component={requireAuth(SearchFreelancerByCountry)} />
            <Route path="/searchfreelancersbyskills" component={requireAuth(SearchFreelancerBySkills)} />
            <Route path="/findWork" component={FindWork} />
            <Route path="/createfreelancerprofile" component={requireAuth(CreateProfile)} />
            <Route path="/updatefreelancerprofile" component={requireAuth(UpdateFreelancerProfile)} />
            <Route path="/updateclientprofile" component={requireAuth(UpdateClientProfile)} />
            <Route path="/createclientprofile" component={requireAuth(CreateProfile2)} />
            <Route path="/addprofilepicture" component={requireAuth(AddProfilePicture)} />
            <Route path="/updateprofilepicture" component={requireAuth(UpdateProfilePicture)} />
            <Route path="/freelancer-myfeed" component={requireAuth(FreelancerFeed)} />
            <Route path="/account" component={requireAuth(Account)} />
            <Route path="/sendinvitation:id" component={requireAuth(SendInvitation)} />
            <Route path="/job/details/:id" component={requireAuth(ViewJobDetails)} />
            <Route path="/jobs/completed/:id" component={requireAuth(JobCompleted)} />
            <Route path="/jobs/:id" component={requireAuth(SubmitProposal)} />
            <Route path="/" component={FrontPage} />

          </Switch>
        </Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
      </div>
      
    );
  }
}

export default App;
