import React from 'react'
import { useRef } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { loginCall, signUp } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import './auth.css'

export default function Auth() {
  const email = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const password = useRef();
  const confirmpass = useRef();

  const {isFetching, dispatch} = useContext(AuthContext);

  const [isSignUp, setIsSignUp] = useState(true)

    //reset data
    const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpass: '',
  };

  const [data, setData] = useState(initialState)

  //handle change
  const handleChange = (e) => {
    e.preventDefault()
    setData({...data, [e.target.name] : e.target.value})
  }
  

      //confirm password
  const [confirmPass, setConfirmPass] = useState(true)

    //reset data
    const resetForm = () => {
    setConfirmPass(confirmPass);
    setData(initialState);
  }

  //submit data
 const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? signUp(data, dispatch)
        : setConfirmPass(false);
    } else {
      loginCall(data, dispatch)
    }

  } 


  return (
    <div className='auth'>
      <div className="leftside">
        <h1>SOSO-APP</h1>
        <h4>Connect WorldWide</h4>
      </div>
      <div className="riteside">
        <form className='inform' onSubmit={handleSubmit}>
            {isSignUp && (
            <div>
              <input type='text' 
              ref={firstname}
              placeholder='First Name'
              className='info'
              name='firstname'
              onChange={handleChange} 
              />
              <input type='text'
              ref={lastname}
              placeholder='Last Name' 
              className='info'
              name='lastname' 
              onChange={handleChange} 
              
              />
            </div>
              )}

            <div>
              <input type='email'
              ref={email}
              placeholder='E-mail' 
              className='info'
              name='email' 
              onChange={handleChange} 
              
              />      
            </div>

            <div>
              <input type='password'
              ref={password}
              placeholder='Password' 
              className='info'
              name='password' 
              onChange={handleChange} 
              
              />
              {isSignUp && (
              <input type='password' 
              ref={confirmpass}
              placeholder='Confirm password' 
              className='info'
              name='confirmpass' 
              onChange={handleChange} 
              
              />
              )}
            </div>

            <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              //display: confirmPass ? "none" : "block",
            }}
             >
              *Confirm password is not same
            </span>


            <div>
                <span style={{fontSize: '12px', cursor: 'pointer', color: 'orange'}} 
                onClick={()=>{
                resetForm(); 
                setIsSignUp((prev)=>!prev)}}
                >

                {isSignUp ? 'Already have an account. Login!' : 'Dont have an account. SignUp'}               
                </span>
            </div>

            <button className='button infoButton' type='submit'>
               {isFetching ? 'Loading' : 
                isSignUp ? 'SignUp' : 'Login'
               }
            </button>
            
        </form>
      </div>
    </div>
  )
}
