import axios from 'axios'
import React,{useState, useContext} from 'react'
import { useParams,useNavigate } from 'react-router-dom'

import { Mycontext } from '../../../statestore/contProvider'

export default function Updateproject() {

  const context = useContext(Mycontext)
const allproject = context.currentuerproject ||[]
      
  console.log("projects review in components is: ", allproject)

   
  

    // defining utilties
    const data = new Date()
     const navigate = useNavigate()



  const prams =  useParams()

  const projecttoupdate = allproject.find(p => p._id ===prams.id )||{}
    console.log("project to update is: ", projecttoupdate)


   const projectdate = `${projecttoupdate.infoData}`

   console.log(projectdate.split('T')[0])
      
    // declearing states

    const [name, setname] = useState(`${projecttoupdate.name}`)
    const [pstatus, setpstatus] = useState(`${projecttoupdate.status}`)
    const [pdate, setpdate] = useState(`${projectdate.split('T')[0]}`)
    const [pmonth, setpmonth] = useState(`${projecttoupdate.month}`)
    const [pdescription, setpdescription] = useState(`${projecttoupdate.description}`)

    const [message, setmessage] = useState("")



 
    const submithandeler = async (e)=>{

        
        



        const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateproject`,{id:prams.id,name, pstatus, pdate, pmonth, pdescription},{withCredentials: true})

        console.log("add project result: ",response)
       navigate("/projectlist")
    }



  return (
    <section style={{width:"100%", height:"100vh", display:"flex", alignItems:"flex-start", justifyContent:"center", flexDirection:"column"}}>


        <h3>{message}</h3>
        <br />
        <br />


            
           <div className='inputcontainerpc'>
            <label htmlFor="name">Project Name:</label>
             <input id='name' value={name}onChange={(e)=>{setname(e.target.value)}} className='inputtype' type="text" placeholder={"enter project name"} name='projectName' />
           
           </div>



        <div className='inputcontainerpc'>
             <label >Project Status:</label>
              <select name="select" id="sle"   value={pstatus} onChange={(e)=>{setpstatus(e.target.value); console.log("pstatus is: ", e.target.value)}}  className='inputtype'  placeholder='enter project status'>
              <option value=""  disabled hidden> {projecttoupdate.status}</option>
              <option value={"completed"}> completed</option>
              <option value={"pending"}> pending </option>
            </select>
           </div>




           <div className='inputcontainerpc'>
            <label >Project Isue Data:</label>
            
                <input value={pdate} onChange={(e)=>{setpdate(e.target.value); console.log("date is: ", e.target.value)}}  className='inputtype'type="date" placeholder='enter project name'  />
              
            </div>


            <div className='inputcontainerpc'>

                <label >Project Isue Month:</label>

                <select name="" id=""value={pmonth} onChange={(e)=>{setpmonth(e.target.value); console.log("pmontj is: ", e.target.value)}}  className='inputtype'>
                 <option value=""  disabled hidden> Select Accomplish Month</option>
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


            
            <div className='inputcontainerpc' style={{width:"730px"}}>

                <label >Project description:</label>

               <textarea  value={pdescription} onChange={(e)=>{setpdescription(e.target.value); console.log("pdescription is: ", e.target.value)}} className='type-textarea' name="description" id="pders" placeholder='project description'></textarea>
            
            </div>




            

            <button onClick={submithandeler}  className='btn primary' type='submit'>updata project</button>

      

    </section>
  )
}
