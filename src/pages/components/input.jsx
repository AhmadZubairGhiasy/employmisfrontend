
export default function Input(props) {
   

  return (
    <>
    <label className='label'  htmlFor={props.name}>{props.name}</label>
  
    <input value={props.value} onChange={props.onChange} className='input' type={props.type} name={props.name}  placeholder={props.name} /> 
    <br />
    </>
  )
}
