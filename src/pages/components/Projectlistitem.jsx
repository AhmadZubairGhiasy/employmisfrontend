import { useNavigate } from 'react-router-dom'

export default function Projectlistitem({id, name, infodata, status, description, deletebtn,updatebtn, pathto }) {
  const navigate = useNavigate()
  return (
    <tr className='tablerow'>
     
        <td style={{textTransform:"capitalize"}}>{name}</td>
        <td>{`${infodata}`.split("T")[0]}</td>
        <td style={{textTransform:"capitalize"}}>{status}</td>
        <td style={{fontSize:"12px"}}>{description}</td>
         <td>
          
          


          {updatebtn?<button onClick={()=>{navigate(`/updateproject/${id}`)}} className="btn primary" style={{backgroundColor:"#00c531ff"}}>update</button>:<></>}
          <button onClick={()=>{deletebtn(id)}} className="btn error">delete</button>
          </td>
    </tr>
  )
}
