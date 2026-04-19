import React, { useState, useLayoutEffect } from 'react'



// components
import Navlink from './navlink'
import * as icons from "react-icons/fa"
import Userpic from './Userpic'

import api from '../../api/api'
import { useNavigate } from 'react-router-dom'




export default function Navigation({ userdata }) {

  const [userrole, setuserrole] = useState(null)

  const nav = useNavigate()

  const checkrole = async () => {
    const res = await api.get("/checkrole")

    setuserrole(res.data.message)
    console.log("user role: ", userrole)
  }









  const logout = async () => {


    try {
      await api.get(`/logout`)
      nav("/login")
    } catch (error) {
      console.log(error)
    }



  }



  console.log("user data from navigator: ", userdata)


  const [linklable, setlable] = useState(true)

  const handlelabel = () => {
    linklable === true ? setlable(false) : setlable(true)
  }


  useLayoutEffect(() => {
    checkrole()
  }, [])


  return (
    <>
      <nav className='navigation'>


        <br />

        <icons.FaBars style={{ paddingInline: 20 }} onClick={handlelabel} />



        <br />
        {userdata ? <Userpic lablestatus={linklable} picUrl={`${process.env.REACT_APP_API_URL}/uploads/${userdata._id ?? ""}/profilephoto.jpg`} id={userdata._id ?? ""} Icon={icons.FaUser} username={userdata.name ?? ""} />
          : <></>}
        <br />


        <Navlink lablestatus={linklable} Icon={icons.FaTachometerAlt} path="/" lable="dashboard" />
        <Navlink lablestatus={linklable} Icon={icons.FaTasks} path="/projectlist" lable="projects" />
        <Navlink lablestatus={linklable} Icon={icons.FaUserCheck} path="/userattend" lable="attendence" />
        <Navlink path="/userReport" lablestatus={linklable} Icon={icons.FaChartBar} lable="annual report" />

        <br />
        <br />

        <br />


        {

          userrole === "admin" ? <> <Navlink path="/search" lablestatus={linklable} Icon={icons.FaSearch} lable="search" />
            <Navlink path="/admin" lablestatus={linklable} Icon={icons.FaUserLock} lable="Admin" />

          </> : <></>
        }
        <br />
        <br />
        <br />

        {userdata ? <Navlink lablestatus={linklable} Icon={icons.FaUser} path={`/profile/${userdata.name ?? ""}`} lable="profile" /> : <></>}
        <button onClick={logout} className={`btn primary ${linklable ? "width120" : ""}`}><icons.FaSignOutAlt /> {linklable ? <>log out</> : <></>}</button>

        <br />
      </nav>


    </>
  )
}
