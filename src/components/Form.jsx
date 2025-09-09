import { useState } from "react";

const Form = () => {
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

  return (
    <form>
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
