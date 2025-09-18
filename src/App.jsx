import { useEffect, useState } from "react";
import { getPost } from "./api/PostApi";
import { deletePost } from "./api/PostApi";
import Form from "./components/Form";

const App = () => {

  const [postData, setPostData] = useState([]);
  const [updateDataApi, setUpdateDataApi] =  useState({});

  //Post
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log("API Response:", res);
      setPostData(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }

  useEffect(() => {
    getPostData();
  }, [])

//Delete
  const handelDeletePost = async (id) => {
    try {
      const res = await deletePost(id)
      if (res.status === 200) {
        const newUpdateData = postData.filter((currPos) => {
          return (
            currPos.id != id
          )
        })
        setPostData(newUpdateData)
      }
    } catch (error) {
      console.log(error)
    }


  }

//Update
const hnadelUpdatePost = (currEle) =>{
 return(
  setUpdateDataApi(currEle)
 )
}



  return (
    <div className="main-container">
      <section className="form-sec">
        <Form postData={postData} setPostData={setPostData}  updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
      </section>

      <section>
        <ol className="post-list">
          {
            postData.map((currEle) => {
              return (
                <li className="post-item" key={currEle.id}>
                  <h1>{currEle.title}</h1>
                  <p>{currEle.body}</p>
                  <button className="edit-btn" onClick={()=> hnadelUpdatePost(currEle)}>Edit</button>
                  <button className="delete-btn" onClick={() => handelDeletePost(currEle.id)}>Delete</button>
                </li>
              )
            })
          }
        </ol>
      </section>
    </div>
  )
}

export default App;
