// packges 
import './App.css';
import { useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom';
import axios from 'axios';


// context




// screen components 
import Loginscreen from './pages/screens/loginroutes/loginscreen';
import Registerscreen from './pages/screens/loginroutes/registerscreen';
import System from './pages/system';





import ProtectedRoute from './routes/routesprotectors/routeprotector';


import Dashboard from './pages/screens/userroutes/dashboard';
import Updateprofile from './pages/screens/userroutes/profileroutes/updateprofile';
import PropicChange from './pages/screens/userroutes/propicChange';
import Createproject from './pages/screens/userroutes/projectroutes/createproject';
import Updateproject from './pages/screens/userroutes/projectroutes/updateproject';
import Viewprojectlist from './pages/screens/userroutes/projectroutes/viewprojectlist';
import Getattend from './pages/screens/userroutes/Getattend';
import Profilescreen from './pages/screens/userroutes/profileroutes/profilrscreen';
import MyReport from './pages/screens/userroutes/MyReport';





import Searchscreen from "./pages/screens/adminrouts/Searchscreen"
import Reports from "./pages/screens/adminrouts/report"
import Admin from "./pages/screens/adminrouts/admin"
import Deleteuser from "./pages/screens/adminrouts/adminuserroutes/deleteuser"
import Updateuser from "./pages/screens/adminrouts/adminuserroutes/updateuser"
import Updateuserlist from "./pages/screens/adminrouts/adminuserroutes/updateuserlist"
import Viewuserlist from "./pages/screens/adminrouts/adminuserroutes/viewuserlist"
import Employeattend from "./pages/screens/adminrouts/attendesroutes/employeattend"
import Employeattendsubmition from "./pages/screens/adminrouts/attendesroutes/attendsubmitions"
import Updateattend from "./pages/screens/adminrouts/attendesroutes/updateattend"
import Userscreen from "./pages/screens/userroutes/profileroutes/userscreen"
import Adminvisitprojects from "./pages/screens/adminrouts/adminvisitprojects"
import Authrizeuser from "./pages/screens/adminrouts/adminuserroutes/authrizeuser"
import api from './api/api';




function  App() {

  // create hooks

  const [userrole, setuserrole] = useState(null)

  const checkrole = async () => {
    const res = await api.get("/checkrole")
    console.log("user role: ",res)
    setuserrole(res.data.message)
  }


useLayoutEffect(() => {
  checkrole()
}, [])

  
  return (
   <>  <Router>
        <Routes>
          <Route path='/' element={<System />}>
              <Route path='' element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
      <Route path='/changepropic' element={<ProtectedRoute> <PropicChange /></ProtectedRoute>} />

      <Route path='/createproject' element={<ProtectedRoute> <Createproject /></ProtectedRoute>} />
      <Route path='/updateproject/:id' element={<ProtectedRoute> <Updateproject /></ProtectedRoute>} />
      <Route path='/projectlist' element={<ProtectedRoute> <Viewprojectlist /></ProtectedRoute>} />

      <Route path='/profile/:id' element={<ProtectedRoute><Profilescreen /></ProtectedRoute>} />

      <Route path='/userReport' element={<ProtectedRoute><MyReport /></ProtectedRoute>} />
      <Route path='/userattend' element={<ProtectedRoute> <Getattend /></ProtectedRoute>} />
      <Route path='/updateprofile/:id' element={<ProtectedRoute> <Updateprofile /></ProtectedRoute>} />

          


          



          {
            userrole === "admin" ? <>
           
        <Route path='report/:id' element={<Reports />} />
        <Route path='search' element={<Searchscreen />} />
        <Route path='admin' element={<Admin />} />
        <Route path='deluser' element={<Deleteuser />} />
        <Route path='upduser' element={<Updateuserlist />} />
        <Route path='/updateuser/:id' element={<Updateuser />} />
        <Route path='userlist' element={<Viewuserlist />} />
        <Route path='/employeseattend' element={<Employeattend />} />
        <Route path='/employeseattendsubmit' element={<Employeattendsubmition />} />
        <Route path='/updateattend/:id/:name/:email/:status/:inTime/:outTime/:date/:employeeId' element={<Updateattend />} />
        <Route path='/user/:id' element={<Userscreen />} />
        <Route path='/userprojveiw/:id' element={<Adminvisitprojects />} />
        <Route path='/authuser' element={<Authrizeuser />} />
            </>
              
              : <></>
      }
          </Route>

        





         
          <Route path='/login' element={<Loginscreen  />} />
          <Route path='/register' element={<Registerscreen/>} />
          <Route path='*' element={<Navigate to={"/"} replace/>} />
          
            
        </Routes>
      </Router>

  

 
   
   </>
  );
}





export default App;
