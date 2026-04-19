import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Attenditemreview from '../../components/attendlistitem-review'


export default function Getattend() {


  // geting gloable states



  // component states
  const [sortingdate, setsortingdate] = useState("")
  const [renderd, setrenderd] = useState([])



  const getdatabydatehanlder = async (e) => {


    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuserattends/?month=${sortingdate}`, { withCredentials: 'include' })
      await setrenderd(response.data)
      console.log("all attendse req is: ", response)

    }
    catch (error) { console.log("all user data is: ", error) }

  }


  const getattend = async (e) => {


    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuserattends`, { withCredentials: 'include' })
      await setrenderd(response.data)
      console.log("all attendse req is: ", response)

    }
    catch (error) { console.log("all user data is: ", error) }

  }





  useEffect(() => {
    getattend()
  }, [])


  //getuserattends




  return (
    <section className='listofuser' style={{ flexDirection: "column" }}>

      <form style={{ marginBlock: "32px" }}  >
        <label style={{ marginInline: "16px" }} >Enter Month:  </label>
        <input type="month" className='inputtype'
          value={sortingdate}
          onChange={(e) => { setsortingdate(e.target.value); }} />

        <input type="submit" value={"get by Month"} className='btn primary' onClick={(e) => { e.preventDefault(); getdatabydatehanlder() }} />
      </form>

      <table className='userlist'>
        <tr>


          <th>Attend Status</th>
          <th>In Time</th>
          <th>Out Time</th>
          <th>Date</th>



        </tr>

        <div className="usrlistbody">

          {renderd.map(u => <Attenditemreview


            id={u._id}
            employeeId={u.employeeId}
            status={u.status}
            inTime={u.inTime}
            outTime={u.outTime}
            date={u.date}

            nobtn={true}

          />)}

        </div>

      </table>
    </section>
  )
}






