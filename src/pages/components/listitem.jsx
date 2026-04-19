export default function Listitem({id,name, email, department, position, seeprofilebtnhandler }) {
  return (
    <tr className='tablerow' onClick={seeprofilebtnhandler}>
     
        <td style={{textTransform:"capitalize"}}>{name}</td>
        <td>{email}</td>
        <td>{department}</td>
        <td>{position}</td>
    </tr>
  )
}
