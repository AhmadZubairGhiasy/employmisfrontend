

export default function Diagcomp({name, value}) {

    let stw = 8;
    let perc = value|| 0

    
       
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginInline:20}}>
        <div className='circhar'>
            <h1 style={{zIndex:2000, color:"black"}}>{perc+"%"}</h1>
             <svg width={160} height={160}>
            
            <circle 
            cx={80} 
            cy={80} 
            r={80 - stw / 2} 
            fill='#f0efefff' 
            stroke='#000000b9' 
            strokeWidth={stw} 
            strokeDasharray={2*Math.PI *77.5} 
            strokeDashoffset={2*Math.PI *77.5- 2*Math.PI *77.5*perc/100 }
            strokeLinecap='round'
            />
             
            
        </svg>
        
             
        

    </div>
    <h2 style={{color:"black",position:"relative", paddingTop: 50, textTransform:"capitalize"}}>{name||"date"}</h2>
    </div>
  )
}
