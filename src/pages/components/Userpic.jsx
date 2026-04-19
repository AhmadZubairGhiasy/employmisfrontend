
import { useNavigate } from 'react-router-dom'

export default function Userpic({Icon,id, username,lablestatus, picUrl}) {
const navigate = useNavigate()
  
  return (
    <div className='userPicnavigation' onClick={()=>{navigate(`profile/${username}`)}}>
       
       <img  className='userpic' src={picUrl} alt='user'/>
       {lablestatus? <a  style={{textDecoration:"none",color:"black",cursor:"pointer"}}><span style={{width:"150px"}}  >{username}</span></a>: <></>}
    </div>
  )
}
