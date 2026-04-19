import axios from 'axios'
import React, { useState, useLayoutEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../../api/api'


export default function Updateuser() {

  const nav = useNavigate()
  const [isloading, setisloading] = useState(true)
  const [MisUsers, setMisUsers] = useState([])

  const getmisuser = async () => {
    const res = await api.get("/getalluser")
    setMisUsers(res.data)
    setisloading(false)

  }




  useLayoutEffect(() => {
    getmisuser()
  }, [])


  // defining utilties

  const prams = useParams()

  // url of this is /updateuser/id


  const userprofiledata = MisUsers.find(u => u._id === prams.id)



  // profile update inputes states
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [age, setage] = useState()
  const [department, setdepartment] = useState()
  const [position, setposition] = useState()
  const [phone, setphone] = useState()
  const [address, setaddress] = useState()
  // ------------------------------------------------------------------



  const updatehandler = async () => {
    ///updateuser

    const userdata = {
      _id: userprofiledata._id,
      name,
      email,
      age,
      department,
      position,
      phone,
      address
    }

    console.log('updateing date is:', userdata)

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateadminuser`, userdata, { withCredentials: true })
    nav("/upduser")



  }




  return (
    <>
      {
        isloading ? <h1>loading ...</h1> :

          <section style={{ width: "100%", height: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", flexDirection: "column" }}>




            <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "space-around" }}>

              <div>

                <div className='inputcontainerpc'>
                  <label htmlFor="name">User Name:</label>
                  <input className='inputtype' type="text" value={name} onChange={(e) => { setname(e.target.value) }} defaultValue={userprofiledata.name} placeholder={"enter project name"} name='projectName' />

                </div>



                <div className='inputcontainerpc'>
                  <label >User Email:</label>
                  <input className='inputtype' type="email" placeholder='enter user email'
                    value={email}
                    defaultValue={userprofiledata.email}
                    onChange={(e) => { setemail(e.target.value) }}


                  />
                </div>


                <div className='inputcontainerpc'>
                  <label >Empoyee Age: </label>
                  <input className='inputtype' type="number" maxLength={3} max={100} min={16} placeholder='enter Empoyee Age'

                    value={age}
                    defaultValue={userprofiledata.age}
                    onChange={(e) => { setage(e.target.value) }}
                  />
                </div>



                <div className='inputcontainerpc'>
                  <label >Employee Department</label>

                  <input className='inputtype' type="text" placeholder='enter Employee Department'
                    value={department}
                    defaultValue={userprofiledata.department}
                    onChange={(e) => { setdepartment(e.target.value) }}
                  />

                </div>


                <div className='inputcontainerpc'>

                  <label >Employee Position</label>
                  <input className='inputtype' type="text" placeholder='enter Employee Position'
                    value={position}
                    defaultValue={userprofiledata.position}
                    onChange={(e) => { setposition(e.target.value) }}
                  />


                </div>


                <div className='inputcontainerpc'>

                  <label >User Phone Number</label>
                  <input className='inputtype' type="phone" placeholder='+93700000000'

                    value={phone}
                    defaultValue={userprofiledata.phone}
                    onChange={(e) => { setphone(e.target.value) }}

                  />


                </div>


                <div className='inputcontainerpc'>

                  <label >User Phone Number</label>
                  <input className='inputtype' type="address" name='address' style={{ width: "300px" }} placeholder='kart-e-char 5th street house no 12 kabul afg'
                    value={address}
                    defaultValue={userprofiledata.address}
                    onChange={(e) => { setaddress(e.target.value) }}
                  />


                </div>







                <button onClick={() => { updatehandler() }} className='btn primary' type='submit'>Update profile</button>

              </div>




            </div>

          </section>
      }
    </>
  )
}
