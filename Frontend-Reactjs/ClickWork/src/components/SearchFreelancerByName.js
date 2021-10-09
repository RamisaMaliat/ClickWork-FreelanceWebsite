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
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
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

            <dd class="search_name"> <b>{"Name" + " " + ":" + " " + " "}</b><span>{profile.Name}</span></dd>
              <dd class="search_user"> <b>{"Username" + " " + ":" + " " + " "}</b><span>{profile.Username}</span></dd>
              <dd class="search_country"><b>{"City" + " " + ":" + " " + " "}</b><span>{profile.City}</span></dd>
              <dd ><b>{"Country" + " " + ":" + " " + " "}</b><span>{profile.Country}</span></dd>
              <dd ><b>{"Educational Institution" + " " + ":" + " " + " "}</b><span>{profile.EducationalInstitution}</span></dd>
              <dd ><b>{"Educational Qualifications" + " " + ":" + " " + " "}</b><span>{profile.EducationalQualifications}</span></dd>
              <dd ><b>{"Employment" + " " + ":" + " " + " "}</b><span>{profile.Employment}</span></dd>
              <dd ><b>{"Company Name" + " " + ":" + " " + " "}</b><span>{profile.CompanyName}</span></dd>
              <dd ><b>{"Field of work" + " " + ":" + " " + " "}</b><span>{profile.CategoryName}</span></dd>
              <dd class="search_skills"><b>{"Skills" + " " + ":" + " " + " "}</b><span>{profile.Skills}</span></dd>
              <dd ><b>{"Email" + " " + ":" + " " + " "}</b><span>{profile.Email}</span></dd>
              <dd ><b>{"Additional Contact Details" + " " + ":" + " " + " "}</b></dd>
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
  const [postsPerPage, setPostsPerPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let usertoken = localStorage.getItem("token");
      const res = await axios.get(process.env.REACT_APP_API + 'freelancers');
      setPosts(res.data);
      setPostsPerPage(res.data.length);
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
        <Posts posts={currentPosts} loading={loading} />
      </div>

    </app>
  );
};

class SearchFreelancerByName extends Component {

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


  searchByName() {
    let filter = document.getElementById('myInput').value.toUpperCase();

    let profiles = document.getElementsByClassName('term');

    let usernames = document.getElementsByClassName('search_name');

    for (var i = 0; i < profiles.length; i++) {
      let username = usernames[i].getElementsByTagName('span')[0];
      console.log(username);
      if (username) {
        let textvalue = username.textContent || username.innerHTML;

        if (textvalue.toUpperCase().indexOf(filter) > -1) {
          profiles[i].style.display = "";
        } else {
          profiles[i].style.display = "none";
        }
      }
    }
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

        <div class="container">
          <h1 className="newsfeed">Freelancer Profiles</h1>
          <div class="dictionary" style={{ "margin": "auto", "width": "50%" }} >
          <div id="myBtnContainer" style={{"marginBottom":"10px"}}>
            <img src="filter.png" title="Filter By" id="filter-img" height="40px" width="30px" style={{"marginRight":"10px"}} />
            <a href="/searchfreelancers"><button class="btn search-btn " >Show all</button></a>
            <a href="/searchfreelancersbyusername"><button class="btn search-btn " >Username</button></a>
            <a href="/searchfreelancersbyname"><button class="btn search-btn active" >Name</button></a>
            <a href="/searchfreelancersbycategory"><button class="btn search-btn" >Field of work</button></a>
            <a href="/searchfreelancersbyskills"><button class="btn search-btn">Skills</button></a>
            <a href="/searchfreelancersbycountry"><button class="btn search-btn">Country</button></a>
          </div>
          </div>
        
          <div class="dictionary" style={{ "margin": "auto", "width": "50%" }} >
            <input style={{ "marginBottom": "10px" }} class="form-control mr-sm-2 fa" type="text" name="" id="myInput"
              placeholder="search by name" onKeyUp={this.searchByName} />
          </div>
          <ViewFreelancer />
          <Footer />
        </div>


      </div>
    );
  }
}

SearchFreelancerByName.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(SearchFreelancerByName));