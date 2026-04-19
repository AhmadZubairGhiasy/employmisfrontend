import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Createproject() {
  // defining utilties
  const data = new Date()
  const navigate = useNavigate()



  // declearing states

  const [name, setname] = useState("")
  const [pstatus, setpstatus] = useState("")
  const [pdate, setpdate] = useState("")
  const [pmonth, setpmonth] = useState("")
  const [pdescription, setpdescription] = useState("")

  const [message, setmessage] = useState("")



  const submithandeler = async (e) => {






    const response = await axios.post(`${process.env.REACT_APP_API_URL}/addproject`, { name, pstatus, pdate, pmonth, pdescription }, { withCredentials: true })

    console.log("add project result: ", response)

    navigate("/projectlist")


  }



  return (
    <section style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>


      <h3>{message}</h3>
      <br />
      <br />

      <form action={submithandeler} style={{ display: "flex", flexDirection: "column" }}>
        <div className='inputcontainerpc'>
          <input value={name} onChange={(e) => { setname(e.target.value); console.log("name is: ", e.target.value) }} className='inputtype' type="text" placeholder='enter project name' name='projectName' />
          <select name="select" id="sle" value={pstatus} onChange={(e) => { setpstatus(e.target.value); console.log("pstatus is: ", e.target.value) }} className='inputtype' placeholder='enter project status'>
            <option value="" disabled hidden> Select Project Status</option>
            <option value={"completed"}> completed</option>
            <option value={"pending"}> pending </option>
          </select>
        </div>
        <div className='inputcontainerpc'>
          <input value={pdate} onChange={(e) => { setpdate(e.target.value); console.log("date is: ", e.target.value) }} className='inputtype' type="date" placeholder='enter project name' />
          <select name="" id="" value={pmonth} onChange={(e) => { setpmonth(e.target.value); console.log("pmontj is: ", e.target.value) }} className='inputtype'>
            <option value="" disabled hidden> Select Accomplish Month</option>
            <option > jan</option>
            <option > feb </option>
            <option > march</option>
            <option > apr </option>
            <option > may</option>
            <option > june </option>
            <option > jully</option>
            <option > agu </option>
            <option > sep</option>
            <option > oct</option>
            <option > nov </option>

            <option > dec </option>



          </select>
        </div>
        <textarea value={pdescription} onChange={(e) => { setpdescription(e.target.value); console.log("pdescription is: ", e.target.value) }} className='type-textarea' name="description" id="pders" placeholder='project description'></textarea>


        <button className='btn primary' type='submit'>create project</button>

      </form>

    </section>
  )
}
