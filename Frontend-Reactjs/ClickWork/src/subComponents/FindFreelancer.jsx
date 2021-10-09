import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header2 from "./Header2";
import Container2 from "./Container2";
import Footer from "./Footer";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Posts = ({posts, loading}) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <dl className="dictionary">
      {posts.map(profile => (
        <div className="term">   
        <dt>
        <span>{profile.Name}</span>
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

const FindFreelancer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(process.env.REACT_APP_API+'freelancers');
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
        <h1 className="newsfeed">Freelancer Profiles</h1>
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

export default FindFreelancer;