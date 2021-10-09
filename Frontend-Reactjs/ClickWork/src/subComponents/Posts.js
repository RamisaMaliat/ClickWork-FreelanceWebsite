import React from 'react';

const Posts = ({posts}) => {
  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li className='list-group-item'>
          {post.Headline}
        </li>
      ))}
    </ul>
  );
};

export default Posts;