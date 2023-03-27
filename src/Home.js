import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = function() {
  const [blogs, setBlogs] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => {
        if(!res.ok){
          throw Error('Could not fetch data!');
        }
        return res.json();
      })
      .then(data => {
        setBlogs(data);
        setPending(false);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setPending(false);
      })
  }, []);

  return ( 
    <div className="home">
      {error && <div>{ error }</div>}
      {pending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
    </div>
  );
}
 
export default Home;