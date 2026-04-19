import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../api/api'
export default function Attenditem({ id, name, email, thebtnvalue }) {
    const nav = useNavigate()
    const [status, setstatus] = useState("")
    const [inTime, setinTime] = useState("")
    const [outTime, setoutTime] = useState("")
    const [date, setdate] = useState("")


    const employeeattendsubmite = async () => {
        const userdata = {
            employeeId: id,
            name,
            email,
            status,
            inTime,
            outTime,
            date,
            month: new Date(date).getMonth()

        }

        console.log("client date to be sent", userdata)
        const response = await api.post(`/addattend`, userdata)

        console.log("response is: ", response)
        alert(response.data)

        nav("/admin")
    }

    return (
        <tr className='tablerow' >

            <td style={{ textTransform: "capitalize" }}>{name || "not define"}</td>
            <td style={{ fontSize: "12px" }}>{email || "not define"}</td>
            <td><select name="status" id="status" className='inputtype width120' value={status} onChange={(e) => { setstatus(e.target.value) }} >
                <option value="" disabled hidden>Status</option>
                <option>present</option>
                <option>absent</option>
                <option>late</option>
                <option>excuse</option>
            </select></td>

            <td><input type="time" name='inTime' value={inTime} onChange={(e) => { setinTime(e.target.value) }} className='inputtype width120' /></td>
            <td><input type="time" name='outTime' value={outTime} onChange={(e) => { setoutTime(e.target.value) }} className='inputtype width120' /></td>
            <td><input type="date" name='date' value={date} onChange={(e) => { setdate(e.target.value) }} className='inputtype width120' /></td>
            <td><input type="submit" value={thebtnvalue} className='btn primary width120' onClick={employeeattendsubmite} /></td>
        </tr>
    )
}
