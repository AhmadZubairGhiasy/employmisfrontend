import React, { useEffect, useState } from 'react'
import Diagcomp from '../../components/diagcomp'
import axios from 'axios'




export default function MyReport() {


  const [monthlyattend, setmonthlyattend] = useState()
  
  const [monthlyprojects, setmonthlyprojects] = useState()
  


  
  const getreport = async ()=>{  
     
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuserreport`,{withCredentials:"include"})
  console.log("report result is: ", response)


    await  setmonthlyattend(response.data.monthlyattend)
    await  setmonthlyprojects(response.data.monthlyproject)
  }

  useEffect(() => {
    
    getreport()

  }, [])





  
  return (
     <section className='listofuser' style={{flexDirection:"column", alignItems:"start"}}>
          <table  className='userlist'>
            <tr>
               
                <th>Month</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Excuse</th>
                <th>Late</th>
                <th>All Days</th>
                <th>Completed Projects</th>
                <th>Pending Projects</th>
                 <th>All Projects</th>
    
            </tr>
    
                <div className="usrlistbody">
                    
               {
                  !monthlyattend?<></>:
                  monthlyattend.map((m,index)=>{

                    const projects = monthlyprojects[index]



                    return(
                     <tr>
                      <td style={{textTransform:"capitalize",fontWeight:"bold"}}>{m.month}</td>
                      <td>{m.report.present}</td>
                      <td>{m.report.absent}</td>
                      <td>{m.report.excuse}</td>
                      <td>{m.report.late}</td>
                       <td>{m.report.alldays}</td>
                       <td>{projects.data.completed}</td>
                       <td>{projects.data.pending}</td>
                       <td>{projects.data.allproject}</td>
                     </tr>
                    )
                  })
               }
     
                </div>
    
       </table>
      </section>
      
    )
}

