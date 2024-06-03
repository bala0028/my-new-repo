import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import About from './About';
import Footer from './Footer';
import {  Routes , Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {format} from "date-fns";
import api from  "./api/posts.js";
import EditPost from './EditPost.js';
function App() {
  const [post,setPost] = useState([]);
  const [search,setSearch]=useState('');
  const [searchResults, setsearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState('');
  const [postBody,setPostBody] = useState('');
  const [editTitle,setEditTitle] = useState('');
  const [editBody,setEditBody] = useState('');
  const navigate = useNavigate();



  useEffect (() =>{
    const fetchPosts = async() => {
      try{
        const response = await api.get('./posts');
        setPost(response.data);
      }
      catch(err){
        if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } 
      else {
        console.log(`Error: ${err.message}`);
      }
    }
    }
    fetchPosts();
  })

  useEffect(() => {
    const filteredresults = post.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setsearchResults(filteredresults.reverse());
  }, [post,search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = post.length ? post[post.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id ,title: postTitle , datetime , body:postBody};
    try{
      const response = await api.post('./posts',newPost)
      const allPost = [...post , response.data];
      setPost(allPost);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }
    catch(err){
      if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } 
    else {
      console.log(`Error: ${err.message}`);
    }
  }
  }

  const handleEdit = async(id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = {  id,title:editTitle,datetime,body:editBody};
    try{
      const response = await api.put(`/posts/${id}`,updatePost);
      setPost(post.map(post => post.id===id ? {...response.data} : post ));
      setEditTitle('');
      setEditBody('');
      navigate('/')
    }
    catch(err){
      console.log(`Error : ${err.message}`);
    }
  }

  const handledelete =  async(id) => {
    try{
      await api.delete(`posts/${id}`)
      const postsList = post.filter(post => post.id !== id);
      setPost(postsList)
      navigate('/')
    }
    catch(err){
      console.log(`Error : ${err.message}`);
    }
  }
  
  return (
    <div className="App">
    <Header title="Thread"/>
    <Nav
      search={search}
      setSearch={setSearch}
     />
     <Routes>
      <Route path='/' element={<Home posts={searchResults} />} />
      <Route path='post' >
            <Route index element={<NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            setpostTitle={setPostTitle}
        />} />
          <Route path='/edit/:id' element={<EditPost/>} />
          <Route path=':id' element={ <PostPage posts={post} handledelete={handledelete} />} />
        </Route>

        <Route path='*' element={<Missing />} />
        <Route path='about' element={<About />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
