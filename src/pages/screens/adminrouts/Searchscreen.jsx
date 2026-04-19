
import { useLayoutEffect, useState } from 'react'
import Searchbar from '../../components/searchbar'
import Usercard from '../../components/usercard'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/api'





export default function Searchscreen() {

  const [MisUsers, setMisUsers] = useState([])

  const getmisuser = async () => {
    const res = await api.get("/getalluser")
    setMisUsers(res.data)

  }

  const navigate = useNavigate()


  useLayoutEffect(() => {
    getmisuser()
  }, [])

  return (
    <section className='searchsection'>


      <div className='serachcontainer'>
        <Searchbar />
      </div>


      <div className='searchresult'>
        {
          MisUsers.map(u => <Usercard id={u._id} username={u.name} email={u.email} seeprofilebtn={true} seeprofilebtnhandler={() => { navigate(`/user/${u.name}`) }} />)
        }


      </div>


    </section>
  )
}
