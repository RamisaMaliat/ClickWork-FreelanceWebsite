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
        <div className="term">
          <dt>
          <span><a id={post.JobID} href={"../jobs/jobdetails/"+post.JobID}><h3>{post.Headline}</h3></a></span>
          </dt>
          <div>
          
          <dd style={{"color":"green", "fontSize":"18px"}}>
          <span style={{"font-size":"25px","color":"green"}}>&#9733;</span>
            <b>{"Rating" + " " + ":" + " " + " "}</b><random style={{"fontSize":"20px"}}>{post.Rating}{".00 / 5.00"}</random></dd>
          </div>
          <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{post.Description}</dd>
          <dd><b>{"Required skills" + " " + ":" + " " + " "}</b>{post.Skills}</dd>
          <dd><b>{"Additional requirements" + " " + ":" + " " + " "}</b>{post.AdditionalRequirements}</dd>
          <h4 style={{"paddingTop":"20px"}}><b>Approved By : </b></h4>
          <dd><b>{"Client's Name" + " " + ":" + " " + " "}</b>{post.ClientName}</dd>
          <dd><b>{"Client's Email" + " " + ":" + " " + " "}</b>{post.ClientEmail}</dd><br/>
          {post.ClientComment?<dd><b>{"Client's feedback" + " " + ":" + " " + " "}</b><br/><i>{post.ClientComment}</i></dd>:""}
          
          <hr/>
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
      let user = JSON.parse(window.localStorage.getItem("user"))
      user = user["username"];
      const res = await axios.get(process.env.REACT_APP_API + 'freelancer/viewfreelancerprofile/'+user+'/approved',
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

class Jobs extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { user } = this.props.auth;

    return (
        
        <div class="center-block log-in " style={{"maxWidth":"1000px", "marginTop":"30px"}}>
        <ViewJobs />
        </div>
 
    );

  }
}

Jobs.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(Jobs));