
import Input from '../../components/input'

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Registerscreen(props) {

  const navigate = useNavigate()

  


  // context states
   
   
  

  // states 

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpasswrod] = useState('')
  const [registermsg, setregistermsg] = useState('')
   const [btnstate, setbtnstate] = useState(false)





  const onchangename = (e)=>{
    setname(e.target.value)
    console.log(name)
  }


  const onchangeemail = (e)=>{
    setemail(e.target.value)
    console.log(email)
  }

  const onchangepassword = (e)=>{
    setpasswrod(e.target.value)
    console.log(password)
  }

  const handleRegister = async ()=>{

    if(!name || !email || !password){
      setregistermsg("Name, Email and Password are require")
      return
    }


   const userdata = {"email":email,"password":password}
    

    try {
       setbtnstate(true)
        const userdata = {"name":name,"email":email,"password":password}
          const response =  await axios.post(`${process.env.REACT_APP_API_URL}/register`,userdata)

           console.log(response)

     if(response.status === 200){
      setregistermsg("You are registered.  wait until admin confirm")
     }
   


    } catch (error) {
        setregistermsg(error.response.data)
        return
        
    }

    
     setbtnstate(false) 
  }


  return (
    <>
    <button className='btn' onClick={()=>{navigate('/login')}}>login</button>
      <section className='wholepage' style={{flexDirection:"column"}}>

          <h3 >{registermsg}</h3>  <br />      
          <form action="" className='formstyle'>
            <Input value={name} onChange={onchangename}  name="name" type="text"/>
            <Input value={email} onChange={onchangeemail}  name="email" type="email"/>
            <Input value={password} onChange={onchangepassword} name="password" type="password"/>
            <button onClick={handleRegister} className='btn primary btn-larg' type='button'>register</button>
          </form>

      </section>
    
    </>
    
  )
}
