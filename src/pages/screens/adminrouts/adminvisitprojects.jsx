import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'



import Projectlistitem from '../../components/Projectlistitem'

import axios from 'axios'





export default function Adminvisitprojects() {


    // get id by prams

    const prams = useParams()
    

      
    const [userprojects, setuserprojects] = useState([])

    console.log("userprooject state is: ", userprojects)

    const deleteproject = async (id)=>{

        
            console.log("project delete: ", id)

             const response = await axios.post(`${process.env.REACT_APP_API_URL}/deleteproject`,{id:id},{withCredentials: true})
             console.log("delete project response: ", response)

             if(response.status ===200){
                const filterdata = userprojects.filter(p=> p._id!==id)
                await setuserprojects(filterdata)
             }
         
    }


     const getuserprojects = async ()=>{

        
            console.log("user id : ", prams.id)

          try {
               const response = await axios.get(`${process.env.REACT_APP_API_URL}/getallproject/?id=${prams.id}`,{withCredentials: 'include'})
             console.log("user all project response in admin: ", response)
             setuserprojects(response.data)
          } catch (error) {
            console.log(error)
          }

         
    }







    useEffect(() => {
     getuserprojects()
    }, [])
    
    const rendercontent = ()=>{
      return userprojects.map(p => <Projectlistitem id={p._id} name={p.name} status={p.status} description={p.description} infodata={p.infoData} deletebtn={deleteproject} updatebtn={false} />)
    }



  return (
    <section className='listofuser' style={{flexDirection:"column", alignItems:"start"}}>

        <table  className='userlist'>
        <tr>
           
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Description</th>
            <th>Action</th>

        </tr>

            <div className="usrlistbody">
                
            {
            userprojects==="project not found"?<></>:rendercontent()
          
           }
 
            </div>

   </table>
    </section>
  )
}
