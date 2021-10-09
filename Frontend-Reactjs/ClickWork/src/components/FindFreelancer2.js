import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Footer from "../subComponents/Footer";
import Container2 from "../subComponents/Container2";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Row, Col } from 'react-bootstrap';
import { logout } from "./login/LoginActions";
import { createNoSubstitutionTemplateLiteral } from 'typescript';

var photos = new Object();

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  fetch(process.env.REACT_APP_API + "getallphotos"
  )
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var username = data[i].username;
        photos[username] = data[i].imagefile;
      }
      console.log(photos);
    });


  return (
    <dl className="dictionary">
      {posts.map(profile => (

        <div className="term">
          
            <dt>
              <span class="text-primary">{profile.Name}</span>
            </dt>
            <Row>
            <Col>

              <dd> <b>{"Name" + " " + ":" + " " + " "}</b>{profile.Name}</dd>
              <dd class="search_user"> <b>{"Username" + " " + ":" + " " + " "}</b><span>{profile.Username}</span></dd>
              <dd><b>{"City" + " " + ":" + " " + " "}</b> {profile.City}</dd>
              <dd><b>{"Country" + " " + ":" + " " + " "}</b> {profile.Country}</dd>
              <dd><b>{"Educational Institution" + " " + ":" + " " + " "}</b> {profile.EducationalInstitution}</dd>
              <dd><b>{"Educational Qualifications" + " " + ":" + " " + " "}</b> {profile.EducationalQualifications}</dd>
              <dd><b>{"Employment" + " " + ":" + " " + " "}</b> {profile.Employment}</dd>
              <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {profile.CompanyName}</dd>
              <dd><b>{"Field of work" + " " + ":" + " " + " "}</b> {profile.CategoryName}</dd>
              <dd><b>{"Skills" + " " + ":" + " " + " "}</b> {profile.Skills}</dd>
              <dd><b>{"Email" + " " + ":" + " " + " "}</b> {profile.Email}</dd>
              <dd><b>{"Additional Contact Details" + " " + ":" + " " + " "}</b></dd>
              <dd>{profile.AdditionalContactDetails}</dd>

              <a class="style-btn" href={"/viewfreelancerprofile/" + profile.Username}><button style={{ "marginTop": "10px", "fontSize": "16px" }} type="button" className="btn btn-outline-success submit ">View Profile</button></a>
            </Col>
            <Col style={{ "maxWidth": "300px"}}>
              <img height="220px" width="220px" style={{"borderRadius": "50%"}} src={("http://127.0.0.1:8000" + photos[profile.Username])} alt="iphone-mockup" />
            </Col>
          </Row>
        </div>

      ))}
    </dl>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ViewFreelancer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let usertoken = localStorage.getItem("token");
      const res = await axios.get(process.env.REACT_APP_API + 'freelancers');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <app>
      <div>
      <h1 className="newsfeed" style={{"fontSize":"35px", "margin": "auto", "maxWidth": "50%", "paddingBottom":"20px", "paddingTop":"100px" }} ><b>Freelancer Profiles</b></h1>
        <div style={{"fontSize": "16px", "margin": "auto", "maxWidth": "40%", "paddingBottom":"10px" }}>Do you want to filter profiles? <a href="/searchfreelancers">Search freelancers with filters</a></div>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>

    </app>
  );
};

class FindFreelancer2 extends Component {

  constructor() {
    super();
    this.state = {
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

  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { user } = this.props.auth;

    console.log(this.state.acc);

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
              <a class="nav-link active" href="" >Find Talent</a>
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
              <a class="nav-link active" href="/freelancers" >Find Talent</a>
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
        <div className="container" >

          <div class="col-lg-6">
            <h1 class="big-heading" style={{"fontFamily":"Georgia","color":"black"}}>Hire a pro
              for any skill!</h1>
            <p class="letter" style={{"fontSize":"16px"}}>Join millions of businesses and independent pros who do great work together. Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.

            </p>

          </div>

          <div class="col-lg-6">
            <img src="https://media.istockphoto.com/vectors/freelance-occupation-concept-relaxed-man-freelancer-character-sitting-vector-id1189735603?k=6&m=1189735603&s=612x612&w=0&h=WY1sIHzsDSljpCL_fQl3N1ADsYqQWUvITaMigdAtkJ0=" alt="iphone-mockup" />
          </div>


        </div>
        <div class="container">
          <ViewFreelancer />
          <Footer />
        </div>


      </div>
    );
  }
}

FindFreelancer2.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(FindFreelancer2));