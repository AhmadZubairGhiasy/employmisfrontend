import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import api from '../../../../api/api'

export default function Userscreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [monthlyattend, setmonthlyattend] = useState()
  const [monthlyprojects, setmonthlyprojects] = useState()
  const [userporjects, setuserporjects] = useState([])

  const [userattendce, setuserattendce] = useState([])


  const [MisUsers, setMisUsers] = useState([])

  const getmisuser = async () => {
    const res = await api.get("/getalluser")
    setMisUsers(res.data)

  }




  useLayoutEffect(() => {
    getmisuser()
  }, [])












  let userdata = MisUsers.find(u => u.name === id) || []
  console.log("user data in user screen: ", userdata)


  const getuserprojects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getallproject/?id=${userdata._id}`, { withCredentials: 'include' })

      if (response.data.length === 0) {
        return
      }

      if (response.data === "project not found") {
        return
      }

      setuserporjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }




  console.log("user projects are: ", userporjects)






  let allpro = userporjects.length || 0
  let completed = [...userporjects].filter(p => p.status === "completed").length || 0
  let pending = [...userporjects].filter(p => p.status === "pending").length || 0









  useEffect(() => {

    getuserprojects()



  }, [])





  return (
    <>
      <section style={{ flexDirection: "column", width: "100%" }}>

        <div style={{
          display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "32px"
        }}>
          <img src={`${process.env.REACT_APP_API_URL}/uploads/${userdata._id}/profilephoto.jpg`} alt="" style={{ width: "100px", height: "100px", backgroundColor: "lightgray", borderRadius: "50%", overflow: "hidden", border: "5px solid black", objectFit: "cover", }} />
          <br />
          <h2 style={{ textTransform: "capitalize" }}>{userdata.name}</h2>
          <p>{userdata.email}</p>

        </div>




        <div style={{ height: "60vh", width: '100%', boxSizing: "border-box", overflowBlock: "scroll" }}>
          <table className='profiledata'>
            <tr className='tablehead'>
              <th>name</th>  <td style={{ textTransform: "capitalize" }}>{userdata.name || "Not define"}</td>
              <th>email</th> <td>{userdata.email || "Not define"}</td>


            </tr>
            <br /> <tr className='tablehead'>
              <th>Address</th>  <td style={{ textTransform: "capitalize" }}>{userdata.address || "Not define"}</td>
              <th>Phone</th> <td>{userdata.phone || "Not define"}</td>


            </tr>
            <br /> <tr className='tablehead'>
              <th>age</th>  <td style={{ textTransform: "capitalize" }}>{userdata.age || "Not define"}</td>
              <th>role</th> <td>{userdata.role || "Not define"}</td>


            </tr>
            <br />
            <tr>
              <th>department</th>
              <td>{userdata.department || "Not define"}</td>
              <th>position</th>


              <td>{userdata.position || "Not define"}</td>
            </tr>
          </table>


          <table className='profiledata'>
            <tr className='tablehead'>
              <th>project count</th>
              <th>completed</th>
              <th>pending</th>

            </tr>
            <tr>
              <td>{allpro}</td>
              <td>{completed}</td>
              <td>{pending}</td>


            </tr>
          </table>

          <table className='profiledata'>
            <tr className='tablehead'>
              <th>view in list</th>
              <th>update user</th>
              <th>view attendence</th>
              <th>view projects</th>
            </tr>
            <tr>

              <td><button className='btn primary' onClick={() => { navigate(`/report/${userdata._id}`) }} >view report</button></td>
              <td><button className='btn primary' onClick={() => { navigate(`/updateuser/${userdata._id}`) }}>update user</button></td>
              <td><button className='btn primary' onClick={() => { navigate(`/employeseattendsubmit`) }} >view attendence</button></td>
              <td><button className='btn primary' onClick={() => { navigate(`/userprojveiw/${userdata._id}`) }} >see projects</button></td>

            </tr>
          </table>
        </div>

      </section>
    </>
  )


}
