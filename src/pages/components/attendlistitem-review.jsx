import { useNavigate } from "react-router-dom"

export default function Attenditemreview({id,name, email, status, inTime, outTime, date,employeeId, nobtn}) {

  const dateprew = new Date(date)

  const navigate = useNavigate()
 

  return (
    <tr className='tablerow' >
     
      
      {name?<td style={{textTransform:"capitalize"}}>{name||""}</td>:<></>}
       {email?<td style={{fontSize:"12px"}}>{email||""}</td>:<></>}
       
        
          <td style={{textTransform:"capitalize"}}>{status}</td>
          <td>{inTime}</td>
          <td>{outTime}</td>
          <td>{dateprew.toLocaleDateString()}</td>


          {nobtn?<></>:
          
          <td><button className="btn primary" onClick={()=>{

              navigate(`/updateattend/${id}/${name||" "}/${email||" "}/${status||" "}/${inTime||" "}/${outTime||" "}/${date||" "}/${employeeId|| " "}`)
          }}>update</button></td>
          }


          
    </tr>
  )
}
