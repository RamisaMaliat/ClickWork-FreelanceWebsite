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
        <div className="term" style={{"paddingBottom":"10px"}}>
          <dt>
          <span><h3><a id={post.JobID} href={"../jobs/jobdetails/"+post.JobId}>{post.Headline}</a>{post.Removed==1 ? <span class="text-muted" style={{"fontSize":"15px"}}>&nbsp;&nbsp;&nbsp;&nbsp;(Removed)</span> : ''}</h3></span> 
          </dt>
          <dd> <b>{"Headline" + " " + ":" + " " + " "}</b>{post.Headline}</dd>
          <dd><b>{"Category" + " " + ":" + " " + " "}</b>{post.CategoryName}</dd>
          <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{post.Description}</dd>
          <dd><b>{"Required skills" + " " + ":" + " " + " "}</b>{post.Skills}</dd>
          <dd><b>{"Additional requirements" + " " + ":" + " " + " "}</b>{post.AdditionalRequirements}</dd>
          <div style={{"paddingTop":"10px"}}>
          <a href={"/client/job/details/"+post.JobId}><button type="button" className="btn btn-outline-success">View details</button></a>
          {post.Removed==0 ? <a href={"/sendinvitation"+post.JobId}><button type="button" className="btn btn-outline-success">Send Invitation</button></a> : ''}
          {post.Removed==0 ? <a href={"/assignjob"+post.JobId}><button type="button" className="btn btn-outline-success" >Assign</button></a> : ''}
          {post.Removed==0 ? <a href={"/removejob/"+post.JobId}><button type="button" className="btn btn-outline-success" >Remove Post</button></a> : ''}
          
          {post.Removed==1 ? <a href={"/repostjob/"+post.JobId}><button type="button" className="btn btn-outline-success" >Repost Job</button></a> : ''}
          </div>
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
      const res = await axios.get(process.env.REACT_APP_API + 'client/postedjobs',
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

class PostedJobs extends Component {
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
                  <a class="nav-link active" href="">My Jobs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="/postjob">Post Job</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/client/profile">My Profile</a>
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
        <div class="container" style={{ "height": "100px", "paddingTop": "0px" }} >
          <ul class="nav nav-tabs" >
            <li role="presentation" class="active" style={{ "paddingRight": "40px" }}><a>My Posted Jobs</a></li>
            <li role="presentation" style={{ "paddingRight": "40px" }}><a href="approvedjobs">Approved Jobs</a></li>
            <li role="presentation" style={{ "paddingRight": "40px" }}><a href="completedjobs">Completed Jobs to be reviewed</a></li>
            
          </ul>
        </div>
        <div class="center-block log-in border" style={{ "maxWidth": "1000px", "padding": "10px" }}>
          <ViewJobs />
        </div>
        <Footer />
      </app>
    );

  }
}

PostedJobs.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(PostedJobs));