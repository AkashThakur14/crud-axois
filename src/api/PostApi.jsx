import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});


// Get Method 
export const getPost = () =>{
  return(
    api.get("/posts")
  )
}