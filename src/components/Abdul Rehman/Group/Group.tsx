import React from 'react'
import { useState } from 'react';
import './Group.css'
import { useNavigate } from 'react-router-dom';
import myimage from '../../../assets/Images/Group/grp.png';
 
const Group:React.FC = () => {
    const navigation = useNavigate();

      const [name, setName] = useState<string>("");
      const [section, setSection ] = useState<string>("");
      const [subject, setSubject] = useState<string>("");
      const [room, setRoom] = useState<string>("");
      const [showForm, setShowForm] = useState<boolean>(false);
      const mySubmission = (e:React.FormEvent) =>{
        e.preventDefault();

        navigation('/Group-Detail',{
            state:{name, section, subject, room}}
        )
      }
  return (
    <div className='mymaindiv'>
      <div className="picture">
        <img src={myimage} alt="Group Image" />
      </div>
      <div className="myclass">
        <span onClick={() => setShowForm(true)}>Create Group</span>
        <button >Join Group</button>
      </div>

      {showForm && (
      <div className="modal">
          <div className="modal-content">
        <form action=""
      onSubmit={mySubmission}
      >
        
        <div className="formdiv">
          
            <h2 className='heading'>Create Group</h2>
                <div className="input">
                  <input type="text" placeholder='Group name' required value={name} onChange={((e)=>setName(e.target.value))}/>
                </div>
              
              <div className="input">
                <input type="text" placeholder='Section' required value={section} onChange={((e)=>setSection(e.target.value))}/>
              </div>
                
              <div className="input">
                  <input type="text" placeholder='Subject' required value={subject} onChange={((e)=>setSubject(e.target.value))}/>
              </div>
              
              <div className="input">
                <input type="text" placeholder='Room' required value={room} onChange={((e)=>setRoom(e.target.value))}/>
              </div>

              <div className="myclass">
                    <span onClick={()=>setShowForm(false)}>Cancel</span>
                    <button onClick={() => setShowForm(true)}>Create</button>
               </div>

            </div>
            
        
        
      </form>
      </div>
      </div>
      )}
    </div>
  )
}

export default Group
