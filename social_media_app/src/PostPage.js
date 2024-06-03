import { useParams ,Link} from "react-router-dom"


const PostPage = ({posts,handledelete}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
   <main className="PostPage">
    <article className="post">
    {post &&
    <>
      <h2>{post.title}</h2>
      <p className="postDate"> {post.datetime}</p>
      <p className="postBody">{post.body}</p>
      <Link to={`/edit/${post.id}`}><button className="editButton">Edit</button></Link>
      <button className="deleteButton" onClick={() => handledelete(post.id)}>Delete Post</button>
    </>
    }
    {!post && 
    <>
      <p>Post not found</p>
      <p>Well, that's disappointing</p>
      <p><Link to="/">Visit the home page!!!</Link></p>
    </>
    
    }

    </article>
   </main>
  )
}

export default PostPage