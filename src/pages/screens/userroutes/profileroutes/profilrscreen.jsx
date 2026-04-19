
import { useState, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import { Mycontext } from '../../../statestore/contProvider'
import api from './../../../../api/api';
export default function Profilescreen() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [userdata, setuserdata] = useState()
  const [loading, setloading] = useState(true)



  const getuserdata = async () => {
    try {
      const res = await api.get('/profile')
      setuserdata(res.data)
      console.log("user data new taken: ", res)
      setloading(false)
    } catch (error) {
      console.log(error)
    }
  }




  useLayoutEffect(() => {
    getuserdata()
  }, [])


  return (
    <>

      {
        loading ? <h1>loading</h1> :

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
                <br />
                <tr className='tablehead'>
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


              {/*               user daily task and performance                      */}



              <table className='profiledata'>
                <tr className='tablehead'>
                  <th>view in list</th>
                  <th>update user</th>
                  <th>view attendence</th>
                  <th>view projects</th>
                </tr>
                <tr>

                  <td><button className='btn primary' onClick={() => { navigate(`/changepropic`) }} >update photo</button></td>
                  <td><button className='btn primary' onClick={() => { navigate(`/updateprofile/${id}`) }} >update profile</button></td>
                  <td><button className='btn primary' onClick={() => { navigate(`/userattend`) }} >view attendence</button></td>
                  <td><button className='btn primary' onClick={() => { navigate(`/projectlist`) }} >see projects</button></td>

                </tr>
              </table>
            </div>

          </section>}
    </>
  )
}
