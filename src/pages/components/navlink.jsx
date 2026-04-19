import React from 'react'
import { useLocation } from 'react-router-dom';


import { NavLink as RouterLink } from 'react-router-dom'

export default function Navlink({Icon, lable, path, lablestatus,state}) {
    
      let Location = useLocation()

    


  return (
        <>

          <RouterLink to={path} className={Location.pathname == path ? "active navlink":"navlink"}>
            {Icon && <Icon size ={20}/>}
            {lablestatus? <span style={{width:'120px'}}> {lable}</span>: <></>}
          </RouterLink>
          
        </>
  )
}
