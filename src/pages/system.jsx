import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from './components/navigation'
import ProcessLoading from './components/loading';
import api from './../api/api';

export default function System() {

  //hooks
  const navigate = useNavigate()


  const [userdata, setuserdata] = useState(null)
  const [isloading, setisloading] = useState(false)


  const getuserdata = async () => {
    try {
      const res = await api.get('/profile')
      setuserdata(res.data)
      console.log("user data new taken: ", res)
    } catch (error) {

    }
  }




  useLayoutEffect(() => {
    getuserdata()
  }, [])





  console.log("userdate from state: ", userdata)



  return (

    <section className='system-main'>
      <Navigation userdata={userdata} />

      < Outlet />

      {isloading ? <ProcessLoading /> : <></>}
    </section>
  )
}
