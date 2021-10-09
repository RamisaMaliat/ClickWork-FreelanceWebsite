import React, { useState, useEffect, Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Container, Navbar, Nav } from "react-bootstrap";
import Footer from "../../subComponents/Footer";
import { logout } from "../login/LoginActions";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


const Posts = ({ posts, loading }) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <dl className="dictionary">
      {posts.map(post => (
        <div className="term" style={{"marginBottom":"70px"}}>
          <dt>
          <span><a id={post.JobID} href={"../jobs/jobdetails/"+post.JobID}><h3>{post.Headline}</h3></a></span>
          </dt>
          <dd> <b>{"Headline" + " " + ":" + " " + " "}</b>{post.Headline}</dd>
          <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{post.Description}</dd>
          <dd><b>{"Required skills" + " " + ":" + " " + " "}</b>{post.Skills}</dd>
          <dd><b>{"Additional requirements" + " " + ":" + " " + " "}</b>{post.AdditionalRequirements}</dd>
          <h4 style={{"paddingTop":"20px"}}><b>Sent to : </b></h4>
          <dd><b>{"Client Name" + " " + ":" + " " + " "}</b>{post.ClientName}</dd>
          <dd><b>{"Client Email" + " " + ":" + " " + " "}</b>{post.ClientEmail}</dd>

          <a href={"/client/"+post.JobID}><button type="button" style={{"marginTop":"20px"}} className="btn btn-success submit">View Client Profile</button></a>

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

const ViewJobs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let usertoken = localStorage.getItem("token");
      const res = await axios.get(process.env.REACT_APP_API + 'freelancer/viewproposedjobs',
        {
          headers: {
            'Authorization': 'Bearer ' + usertoken
          }
        }
      );
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
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </app>
  );
};

class DashboardProposals extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <app>
        
        <header>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand" >Clickwork</a>

            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                  <a class="nav-link active" href="">Dashboard</a>
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
                  <a class="nav-link" href="/freelancers" >Find Talent</a>
                </li>
                 </ul>

            </div>
            <ul class="navbar-nav ml-auto">
            <form class="form-inline mt-2 mt-md-0">
                  <span style={{ "paddingRight": "20px", "color": "white" }}>User : <b>{user.username}</b></span>
                  <li class="nav-item">
                  <a class="nav-link" onClick={this.onLogout}>Log Out</a>
                </li>
                </form>  
            </ul>
          </nav>
        </header>
        <div class="container" style={{ "height": "100px", "paddingTop": "0px" }} >
          <ul class="nav nav-tabs" >
            <li role="presentation" style={{ "paddingRight": "40px" }}><a href="assigned">Assigned Jobs</a></li>
            <li role="presentation" style={{ "paddingRight": "40px" }}><a href="completed">Completed Jobs</a></li>
            <li role="presentation" style={{ "paddingRight": "40px" }}><a href="approved">Approved Jobs</a></li>
            <li role="presentation" style={{ "paddingRight": "40px" }}><a href="myinvitations">My Invitations</a></li>
            <li role="presentation" class="active" style={{ "paddingRight": "40px" }}><a>My Proposals</a></li>
          </ul>
        </div>
        <div class="center-block log-in border" style={{"maxWidth":"1000px", "padding":"10px"}}>
        <ViewJobs />
        </div>
        <Footer />
      </app>
    );

  }
}

DashboardProposals.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(DashboardProposals));