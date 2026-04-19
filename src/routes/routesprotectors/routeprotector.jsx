import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {

  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  const isauth = getCookie("isauth") ?? false;

  if (!isauth) {
    return <Navigate to={"/login"} replace />
  }


  return children;




};

export default ProtectedRoute;