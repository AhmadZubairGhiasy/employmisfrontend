import React, { useLayoutEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'



import api from '../../../../api/api'
import Attenditem from '../../../components/attendlistitem'

export default function Employeattend() {


  let navigate = useNavigate()
  const [MisUsers, setMisUsers] = useState([])
  const [allattendes, setallattendes] = useState([])





  const getmisuser = async () => {
    const res = await api.get("/getalluser")
    setMisUsers(res.data)


  }

  const getallattend = async () => {
    const res = await api.get("/getallattends")
    setallattendes(res.data)
  }





  useLayoutEffect(() => {
    getmisuser()
    getallattend()
  }, [])




  const date = new Date()

  const today = date.toLocaleDateString()

  const formatdate = (date) => {
    const frdate = new Date(date)
    return `${frdate.toLocaleDateString()}`
  }


  // user which attendence is submited
  const fistattend = allattendes.filter(a => formatdate(a.date) === formatdate(today))

  // user ides which attendence is submited
  const todayattendid = fistattend.map(a => a.employeeId)

  // user which attendence is not submited
  let datetoberender = MisUsers.filter(u => !todayattendid.includes(u._id))



  return (
    <section className='listofuser'>
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

          {datetoberender.map(u => <Attenditem name={u.name} email={u.email} id={u._id} thebtnvalue="set" />)}

        </div>

      </table>
    </section>
  )
}
