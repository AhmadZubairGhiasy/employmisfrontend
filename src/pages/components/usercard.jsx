export default function Usercard({
  username,
  photourl, 
  email,
  updatebtn,
  warningbtn, 
  deletebtn, 
  seeprofilebtn, 
  seeprofilebtnhandler,
  updatebtnhandler,
  deletebtnhandler,
  id
  
  }) {
  return (
    <div className='usercard'>
        <div className='usercardphoto' style={{outline:"3px solid #000000a8"}}>
            <img src={`http://localhost:3500/uploads/${id}/profilephoto.jpg`}  alt="userphoto" style={{objectFit:"cover", width:"100%", height:"100%"}} />
        </div>
        
        <h3 style={{textTransform:"capitalize"}}>{username|| "User name"}</h3>
        <p>{email || "username@gmail.com"}</p>
        
        <div>

          {
            updatebtn?  <button onClick={ updatebtnhandler} className='btn primary'>update</button>: <></>
          }

           {
            deletebtn?   <button onClick={()=>{deletebtnhandler(id)}} className='btn error'>delete</button>: <></>
          }
         

          {
            warningbtn?   <button className='btn warning'>give warn</button>: <></>
          }
         
           {
            seeprofilebtn?   <button onClick={seeprofilebtnhandler} className='btn '>see profile</button>: <></>
          }
         

         
         
      
        </div>
        </div>


  )
}
