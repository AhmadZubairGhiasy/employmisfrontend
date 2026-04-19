
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {Area,AreaChart, Bar, BarChart, Brush, CartesianGrid, ComposedChart, Line, LineChart, Pie, PieChart, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from'recharts'

 let users = []
export default function Mychart() {

    const [allmonthattend, setallmonthattend] = useState()
    const [allmonthproject, setallmonthproject] = useState()
    const [performance, setperformance] = useState()


    const getreport = async ()=>{  
     
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuserreport`,{withCredentials:"include"})
  console.log("report result is: ", response)

  setallmonthattend(response.data.monthlyattend)
  setallmonthproject( response.data.monthlyproject)


  }

  useEffect(() => {
    
    getreport()

  }, [])



  
  if(allmonthattend){
    users = allmonthattend.map((e,index)=>{
    
      const projectpers = allmonthproject[index].data
      return{
        name:e.month,
         appsentiszim:Math.round((e.report.absent/e.report.alldays)*100)||0,
         performance:Math.round((100*projectpers.completed/projectpers.allproject)-(40* e.report.absent/e.report.alldays))||5
      }
    })
  }


  console.log("almonthattend is: ", users)





  /*   name:"jan",
      performance:100,
      appsentiszim:32
    }*/
 
  return (
    
   
     <ResponsiveContainer width={"100%"} height={300}>
      
         <ComposedChart data={users} >
          <XAxis dataKey={"name"}  style={{textTransform:"capitalize"}}/>
          <YAxis unit='%'/>
      
          
          <Tooltip contentStyle={{textTransform:"capitalize"}}/>

          <Bar fill='#018161ff' strokeWidth={"2px"} type="natural" dataKey={"performance"}  radius={[100,100,100,100]} barSize={30}/>
           <Line  stroke='#ff0000' fill='#ff0000ff' strokeWidth={"2px"} type="natural" dataKey={"appsentiszim"}/>
         </ComposedChart>

     
     </ResponsiveContainer>

     

   
  )
}
