import axios from 'axios'
import { useState, useContext, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/api'








export default function PropicChange() {


  // hooks

  const navigate = useNavigate()



  const [userprofiledata, setuserprofiledata] = useState(null)


  const [loading, setloading] = useState(true)
  const [file, setfile] = useState(false)
  const [imgurl, setimgurl] = useState(null)
  const [message, setmessage] = useState(false)



  const getuserdata = async () => {
    try {
      const res = await api.get('/profile')
      setuserprofiledata(res.data)
      console.log("user data new taken: ", res)
      setloading(false)

    } catch (error) {

    }
  }



  const getfile = (e) => {
    try {
      setfile(e.target.files[0])
      setimgurl(URL.createObjectURL(e.target.files[0]))


    } catch (error) {
      console.log(error)
    }
  }


  const data = userprofiledata
  console.log("data to be sent is: ", data)





  const uploadfile = async () => {

    const dataform = new FormData()

    dataform.append('file', file)
    dataform.append("id", data._id)
    console.log(dataform)
    console.log("id to be sent is: ", data._id)



    const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload?id=${data._id}`, dataform, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true })

    console.log(response)
    setmessage(true)
    window.location.reload()
    navigate('/')

  }
  useLayoutEffect(() => {
    getuserdata()
  }, [])
  return (
    <>

      {loading ? <h1>loading...</h1> :
        <section style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>

          <img src={imgurl ?? `${process.env.REACT_APP_API_URL}/uploads/${userprofiledata._id}/profilephoto.jpg`} style={{ width: "200px", height: "200px", overflow: "hidden", display: "flex", borderRadius: "50%", border: "5px solid #000000cc", objectFit: "cover", backgroundColor: 'lightgray' }} />

          <input className='fileinput' type="file" onChange={getfile}></input>

          <button onClick={uploadfile} style={{ width: "300px" }} className="btn primary btn-larg">Set image</button>


          {message === true ? <div style={{ position: "fixed", width: "400px", height: "350px", backgroundColor: "#ffffffee", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "2px 2px 50px #00000088", borderRadius: "10px" }}>
            <h1>Img Set</h1>
            <button className="btn" onClick={() => { setmessage(false) }}>close</button>
          </div> : <></>}
        </section>}
    </>
  )
}
