import { useEffect, useState } from "react";
import { getPost } from "./api/PostApi";

const App = () => {

  const [postData, setPostData] = useState([])

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

  return (
      <section className="main-section">
        <ol className="post-list">
          {
            postData.map((currEle) => {
              return (
                <li className="post-item" key={currEle.id}>
                  <h1>{currEle.title}</h1>
                  <p>{currEle.body}</p>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </li>
              )
            })
          }
        </ol>
      </section>
  )
}

export default App;
