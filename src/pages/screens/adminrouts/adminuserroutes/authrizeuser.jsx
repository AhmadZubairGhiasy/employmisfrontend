import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AuthUserItem from '../../../components/authuserlistitem'
import { useNavigate } from 'react-router-dom'

export default function Authrizeuser() {
    const navigate = useNavigate()
    const [datatRender, setdatatRender] = useState([])


    const getpendinguser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getpendinguser`, { withCredentials: "include" })
            console.log("pending users are: ", response)
            setdatatRender(response.data)


        } catch (error) {
            console.log("pending response is: ", error)
        }

    }

    const handleaccept = async (id) => {
        console.log("accept user id:", id)

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/decidependinguser`, { id, action: "accept" }, { withCredentials: true })
        getpendinguser()

        console.log(response)
    }



    const handlereject = async (id) => {
        console.log("reject user id:", id)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/decidependinguser`, { id, action: "reject" }, { withCredentials: true })
        console.log(response)
    }



    useEffect(() => {

        getpendinguser()
    }, [])


    return (
        <section className='listofuser'>
            <table className='userlist'>
                <tr>

                    <th>Name</th>
                    <th>Email</th>
                    <th>Accept</th>
                    <th>Reject</th>

                </tr>

                <div className="usrlistbody">

                    {datatRender.map(u => <AuthUserItem id={u._id} name={u.name} email={u.email} accept={handleaccept} reject={handlereject} />)}

                </div>

            </table>
        </section>
    )
}
