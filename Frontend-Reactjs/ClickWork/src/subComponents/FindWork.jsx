import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header2 from "./Header2";
import Container2 from "./Container2";
import Footer from "./Footer";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Posts = ({posts, loading}) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <dl className="dictionary">
      {posts.map(job => (
        <div className="term">   
        <dt>
        <span>{job.Headline}</span>
        </dt>
        <dd> <b>{"Category"+ " "+ ":"+" "+ " "}</b>{job.CategoryName}</dd>
        <dd> <b>{"Description"+ " "+ ":"+" "+ " "}</b>{job.Description}</dd>
        <dd><b>{"Skills"+ " "+ ":"+" "+ " "}</b>{job.Skills}</dd>
        <dd><b>{"Additional Requirements"+ " "+ ":"+" "+ " "}</b>{job.AdditionalRequirements}</dd>
        <u><b>Offered By : </b></u>
        <dd><b>{"Client Name"+ " "+ ":"+" "+ " "}</b> {job.ClientName}</dd>
        <dd><b>{"Company Name"+ " "+ ":"+" "+ " "}</b> {job.CompanyName}</dd>
        <dd><b>{"Email"+ " "+ ":"+" "+ " "}</b> {job.Email}</dd>
        <dd><b>{"City"+ " "+ ":"+" "+ " "}</b> {job.City}</dd>
        <dd><b>{"Country"+ " "+ ":"+" "+ " "}</b> {job.Country}</dd>
        
        <button type="button" className="btn btn-outline-success submit">Submit Proposal</button>
        <button type="button" className="btn btn-outline-success">Save Job<FontAwesomeIcon icon="Bookmark"/></button>
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

const FindWork = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(process.env.REACT_APP_API+'freelanceJobs');
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
        <Header2/>
        <Container2/>
        <div>
       <h1 className="newsfeed">Job Offers</h1>
       <Posts posts={currentPosts} loading={loading} />
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
        <Footer/>
     </app> 
  );
};

export default FindWork;