

export default function AuthUserItem({id,name, email, reject, accept }) {
  return (
    <tr className='tablerow'>
     
        <td style={{textTransform:"capitalize"}}>{name}</td>
        <td>{email}</td>
        <td><button className='btn primary' style={{backgroundColor:"#00ad48ff"}} onClick={()=>{accept(id)}}>accept</button></td>
        <td><button className='btn error' onClick={()=>{reject(id)}}>reject</button></td>
    </tr>
  )
}
