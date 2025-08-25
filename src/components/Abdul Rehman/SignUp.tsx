import React from 'react';
import './mystyles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp:React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword ] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigation = useNavigate();

  const mySubmission = (e:React.FormEvent) =>{
    e.preventDefault();

    if(password.length!=8)
    {
      alert("Password and confirm password should be length 8!");

    }

    else if(password!=confirmPassword)
    {
      alert("Password and confirm password should be same!")
    }

    else
    {
      console.log("Name: " + name + " Email: " + email + " Pass: " + password + " conpass: " + confirmPassword);
      navigation('/login');
    }
   
  }
  return (
    <div>
      
      <form action=""
      onSubmit={mySubmission}>
        {/* <div className='heading'>
          
        </div> */}
        
        <div className="maindiv">
          
            <h2 className='heading'>Register Now</h2>
                <div className="input">
                  <input type="text" placeholder='Name' value={name} onChange={((e)=>setName(e.target.value))}/>
                </div>
              
              <div className="input">
                <input type="email" placeholder='Email' value={email} onChange={((e)=>setEmail(e.target.value))}/>
              </div>
                
              <div className="input">
                  <input type="password" placeholder='Password' value={password} onChange={((e)=>setPassword(e.target.value))}/>
              </div>
              
              <div className="input">
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={((e)=>setConfirmPassword(e.target.value))}/>
              </div>

               {/* <div > */}
                <button type='submit' className="mybtn"> Sign Up</button>
              {/* </div> */}

            </div>
      </form>
    </div>
  )
}

export default SignUp
