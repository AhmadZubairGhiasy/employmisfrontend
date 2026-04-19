
export default function Dashcard({Icon,name, value, bgcolor, color,alignment, clickevent}) {
  return (
    <div onClick={clickevent} className='dashcard' style={{backgroundColor: bgcolor, color:color, padding:"16px", display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", flexDirection:"column",alignItems:alignment||"center", textAlign:alignment||"center"}}>
                 {Icon && <Icon size ={40}/>}
                <label style={{textTransform:"capitalize"}}>{name}</label>
            </div>
            <span style={{fontSize:"3rem", fontWeight:"bold"}}>{value}</span>



            

    </div>
  )
}
