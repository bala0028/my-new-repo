import { useEffect } from "react"
import { useParams,Link } from "react-router-dom"

const EditPost = ({
    posts,handleEdit,editBody,editTitle,setEditBody,setEditTitle
}) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString()===id);

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    } ,[ post,setEditBody,setEditTitle])
  return (
    <main className="NewPost">
        {editTitle && 
        <>
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle" >
                    Title
                </label>
                <input 
                    id="postTitle" 
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) =>setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post</label>
                
                <input 
                    id="postBody"
                    type="text"
                    required
                    value={postBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>
        }
    </main>
  )
}

export default EditPost