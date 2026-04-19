import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



import api from '../../../../api/api'
import Searchbar from '../../../components/searchbar'
import Usercard from '../../../components/usercard'



export default function Updateuserlist() {


  const [user, setuser] = useState([])

  const getmisuser = async () => {
    const res = await api.get("/getalluser")
    setuser(res.data)

  }




  useLayoutEffect(() => {
    getmisuser()
  }, [])

  const deletehandler = async (id) => {
    let filterdate = user.filter(u => u.name !== id)
    let founduser = user.find(u => u.name == id)

    const response = await api.post(`/deletuser`, { id: founduser._id })
    setuser(filterdate)
    document.location.replace('/admin')
  }


  const searchhandler = (name) => {

    if (!name) {
      setuser(user)
      return
    }


    let filterdate = user.filter(u => u.name === name)
    console.log(filterdate)



    setuser(filterdate)
  }


  const navigate = useNavigate()

  return (
    <section className='searchsection'>


      <div className='serachcontainer'>
        <Searchbar handlerinput={searchhandler} />
      </div>


      {/*<div className="creatbtncontainer"><button className='btn primary'>Create new user</button></div>*/}

      <div className='searchresult'>
        {
          user.map(u => <Usercard username={u.name} id={u._id} email={u.email} deletebtn={false} updatebtn={true} updatebtnhandler={() => { navigate(`/updateuser/${u._id}`) }} />)
        }


      </div>


    </section>
  )
}
