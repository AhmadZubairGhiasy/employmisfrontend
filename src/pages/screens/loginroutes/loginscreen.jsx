import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// components 
import Input from '../../components/input'
import ProcessLoading from '../../components/loading'






export default function Loginscreen() {




  // local states
  const navigate = useNavigate()


  const [email, setemail] = useState('')
  const [password, setpasswrod] = useState('')
  const [loginmessage, setloginmessage] = useState('')
  const [loading, setloading] = useState(false)
  const [btnstate, setbtnstate] = useState(false)
  


 

  

  const onchangeemail = (e)=>{
    setemail(e.target.value)
    console.log(email)
  }

  const onchangepassword = (e)=>{
    setpasswrod(e.target.value)
    console.log(password)
  }

  const handlelogin = async ()=>{

        
      if(!email || !password){
        setloginmessage("Email and Password are require")
        return
      }
 

      const userdata = {"email":email,"password":password}
  
    
    try {
        setloading(true)
         setbtnstate(true)
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}/login`,userdata,{withCredentials:true})
         setloading(false)
        
        if(response.status === 200){
        setloginmessage('you loged in') }
       
        setbtnstate(false)
        console.log(response)
         navigate('/')
       

     
    } catch (error) {
     
      setloginmessage(error.response.data)
       setbtnstate(false)
       setloading(false)
       return
      
    }  
    

    document.location.reload()
    navigate('/')
   
  }


  return (
    <>
     <button className='btn' onClick={()=>{navigate('/register')}}>Register</button>
      <section className='wholepage' style={{flexDirection:"column"}}>
         

          <h3 >{loginmessage}</h3>        
          <form action="" className='formstyle'>
            <Input value={email} onChange={onchangeemail}  name="email" type="email"/>
            <Input value={password} onChange={onchangepassword} name="password" type="password"/>
            <button disabled={btnstate} onClick={handlelogin} className='btn primary btn-larg' type='button'>login</button>
          </form>

      

          {loading?<ProcessLoading/>:<></>}
      </section>
    
    </>
    
  )
}
