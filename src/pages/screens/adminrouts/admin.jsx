import { useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'





import Dashcard from '../../components/dashcard'
import Userpic from '../../components/Userpic'
import api from '../../../api/api'

import * as icons from "react-icons/fa"




export default function Admin() {

  let navigate = useNavigate()
  const [userdata, setuserdata] = useState(null)
  const [isloading, setisloading] = useState(true)


  const getuserdata = async () => {
    try {
      const res = await api.get('/profile')
      setuserdata(res.data)
      setisloading(false)
      console.log("user data new taken: ", res)
    } catch (error) {

    }
  }




  useLayoutEffect(() => {
    getuserdata()
  }, [])




  return (
    <>

      {
        isloading ? <h1>loadding</h1> :
          <div className='adminsection'>


            <nav>
              <Userpic lablestatus={true} picUrl={`${process.env.REACT_APP_API_URL}/uploads/${userdata._id ?? ""}/profilephoto.jpg`} username={`${userdata.name ?? ""}/admin` || "admin"} />

              <button className="btn primary" onClick={() => { navigate("/") }}>dashboard</button>



            </nav>

            <div>
              <Dashcard clickevent={() => { navigate('/search') }} bgcolor={"#8b4617ff"} color={"white"} name={"veiw employees"} Icon={icons.FaUser} alignment="center" />

              <Dashcard clickevent={() => { navigate('/authuser') }} bgcolor={"#0066ffff"} color={"white"} name={"employees permission"} Icon={icons.FaUser} alignment="center" />
              <Dashcard clickevent={() => { navigate('/deluser') }} color={"white"} bgcolor={"#dd1919ff"} name={"delete employee"} Icon={icons.FaTrash} alignment="center" />

              <Dashcard clickevent={() => { navigate('/upduser') }} color={"white"} bgcolor={"green"} name={"update employee"} Icon={icons.FaUser} alignment="center" />
              <Dashcard clickevent={() => { navigate('/userlist') }} bgcolor={"#6f00ffff"} color={"white"} name={"veiw employees list"} Icon={icons.FaUser} alignment="center" />

              <Dashcard clickevent={() => { navigate('/employeseattend') }} bgcolor={"#037955ff"} color={"white"} name={"empoyees attendence"} Icon={icons.FaTasks} alignment="center" />
              <Dashcard clickevent={() => { navigate('/employeseattendsubmit') }} bgcolor={"#034079ff"} color={"white"} name={"check attendence"} Icon={icons.FaTasks} alignment="center" />

            </div>






          </div>
      }
    </>
  )
}
