import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Footer from "../subComponents/Footer";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container2 from "../subComponents/Container2";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { logout } from "./login/LoginActions";
import { Link } from "react-router-dom";

var photos = new Object();

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  fetch(process.env.REACT_APP_API + "getallclientphotos"
  )
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var jobid = data[i].jobid;
        photos[jobid] = data[i].imagefile;
      }
      console.log(photos);
    });

  return (
    <dl className="dictionary">
      {posts.map(job => (
        <div className="term">
           <Row>
          <Col style={{"maxWidth": "40px", "paddingTop":"5px"}}>
          <img height="30px" width="30px" style={{"borderRadius": "50%"}} src={("http://127.0.0.1:8000" + photos[job.JobId])} alt="" />
          </Col>
          <Col>
          <dt>
            <span >{job.Headline}</span>
          </dt>
          </Col>
          </Row>
          <dd> <b>{"Category" + " " + ":" + " " + " "}</b>{job.CategoryName}</dd>
          <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{job.Description}</dd>
          <dd><b>{"Skills" + " " + ":" + " " + " "}</b>{job.Skills}</dd>
          <dd><b>{"Additional Requirements" + " " + ":" + " " + " "}</b>{job.AdditionalRequirements}</dd>
          <u><b>Offered By : </b></u>
          <dd><b>{"Client Name" + " " + ":" + " " + " "}</b> {job.ClientName}</dd>
          <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {job.CompanyName}</dd>
          <dd><b>{"Email" + " " + ":" + " " + " "}</b> {job.Email}</dd>
          <dd><b>{"City" + " " + ":" + " " + " "}</b> {job.City}</dd>
          <dd><b>{"Country" + " " + ":" + " " + " "}</b> {job.Country}</dd>

          <a href={"/jobs/"+job.JobId}><button type="button" className="btn btn-outline-success submit">Submit Proposal</button></a>
          <a href={"/job/details/"+job.JobId}><button type="button" className="btn btn-outline-success">View Job details<FontAwesomeIcon icon="Bookmark" /></button></a>
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

const ViewWork = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let usertoken = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000" + window.location.pathname);
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
    <app class="container">
      <div>
        <Posts posts={currentPosts} loading={loading} />
      </div>
    </app>
  );
};

class SearchJobByCategory extends Component {

  constructor() {
    super();
    this.searchByCategory = this.searchByCategory.bind(this);

    let var_category = "";
    for (var i = 21; i < window.location.pathname.length; i++) {
      var_category = var_category + window.location.pathname[i];
    }

    console.log(var_category);

    this.state = {
      acc: "",
      categories: [],
      category: var_category
    };
  }

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

    fetch(process.env.REACT_APP_API + 'freelancer/findCategory',
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
    )
      .then(response => response.json())
      .then((data) => {
        this.setState({
          categories: data
        });
      })

  }

  componentDidMount() {
    this.fetchData();  
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  searchByCategory(event) {
    event.preventDefault();
    let path = "/searchjobsbycategory" + document.getElementById('selected').value;
    console.log(path);
    window.location.replace(path);
  }

  searchByCountry() {
    let filter = document.getElementById('myInput').value.toUpperCase();

    let profiles = document.getElementsByClassName('term');

    let usernames = document.getElementsByClassName('search_country');

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

  searchBySkills() {
    let filter = document.getElementById('myInput').value.toUpperCase();

    let profiles = document.getElementsByClassName('term');

    let usernames = document.getElementsByClassName('search_skills');

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

    const categories = this.state.categories;

    const items = categories.map((post) =>
      <option selected={post.CategoryID==this.state.category} value={post.CategoryID}>{post.CategoryName}</option>
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
                  <a class="nav-link" href="/freelancer/myprofile">My Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="">Find Work</a>
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
        
        <div class="container">
          <h1 className="newsfeed">Job Offers</h1>
          <div class="dictionary" style={{ "margin": "auto", "width": "50%" }} >
          <div id="myBtnContainer" style={{"marginBottom":"10px"}}>
            <img src="filter.png" title="Filter By" id="filter-img" height="40px" width="30px" style={{"marginRight":"10px"}} />
            <a href="/searchjobs"><button class="btn search-btn " >Show all</button></a>
            <a href="/searchjobsbyname"><button class="btn search-btn " >Client Name</button></a>
            <a href="/searchjobsbycategory1"><button class="btn search-btn active" >Field of work</button></a>
            <a href="/searchjobsbyskills"><button class="btn search-btn">Skills</button></a>
            <a href="/searchjobsbycountry"><button class="btn search-btn">Country</button></a>
          </div>
          </div>

          
          <div class="dictionary" style={{ "margin": "auto", "width": "50%" }} >
            <form onSubmit={this.searchByCategory}>

              <select id='selected' class="form-select form-select-lg form-control mr-sm-2"
               name="category" required placeholder="select a category" style={{ "marginBottom": "10px", "fontSize": "15px", "width":"90%", "display":"inline" }}>
                {items}
              </select>

              <button className="btn btn-dark" style={{ "marginBottom": "7px", "color": "white", fontSize: "15px" }} type="submit" >
              <i class="fa fa-search"></i>
              </button>

            </form>
            
          </div>
          
          <ViewWork />
          <Footer />
        </div>


      </div>
    );
  }
}

SearchJobByCategory.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(SearchJobByCategory));