import { useState } from "react";
import { dataPost } from "../api/PostApi";

const Form = ({ postData, setPostData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const addPostData = async () => {
    try {
      const res = await dataPost(addData);
      console.log("Post API Response:", res);

      if (res.status === 201) {   
        setPostData([...postData, res.data]); 

        setAddData({title:" ",body:" "})

      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="off"
          placeholder="Add"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          name="body"
          id="body"
          autoComplete="off"
          placeholder="Add description"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
