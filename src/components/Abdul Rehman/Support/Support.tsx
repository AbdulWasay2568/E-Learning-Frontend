import React, { useState } from 'react'
import './support.css'

 interface myquestions{
    id:number;
    q:string;
    a:string;
}

const Support:React.FC = () => {

    let allquestions:myquestions[] = [];
    allquestions = [
        {
            id: 1,
            q: "How do I get access to a course?",
            a: "Select any course available on the home page, and get your learning started."
        },
        {
            id: 2,
            q: "Can I access my courses offline?",
            a: "Yes, if you have downloaded the lectures then you can access online."
        },
        {
            id: 3,
            q: "How do I reset my password?",
            a: "Click 'Forgot Password' on the login page, enter your registered email, and follow the instructions sent to your inbox."
        },
        {
            id: 4,
            q: "Are the courses self-paced?",
            a: "Yes, all our courses are self-paced. You can study at your own convenience and there is no deadline for completion."
        },
        {
            id: 5,
            q: "Do I get a certificate after completion?",
            a: "Yes, once you complete all lessons and quizzes in a course, you will receive a downloadable and shareable certificate."
        },
        {
            id: 6,
            q: "What payment methods are supported?",
            a: "The courses are free of cost, you don't have to pay for any course."
        },
    ];

    const [everyanswer, setEveryanswer] = useState<number|null>(null);
    const myfunction = (e:number) =>{
        setEveryanswer(everyanswer===e?null:e);
    }

    const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject ] = useState<string>("");
  const [message, setMessage ] = useState<string>("");




  return (
    <div className='maindiv'>
        <div className="upperdiv">
            <span>Welcome to E-Learning Help Center</span>
            <h2>How can we help you?</h2>
        </div>

        <div className='questiondiv'>
            <h3>Related FAQ'S</h3>
        {allquestions.map((e)=>(
            <div className="faq" key={e.id}>
                <h3 onClick={()=>myfunction(e.id)} className='quesions'>{e.q}</h3>
                <p className={everyanswer ===e.id?'answers':'availableanswers'}>{e.a}</p>
            </div>
        ))}
        </div> 

        <div className="upperdiv">
            <span>Still Having Queries?</span>
            <h2>Contact  Us By Filling The Form Below</h2>
        </div>

        {/* form of contact */}

        <form 
          action="https://formspree.io/f/mdkdkybe"
          method="POST"
          >

         <div className="contact">
             <div className="input">
                  <input type="text" placeholder='Name' name="Name" value={name} onChange={((e)=>setName(e.target.value))} required/>
                </div>
              
              <div className="input">
                <input type="email" placeholder='Email' name="Email" value={email} onChange={((e)=>setEmail(e.target.value))} required/>
              </div>
                
              <div className="input">
                  <input type="text" placeholder='Subject' name="Subject" value={subject} onChange={((e)=>setSubject(e.target.value))} required/>
              </div>
            

              <div className="submitbox">
            <textarea
              name="Message"
              cols={30}
              rows={10}
              placeholder="Your Message"
              className="textarea"
              value={message}
              onChange={((e)=>setMessage(e.target.value))}
              required
            ></textarea>
          </div>

               {/* <div > */}
                <button type='submit' className="mybtn">Contact  Us</button>
              {/* </div> */}
         </div>
        </form>
      
    </div>
  )
}

export default Support
