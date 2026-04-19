import React, { useLayoutEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import api from '../../../../api/api'
import Attenditemreview from '../../../components/attendlistitem-review'


export default function Employeattendsubmition() {

  let navigate = useNavigate()
  const [sortingdate, setsortingdate] = useState("")
  const [loading, setloading] = useState(true)
  const [renderd, setrenderd] = useState([])
  const [MisUsers, setMisUsers] = useState([])





  const getmisuser = async () => {
    const res = await api.get("/getalluser")
    setMisUsers(res.data)
    setloading(false)

  }




  useLayoutEffect(() => {
    getmisuser()
  }, [])








  const getdatabydatehanlder = async (e) => {


    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getallattends/?id=${sortingdate}`, { withCredentials: 'include' })
      await setrenderd(response.data)
      console.log("all attendse req is: ", response)


    } catch (error) {
      console.log("all user data is: ", error)
    }

  }


  const userdatabyid = (id) => {
    const filterdate = MisUsers.find(u => u._id === id)
    if (!filterdate) {
      return "no user"
    }
    return filterdate
  }





  return (
    <>
      {
        loading ? <h1>loadding...</h1> :
          <section className='listofuser' style={{ flexDirection: "column" }}>

            <form style={{ marginBlock: "32px" }}  >
              <label style={{ marginInline: "16px" }} >Enter date:  </label>
              <input type="date" className='inputtype'
                value={sortingdate}
                onChange={(e) => { setsortingdate(e.target.value); }} />

              <input type="submit" value={"get data by date"} className='btn primary' onClick={(e) => { e.preventDefault(); getdatabydatehanlder() }} />
            </form>

            <table className='userlist'>
              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Attend Status</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Date</th>
                <th>Action</th>


              </tr>

              <div className="usrlistbody">

                {renderd.map(u => <Attenditemreview

                  name={userdatabyid(u.employeeId).name || "notdefined"}
                  email={userdatabyid(u.employeeId).email || "notdefined"}
                  id={u._id}
                  employeeId={u.employeeId}
                  status={u.status}
                  inTime={u.inTime}
                  outTime={u.outTime}
                  date={u.date}

                />)}

              </div>

            </table>
          </section>
      }
    </>
  )
}
