import axios from 'axios'
import { useState, useLayoutEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../../api/api'


export default function UpdateProfile() {

  const [userprofiledata, setuserprofiledata] = useState({})


  // defining utilties
  const navigate = useNavigate()
  const prams = useParams()




  // profile update inputes states
  const [name, setname] = useState(userprofiledata.name)
  const [email, setemail] = useState(userprofiledata.email)
  const [age, setage] = useState(userprofiledata.age)
  const [department, setdepartment] = useState(userprofiledata.department)
  const [position, setposition] = useState(userprofiledata.position)
  const [phone, setphone] = useState(userprofiledata.phone)
  const [address, setaddress] = useState(userprofiledata.address)
  // ------------------------------------------------------------------


  // reset password states

  const [pwdmessage, setpwdmessage] = useState("")
  const [oldpassword, setoldpassword] = useState("")
  const [newpassword, setnewpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [showpassword, setshowpassword] = useState("password")




  const getuserdata = async () => {
    try {
      const res = await api.get('/profile')
      setuserprofiledata(res.data)
      console.log("user data new taken: ", res)
    } catch (error) {

    }
  }




  useLayoutEffect(() => {
    getuserdata()
  }, [])




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

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, userdata, { withCredentials: true })

    console.log(response)
    navigate(`/`)

  }




  const handlesetpassword = async () => {


    if (newpassword === "" || confirmpassword === "" || oldpassword === "") {
      setpwdmessage("one of the field is empty")


    }

    if (newpassword !== confirmpassword) {
      setpwdmessage("confirm password not matched")

    }

    const passworddata = {
      newpassword,
      confirmpassword,
      oldpassword
    }

    console.log(passworddata)

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/updatepassword`, passworddata, { withCredentials: true })

    setpwdmessage(response.data)
    console.log(response)



  }









  return (
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



        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "270px" }}>


          <h3 style={{ textTransform: "capitalize" }}>{pwdmessage}</h3>

          <button className="btn width120"
            onClick={() => {
              showpassword === "password" ? setshowpassword("text") : setshowpassword("password")
            }}

          >show</button>

          <input type={showpassword} className='inputtype' placeholder='Enter old password'
            value={oldpassword}
            onChange={(e) => { setoldpassword(e.target.value) }}

          />

          <input type={showpassword} className='inputtype' placeholder='Enter new password'
            value={newpassword}
            onChange={(e) => { setnewpassword(e.target.value) }}

          />

          <input type={showpassword} className='inputtype' placeholder='confirm passwrod'
            value={confirmpassword}
            onChange={(e) => { setconfirmpassword(e.target.value) }}

          />



          <button onClick={() => { handlesetpassword() }} className='btn primary width120'>set password</button>
        </div>

      </div>

    </section>
  )
}
