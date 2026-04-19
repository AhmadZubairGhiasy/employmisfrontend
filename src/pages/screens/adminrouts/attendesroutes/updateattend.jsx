import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Updateattend() {

   const {id, name, email,status,inTime,outTime,date,employeeId} =  useParams()

   const [inTimevel, setinTimevel] = useState(inTime)
   const [outTimevel, setoutTimevel] = useState(outTime)
   const [datevel, setdatevel] = useState(date)
   const [statusvel, setstatusvel] = useState(status)


   const navigate = useNavigate()

    const submite = async ()=>{
        const attenddata = {
            _id:id,
            employeeId,
            inTime:inTimevel,
            outTime:outTimevel,
            date: datevel,
            status:statusvel

        }


        const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateattends`, attenddata, {withCredentials:true})
     
        navigate('/employeseattendsubmit')

        //document.location.replace('/employeseattendsubmit')
    }


  return (
    <section style={{flexDirection:"column"}}>
       
     <div className='inputcontainerpc'>
        <p>Employee name: </p>
        <h4>{name}</h4>
     </div>
         
     <div className='inputcontainerpc'>
        <p>Employee email: </p>
        <h4>{email}</h4>
     </div>
            

            <div className='inputcontainerpc'>
                    <label >Attend status: </label> 
        <select name="status" id="status" className='inputtype' value={statusvel} onChange={(e)=>{setstatusvel(e.target.value)}} >
            <option value="" disabled hidden>Status</option>
            <option>present</option>
            <option>absent</option>
            <option>late</option>
            <option>excuse</option>
            </select>
      
            </div>

            <div className='inputcontainerpc'>
                <label>Attend In Time: </label> 
        <       input type="time" name='inTime'   value={inTimevel} onChange={(e)=>{setinTimevel(e.target.value)}} className='inputtype ' />
     
            </div>


                
            <div className='inputcontainerpc'>

                 <label>Attend Out Time: </label> 
                     <input type="time" name='outTime' value={outTimevel} onChange={(e)=>{setoutTimevel(e.target.value)}} className='inputtype' />
    
            </div>
            
            <div className='inputcontainerpc'>
                <label>Attend Date: </label> 
                <input type="date" name='date' value={datevel} onChange={(e)=>{setdatevel(e.target.value)}} className='inputtype' />
         
            </div>
            
            <div className='inputcontainerpc'></div>

         <input type="submit" onClick={submite} value={"update"} className='btn primary ' style={{width:"300px"}} />
    
    </section>
  )
}
