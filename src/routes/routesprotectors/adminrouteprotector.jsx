import { Navigate,useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

    const nav = useNavigate();
    
      const getdata = async () => {
    
        try {
            
          const auth = await axios.get(`${process.env.REACT_APP_API_URL}/checkforadmin`, { withCredentials: 'include' })
             console.log("is auth status: ", auth)
            if (auth.data === "notauth") {
                    return false
                }   
           
            return true;
        } catch (error) {
         
          
          if (error.status === 401) {
            return false;
          }
          console.log("auth result", error)
    
        }
      }
    
    
    

  const isAuthenticated =  getdata() // or use context

    if (!isAuthenticated) {
        return;
  }

    
    
  return children;
};

export default ProtectedRoute;