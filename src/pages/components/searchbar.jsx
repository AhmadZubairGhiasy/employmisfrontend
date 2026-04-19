import React, { useState } from 'react'
import * as icons from "react-icons/fa" 


export default function Searchbar({handlerinput}) {
  const [invalue, setinvalue] = useState('')


  const valuehandeler = (e)=>{
    
      setinvalue(e.target.value)
      

      


      console.log(invalue)
  }

  return (
    <form className='searchform'>
        <input value={invalue} onChange={valuehandeler} type="text" placeholder='search' className='searcinput' />
        <button onClick={()=>{handlerinput(invalue)}} type='button' className='serachbtn'><icons.FaSearch size={20}/></button>
    </form>
  )
}
