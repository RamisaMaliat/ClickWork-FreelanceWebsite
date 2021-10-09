import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";

class ViewClientProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            client: [],
            picture: [],
            acc: "",
        };
        
    }


    onLogout = (e) => {
        e.preventDefault();
        this.props.logout();
      };

    fetchData() {
        let usertoken = localStorage.getItem("token");

        fetch(process.env.REACT_APP_API + "GetAccount",
            {
                headers: {
                    'Authorization': 'Bearer ' + usertoken
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    acc: data[0].AccountType
                });
                console.log(this.state.acc);
            });


        fetch(process.env.REACT_APP_API + "client/profile",
            {
                headers: {
                    'Authorization': 'Bearer ' + usertoken
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    client: data
                });
            });
        fetch(process.env.REACT_APP_API + "getprofilepicture",
            {
                headers: {
                    'Authorization': 'Bearer ' + usertoken
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    picture: data
                });
                console.log("http://127.0.0.1:8000" + data[0].imagefile);
            });



    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        console.log(window.location.pathname);

        const { user } = this.props.auth;

        const profiles = this.state.client;
        const picture = this.state.picture;

        
        const items = profiles.map((profile) =>
            <div className="term">
                <dt style={{ "paddingBottom": "20px" }}>
                    <span ><h2 class="text-primary">{profile.Name}</h2></span>
                    <span style={{ "fontSize": "17px" }}>Client</span>
                </dt>
                
                <dd> <b>{"Name" + " " + ":" + " " + " "}</b>{profile.Name}</dd>
                <dd> <b>{"Username" + " " + ":" + " " + " "}</b>{profile.Username}</dd>
                <dd><b>{"City" + " " + ":" + " " + " "}</b> {profile.City}</dd>
                <dd><b>{"Country" + " " + ":" + " " + " "}</b> {profile.Country}</dd>
                <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {profile.CompanyName}</dd>
                <dd><b>{"Email" + " " + ":" + " " + " "}</b> {profile.Email}</dd>
                

            </div>);

        const profilePicture = picture.map((profile) =>
            <div style={{ "marginLeft": "100px" }}>
                <img height="300px" width="300px" src={("http://127.0.0.1:8000" + profile.imagefile)} alt="iphone-mockup" />
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
                  <a class="nav-link " href="/client/postedjobs">My Jobs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="/postjob">Post Job</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" >My Profile</a>
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
                    <Row>
                        <Col>
                            <dl >{items}</dl>
                        </Col>
                        <Col>
                            <dl>{profilePicture}</dl>
                        </Col>
                    </Row>
                    <a href="/updateclientprofile"><input name="profileImg" id="upprofilephoto" class="btn btn-sm btn-dark " type="button" style={{ "marginLeft": "5px", "fontSize":"15px" }} value="Update Profile Info" /></a>
                    <a href="/updateprofilepicture"><input name="profileImg" id="upprofilephoto" class="btn btn-sm btn-dark " style={{ "marginLeft": "5px", "fontSize":"15px" }} type="button" value="Update Profile Picture" /></a>
                </div>

                <div class="container" style={{ marginTop: "100px" }} >
                    
                    <Footer />
                </div>
            </div>
        );

    }

}

ViewClientProfile.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(ViewClientProfile));