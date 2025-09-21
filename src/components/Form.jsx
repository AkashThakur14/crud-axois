import { useEffect, useState } from "react";
import { dataPost, updatePost } from "../api/PostApi";



const Form = ({ postData, setPostData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;


  //get the update data and add into input field

  useEffect(() => {
    updateDataApi && setAddData({
      title: updateDataApi.title || "",
      body: updateDataApi.body || ""
    })
  }, [updateDataApi])

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
        setAddData({ title: " ", body: " " })
      }
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  //update post data
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, addData);
      console.log(res)

      if (res.status === 200) {
        setPostData((prev) => {
          return (
            prev.map((currEle) => {
              return (
                currEle.id === res.data.id ? res.data : currEle
              )
            })
          )
        })
        setAddData({ title: " ", body: " " })
        setUpdateDataApi({})

      }

    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }

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
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
    </form>
  );
};

export default Form;
