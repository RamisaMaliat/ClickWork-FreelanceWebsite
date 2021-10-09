import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";

class ViewClientProfile2 extends React.Component {
    constructor() {
        super();
        this.state = {
            client: [],
            picture: [],
            acc: "",
            jobs: []
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


        fetch("http://127.0.0.1:8000" + window.location.pathname,
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
            })
            .then(() => {

                console.log(this.state.client);

                fetch(process.env.REACT_APP_API + "getclientphoto/" + this.state.client[0].Username,
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
                            picture: data
                        });
                        console.log("http://127.0.0.1:8000" + data[0].imagefile);
                    });

                fetch(process.env.REACT_APP_API + "client/" + this.state.client[0].Username + "/postedjobs",
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
                            jobs: data
                        });

                    });

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
        const jobs = this.state.jobs;


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

        const postedjoblist =
            <div style={{ "maxWidth": "1000px", "marginTop": "20px", "marginLeft":"20px" }}>
                <dl className="dictionary">
                    {jobs.map(post => (
                        <div className="term" style={{ "paddingBottom": "10px" }}>
                            <dt>
                                <span><h3><a id={post.JobID} href={"../jobs/jobdetails/" + post.JobId}>{post.Headline}</a>{post.Removed == 1 ? <span class="text-muted" style={{ "fontSize": "15px" }}>&nbsp;&nbsp;&nbsp;&nbsp;(Removed)</span> : ''}</h3></span>
                            </dt>
                            <dd> <b>{"Headline" + " " + ":" + " " + " "}</b>{post.Headline}</dd>
                            <dd><b>{"Category" + " " + ":" + " " + " "}</b>{post.CategoryName}</dd>
                            <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{post.Description}</dd>
                            <dd><b>{"Required skills" + " " + ":" + " " + " "}</b>{post.Skills}</dd>
                            <dd><b>{"Additional requirements" + " " + ":" + " " + " "}</b>{post.AdditionalRequirements}</dd>
                            <div style={{ "paddingTop": "10px" }}>
                                <a href={"/job/details/" + post.JobId}><button type="button" className="btn btn-outline-success">View details</button></a>
                                {post.Removed == 0 ? <a href={"/jobs/" + post.JobId}><button type="button" className="btn btn-outline-success">Submit Proposal</button></a> : ''}

                            </div>
                        </div>
                    ))}
                </dl>
            </div>;

        let postedjobs = 
            <app>
                <div style={{"height": "100px", "paddingTop": "40px"}} >
                    <ul class="nav nav-tabs" >
                        <li role="presentation" class="active"  style={{ "paddingRight": "40px" }}><a style={{"fontSize":"16px","color":"black"}}><b>Posted Jobs</b></a></li>

                    </ul>
                </div>
                {postedjoblist}
            </app>
        ;



        const freelancer_header = (<header>
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
                            <a class="nav-link" href="/freelancer/myprofile">My Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/freelancejobs">Find Work</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="" >Find Talent</a>
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
        </header>);


        const client_header = (<header>
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
                            <a class="nav-link" href="/client/profile">My Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="/freelancers" >Find Talent</a>
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
        </header>);

        return (
            <div>
                {this.state.acc == "Freelancer" ? freelancer_header : client_header}
                <div class="container" style={{ paddingTop: "30px" }}>
                    <Row>
                        <Col>
                            <dl >{items}</dl>
                        </Col>
                        <Col>
                            <dl>{profilePicture}</dl>
                        </Col>
                    </Row>

                </div>

                <Row>

                    <div style={{ "maxWidth": "1000px", "marginTop": "30px", "marginLeft":"200px" }}>
                        <app>
                        {postedjobs}
                        </app>
                    </div>

                </Row>

                <div class="container" style={{ marginTop: "100px" }} >


                    <Footer />
                </div>
            </div>
        );

    }

}

ViewClientProfile2.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(ViewClientProfile2));