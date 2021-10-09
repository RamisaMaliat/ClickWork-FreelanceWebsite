import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";
import Jobs from "./myprofile/jobs";
import Jobs2 from "./myprofile/jobs2";
import Jobs3 from "./myprofile/jobs3";


class ViewMyProfile extends React.Component{
  constructor() {
    super();
    this.state = {
        freelancers: [],
        picture: [],
        acc: "",
        job: 1,
        job1length: 0,
        job2length: 0,
        job3length: 0
    };
    this.job1 = this.job1.bind(this);
    this.job2 = this.job2.bind(this);
    this.job3 = this.job3.bind(this);
}

job1(){
    this.setState({
        job: 1
    });
}

job2(){
    this.setState({
        job: 2
    });
}

job3(){
    this.setState({
        job: 3
    });
}


onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };
  
  fetchData(){
      let usertoken = localStorage.getItem("token");
      let user = JSON.parse(window.localStorage.getItem("user"));
      user = user["username"];
      fetch(process.env.REACT_APP_API+"freelancer/profile", 
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
      )
      .then(response=>response.json())
      .then((data)=>{
          this.setState({
            freelancers:data
          });
      });
      fetch(process.env.REACT_APP_API+"getprofilepicture", 
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
      )
      .then(response=>response.json())
      .then((data)=>{
          this.setState({
            picture:data
          });
          console.log("http://127.0.0.1:8000"+data[0].imagefile);
      });
      fetch(process.env.REACT_APP_API + 'freelancer/viewfreelancerprofile/'+user+'/approved', 
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
      )
      .then(response=>response.json())
      .then((data)=>{
          this.setState({
            job1length:data.length
          });
          console.log(data.length);
      });
      fetch(process.env.REACT_APP_API + 'freelancer/viewfreelancerprofile/'+user+'/completed', 
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
      )
      .then(response=>response.json())
      .then((data)=>{
          this.setState({
            job2length:data.length
          });
          console.log(data.length);
      });
      fetch(process.env.REACT_APP_API + 'freelancer/viewfreelancerprofile/'+user+'/assigned', 
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
      )
      .then(response=>response.json())
      .then((data)=>{
          this.setState({
            job3length:data.length
          });
          console.log(data.length);
      });
      
  }

  componentDidMount(){
      this.fetchData();
  }

  render(){

    const { user } = this.props.auth;
    const { acc } = this.state.acc;
    const { job } = this.state;

    
    const profiles=this.state.freelancers;
    const picture=this.state.picture;

    let jobs1 = <div>
            <app>
                <div class="container" style={{ "height": "100px", "paddingTop": "70px" }} >
                    <ul class="nav nav-tabs" >
                        <li role="presentation" class="active" style={{ "paddingRight": "40px" }}><a>Approved Jobs ({this.state.job1length})</a></li>
                        <li role="presentation" style={{ "paddingRight": "40px" }}><a class="text-primary" onClick={this.job2}>Completed Jobs ({this.state.job2length})</a></li>
                        <li role="presentation" style={{ "paddingRight": "40px" }}><a class="text-primary" onClick={this.job3}>Assigned Jobs ({this.state.job3length})</a></li>

                    </ul>
                </div>
                <Jobs />
            </app>
        </div>;

        let jobs2 = <div>
            <app>
                <div class="container" style={{ "height": "100px", "paddingTop": "70px" }} >
                    <ul class="nav nav-tabs" >
                        <li role="presentation" style={{ "paddingRight": "40px" }}><a class="text-primary" onClick={this.job1}>Approved Jobs ({this.state.job1length})</a></li>
                        <li role="presentation" class="active" style={{ "paddingRight": "40px" }}><a>Completed Jobs ({this.state.job2length})</a></li>
                        <li role="presentation" style={{ "paddingRight": "40px" }}><a class="text-primary" onClick={this.job3}>Assigned Jobs ({this.state.job3length})</a></li>

                    </ul>
                </div>
                <Jobs2 />
            </app>
        </div>;

        let jobs3 = <div>
            <app>
                <div class="container" style={{ "height": "100px", "paddingTop": "70px" }} >
                    <ul class="nav nav-tabs" >
                        <li role="presentation" style={{ "paddingRight": "40px" }}><a class="text-primary" onClick={this.job1}>Approved Jobs ({this.state.job1length})</a></li>
                        <li role="presentation"style={{ "paddingRight": "40px" }}><a class="text-primary" onClick={this.job2}>Completed Jobs ({this.state.job2length})</a></li>
                        <li role="presentation" class="active" style={{ "paddingRight": "40px" }}><a>Assigned Jobs ({this.state.job3length})</a></li>

                    </ul>
                </div>
                <Jobs3 />
            </app>
        </div>;


    
    const items = profiles.map((profile)=>
    <div className="term">   
    <dt style={{ "paddingBottom": "30px" }}>
                    <span ><h2 class="text-primary">{profile.Name}</h2></span>
                    <span style={{ "fontSize": "17px" }}>Freelancer</span>
                </dt>
    <dd> <b>{"Name"+ " "+ ":"+" "+ " "}</b>{profile.Name}</dd>
    <dd> <b>{"Username"+ " "+ ":"+" "+ " "}</b>{profile.Username}</dd>
    <dd><b>{"City"+ " "+ ":"+" "+ " "}</b> {profile.City}</dd>
    <dd><b>{"Country"+ " "+ ":"+" "+ " "}</b> {profile.Country}</dd>
    <dd><b>{"Educational Institution"+ " "+ ":"+" "+ " "}</b> {profile.EducationalInstitution}</dd>
    <dd><b>{"Educational Qualifications"+ " "+ ":"+" "+ " "}</b> {profile.EducationalQualifications}</dd>
    <dd><b>{"Employment"+ " "+ ":"+" "+ " "}</b> {profile.Employment}</dd>
    <dd><b>{"Company Name"+ " "+ ":"+" "+ " "}</b> {profile.CompanyName}</dd>
    <dd><b>{"Field of work"+ " "+ ":"+" "+ " "}</b> {profile.CategoryName}</dd>
    <dd><b>{"Skills"+ " "+ ":"+" "+ " "}</b> {profile.Skills}</dd>
    <dd><b>{"Email"+ " "+ ":"+" "+ " "}</b> {profile.Email}</dd>
    <dd><b>{"Additional Contact Details"+ " "+ ":"+" "+ " "}</b></dd>
    <dd>{profile.AdditionalContactDetails}</dd>
   
    </div>);

    const profilePicture = picture.map((profile)=>
    <div class="">
    <img height="300px" width="300px" src={("http://127.0.0.1:8000"+profile.imagefile)} alt="iphone-mockup" />
  </div>
  );
    

    return (
      <div>
        <header>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand" >Clickwork</a>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                  <a class="nav-link " href="/dashboard/assigned">Dashboard</a>
                </li>
              <li class="nav-item ">
                  <a class="nav-link" href="/freelancer-myfeed">My Feed</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="/profile">My Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/freelancejobs">Find Work</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/freelancers" >Find Talent</a>
                </li>
                
              </ul>

            </div>

            <ul class="navbar-nav ml-auto">
            <form class="form-inline mt-2 mt-md-0">
                  <span style={{ "paddingRight": "20px", "color": "white" }}>User : <b>{user.username}</b></span>
                  <li class="nav-item">
                  <a class="nav-link" href="/login" onClick={this.onLogout}>Log Out</a>
                </li>
                </form>  
            </ul>
          </nav>
        </header>
        <div class="container" style={{ paddingTop: "30px" }}>
                    <Row style={{"marginBottom":"20px"}}>
                        <Col>
                            <dl >{items}</dl>
                        </Col>
                        <Col>
                            <dl>{profilePicture}</dl>
                        </Col>
                    </Row>
                    <a href="/updatefreelancerprofile"><input name="profileImg" id="upprofilephoto" class="btn btn-sm btn-dark " type="button" style={{ "marginLeft": "5px", "fontSize":"15px" }} value="Update Profile Info" /></a>
                    <a href="/updateprofilepicture"><input name="profileImg" id="upprofilephoto" class="btn btn-sm btn-dark " style={{ "marginLeft": "5px", "fontSize":"15px" }} type="button" value="Update Profile Picture" /></a>
                    <Row>
                        
                        {job==1? jobs1:""}
                        {job==2? jobs2:""}
                        {job==3? jobs3:""}
                        
                    </Row>
                </div>

                <div class="container" style={{ marginTop: "100px" }} >
                    <Footer />
                </div>
            </div>
    );
    
  }
  
}

ViewMyProfile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(ViewMyProfile));