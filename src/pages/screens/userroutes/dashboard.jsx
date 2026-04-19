import {useEffect, useState} from 'react'
import * as icons from "react-icons/fa" 
import axios from 'axios'
import Dashcard from '../../components/dashcard'
import Mychart from '../../components/chart'


export default function Dashboard() {


  const [present, setpresent] = useState()
  const [absent, setabsent] = useState()
  const [performance, setperformance] = useState()
  


  const getreport = async ()=>{  
     
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuserreport`,{withCredentials:"include"})
  console.log("report result is: ", response)


   const thismonth = new Date().getMonth()

  const thismonthdataattend =  response.data.monthlyattend.find((a,index)=> index===thismonth ) 
  const thismonthprojects =  response.data.monthlyproject.find((a,index)=> index===thismonth ) 

  console.log("this month attends report: ", thismonthdataattend)
  console.log("this month projects report: ", thismonthprojects)

  setpresent(thismonthdataattend.report.present)
  setabsent(thismonthdataattend.report.absent)

  
  
  const pre= thismonthdataattend.report.present
  const alldays = thismonthdataattend.report.alldays

  const completedproject = thismonthprojects.data.completed 
  const allproject = thismonthprojects.data.allproject


  const performcal = (0.4*(completedproject/allproject)*100)+(0.6*(pre/alldays)*100) 

  setperformance(performcal)

  }

  useEffect(() => {
    
    getreport()

  }, [])




  return (
    <section className='dashboard'>
      
        
       <Mychart />
        <div className="details" >
            
              <Dashcard bgcolor={"red"} color={"white"} name={"appsents"} value={absent||0} Icon={icons.FaUserSlash}/>
              <Dashcard bgcolor={"green"} color={"white"} name={"preformance"} value={(performance||0)+"%"} Icon={icons.FaTachometerAlt}/>  
              <Dashcard bgcolor={"blue"} color={"white"} name={"presents"} value={present||0} Icon={icons.FaUserCheck}/>
             

        </div>
        
        
        </section>
  )
}
