import React, { useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import Listitem from '../../../components/listitem'
import api from '../../../../api/api'

export default function Viewuserlist() {



    const [MisUsers, setMisUsers] = useState([])

    const getmisuser = async () => {
        const res = await api.get("/getalluser")
        setMisUsers(res.data)

    }




    useLayoutEffect(() => {
        getmisuser()
    }, [])



    let navigate = useNavigate()
    return (
        <section className='listofuser'>
            <table className='userlist'>
                <tr>

                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Position</th>

                </tr>

                <div className="usrlistbody">

                    {MisUsers.map(u => <Listitem id={u.id} name={u.name} email={u.email} department={u.department} position={u.position} seeprofilebtnhandler={() => { navigate(`/user/${u.name}`) }} />)}

                </div>

            </table>
        </section>
    )
}
