import { useContext, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Projectlistitem from '../../../components/Projectlistitem'
import { Mycontext } from '../../../statestore/contProvider'
import axios from 'axios'
import api from '../../../../api/api'
export default function Viewprojectlist() {



  const [loading, setloading] = useState(true)
  const [userallproject, setuserallproject] = useState([])


  const getuserprojects = async () => {
    const res = await api.get('getproject')
    console.log("user projects: ", res)
    setuserallproject(res.data)
    setloading(false)
  }



  useLayoutEffect(() => {
    getuserprojects()
  }, [])


  const deleteproject = async (id) => {

    setloading(true)
    console.log("project delete: ", id)

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/deleteproject`, { id: id }, { withCredentials: true })
    console.log("delete project response: ", response)

    if (response.status === 200) {
      const filterdata = userallproject.filter(p => p._id !== id)
      setuserallproject(filterdata)
    }

    setloading(false)
  }

  let navigate = useNavigate()
  return (
    <>
      {
        loading ? <h1>loading</h1>
          : <section className='listofuser' style={{ flexDirection: "column", alignItems: "start" }}>

            <button className="btn primary" onClick={() => { navigate("/createproject") }} style={{ marginBlock: "16px" }}>create new project</button>
            <table className='userlist'>
              <tr>

                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Description</th>
                <th>Action</th>

              </tr>

              <div className="usrlistbody">

                {
                  Array.isArray(userallproject) ?
                    userallproject.map(p => <Projectlistitem id={p._id} name={p.name} status={p.status} description={p.description} infodata={p.infoData} deletebtn={deleteproject} updatebtn={true} />)
                    : <><br /><p>no project found</p></>
                }

              </div>

            </table>
          </section>
      }

    </>
  )
}
