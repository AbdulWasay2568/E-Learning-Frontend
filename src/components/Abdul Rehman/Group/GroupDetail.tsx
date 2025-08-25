import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {Users, ChevronDown, Paperclip, Send, Plus} from "lucide-react";
import './Group.css'
import { useEffect, useRef } from "react";

// interface AvatarProps {
//   name: string;
// }

const letterColors: Record<string, { color: string; bg: string }> = {
  A: { color: "#0047AB", bg: "#B3D9FF" }, // Blue
  B: { color: "#800080", bg: "#E6CCFF" }, // Purple
  C: { color: "#006400", bg: "#B2FFB2" }, // Dark Green
  D: { color: "#8B0000", bg: "#FFB3B3" }, // Dark Red
  E: { color: "#FF8C00", bg: "#FFE0B3" }, // Orange
  F: { color: "#2E8B57", bg: "#C2F0C2" }, // Sea Green
  G: { color: "#800000", bg: "#FFCCCC" }, // Maroon
  H: { color: "#4682B4", bg: "#CCE5FF" }, // Steel Blue
  I: { color: "#708090", bg: "#E0E6EB" }, // Slate Gray
  J: { color: "#9932CC", bg: "#E5CCFF" }, // Dark Orchid
  K: { color: "#FF1493", bg: "#FFCCE5" }, // Deep Pink
  L: { color: "#228B22", bg: "#CCFFCC" }, // Forest Green
  M: { color: "#FF4500", bg: "#FFD6CC" }, // Orange Red
  N: { color: "#2F4F4F", bg: "#D9E6E6" }, // Dark Slate Gray
  O: { color: "#DAA520", bg: "#FFF0CC" }, // Goldenrod
  P: { color: "#191970", bg: "#CCCCFF" }, // Midnight Blue
  Q: { color: "#B22222", bg: "#FFCCCC" }, // Firebrick
  R: { color: "#0066CC", bg: "#CCE5FF" }, // Royal Blue
  S: { color: "#556B2F", bg: "#E5F0CC" }, // Olive Drab
  T: { color: "#FF6347", bg: "#FFD9D4" }, // Tomato
  U: { color: "#20B2AA", bg: "#CCF5F2" }, // Light Sea Green
  V: { color: "#9400D3", bg: "#E0CCFF" }, // Dark Violet
  W: { color: "#A0522D", bg: "#F2D9CC" }, // Sienna
  X: { color: "#4682B4", bg: "#CCE0FF" }, // Steel Blue
  Y: { color: "#FFD700", bg: "#FFF7CC" }, // Gold
  Z: { color: "#708090", bg: "#E6EBF0" }, // Slate Gray
};

type Message = {
  text: string;
  time: string;
};

type Group = {
  name: string;
  section: string;
  firstname: string;
  messages: Message[];
};

const GroupDetail:React.FC = () => {
  

  
 const [name, setName] = useState<string>("");
      const [section, setSection ] = useState<string>("");
      const [subject, setSubject] = useState<string>("");
      const [room, setRoom] = useState<string>("");
      const [showForm, setShowForm] = useState<boolean>(false);
      const mySubmission = (e:React.FormEvent) =>{
        e.preventDefault();

      }
  const location = useLocation();

  // const {name, section, subject, room} = location.state || {};

  // // pick colors if available, otherwise fallback
  // const { color, bg } = letterColors[firstChar] || {
  //   color: "#333",
  //   bg: "#ddd",
  // };
  const [toggle,setToggle] = useState<boolean>(false);
  const togglechev = () =>{
    setToggle(!toggle);
  }

  const [inputmessage,setInputmessage] = useState<string>(""); //linked to input
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

   const [showchat,setShowchat] = useState<boolean>(false);

   const [addmessage,setAddmessage] = useState<Message[]>([]);//linked to following function

const bottomRef = useRef<HTMLDivElement | null>(null); 
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth",   // or "auto" if you want instant
    block: "end", });
}, [addmessage]);


  //  const mymessages = () =>{
  //   if(!inputmessage.trim()) return;

  //   const message = {
  //     text:inputmessage,
  //     time: currentTime
  //   }

  //   setAddmessage((prev)=>([...prev,message]))
  //   setInputmessage("");
  //  }
 const mymessages = () => {
  if (!inputmessage.trim() || !selectedGroup) return;

  const message: Message = {
    text: inputmessage,
    time: currentTime,
  };

  setAddgroup((prev) =>
    prev.map((group) =>
      group.name === selectedGroup.name && group.section === selectedGroup.section
        ? { ...group, messages: [...group.messages, message] }
        : group
    )
  );

  setInputmessage("");
};

   const [addgroup, setAddgroup] = useState<Group[]>([]);
   const addgroups = () =>{
      const firstChar = name.charAt(0).toUpperCase();


    const groups = {
      name: name, section: section,firstname:firstChar,messages: []
    }

    setAddgroup((prev)=>([...prev, groups]));
    setName("");
    setSection("");
    setRoom("");
    setSubject("");
   }

   const [selectedGroup, setSelectedGroup] = useState<{
  name: string;
  section: string;
  firstname: string;
} | null>(null);


  return (
  <div className='premiumdiv scrollbar-hide' onWheel={(e) => e.preventDefault()} >
    <div className="myfirstdiv">
      
      <div className="allgroups" onClick={togglechev}>
        <Users />
        <p>Groups</p>
        <ChevronDown className={toggle?'chevup':'chevdown'}/>
      </div>
       <div className="addthegroup">
        <div className="adding" onClick={() => setShowForm(true)}>
          <Plus className='plus' />
        </div>
      </div>
      {addgroup.map((e,i)=>{
  const { color, bg } = letterColors[e.firstname] || {
    color: "#333",
    bg: "#ddd",
  };
      
      return(
      <div className={toggle?"nodisplaygroup":"displaygroups"} key={i} onClick={() => setSelectedGroup(e)}>
        <div className="symbol"  style={{
            backgroundColor: bg,
            color: color}}>
          <p>{e.firstname}</p>
        </div>
        <div className="otherdetails">
          <p>{e.name}</p>
          <p className='section'>{e.section}</p>
        </div>
        
      </div>
      )})}

     
      
    </div>

    <div className="chat">
      {/* first */}
       <div className="topdiv">
  
      {selectedGroup && (() => {
  const { color, bg } = letterColors[selectedGroup.firstname] || {
    color: "#333",
    bg: "#ddd",
  };

  return (
    <div className="topdiv">
      <div
        className="symbol2"
        style={{
          backgroundColor: bg,
          color: color,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {selectedGroup.firstname}
      </div>

      <div className="otherdetails">
        <p className="mygroupname">{selectedGroup.name}</p>
      </div>
    </div>
  );
})()}
</div>

      <hr className='horizontal'/>

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
                    <button onClick={() => addgroups()}>Create</button>
               </div>

            </div>
            
        
        
      </form>
      </div>
      </div>
      )}


{/* second */}
            <div className="bottomdiv scrollbar-hide" 
            >
              
              {/* <div className={showchat?'showmessage':'dontshowmessage'}> */}
              {/* {addmessage.map((e,index)=>( */}
               {selectedGroup &&
    addgroup
      .find((g) => g.name === selectedGroup.name && g.section === selectedGroup.section)
      ?.messages.map((e, i) => (
              <div className="showmessage" key={i} >
                <div>
                  <p className='pinputmessage'>{e.text} </p>
                </div>
                <div className='time'>
                  <p >{e.time}</p>
                </div>
                
              </div>
              
              ))}
              <div ref={bottomRef} />
              
            </div>

            {/* third */}
            
    <div className="lastdiv">
      {/* <div className="papinp"> */}
        <div className="paperclip">
          <Paperclip className='paperclip'/>
        </div>
        <div className="inputmessage">
          <textarea
  placeholder="Type a message"
  className="typemessage"
  value={inputmessage}
  onChange={(e) => setInputmessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      mymessages(); // send on Enter
    }
  }}
/>

        </div>
      {/* </div> */}

      <Send className='send'onClick={mymessages} />


  
      
    </div>

    </div>
    
        
  </div>
  )
}

export default GroupDetail
