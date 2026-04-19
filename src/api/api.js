
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // your backend URL
  withCredentials: true, // IMPORTANT for HTTP-only cookies
});

export default api;