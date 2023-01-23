
import React, { useRef, useState } from 'react'
import wevioo from '../../wevioo.png'
import { Link } from 'react-router-dom'
import {sendPasswordResetEmail , getAuth} from 'firebase/auth'

export default function ForgetPassword() {
   const email=useRef('')
   const auth=getAuth()
   const [error,setError]=useState('')
      async function handleReset(e){
        e.preventDefault()
    try{
        await sendPasswordResetEmail(auth,email.current.value)
        setError('email verifcation sent ')
    }catch(err){
        setError(err.message)
    }
   }
   
   
   
   
   
   
   
   
   
    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded bg-transparent signup container flex-column justify-content-center'>
            <div className='flex-column justify-content-center'>
            
            <div className='logo'>
        <img src={wevioo} alt='logo'></img>
        </div>
        <div>{error}</div>
        <div>
        <fieldset>
            <div className="form-group inputs">
          <label >email</label>
          <input  type='text' id="Id" className="form-control" ref={email}   ></input>
          
    </div>
        
            </fieldset>
            
            <div className='container d-flex  justify-content-center sub'>
    <button   type="submit" onClick={handleReset}    className="btn btn-outline-primary justify-content-center align-items-center">Rest Password</button>
    </div>
    <div className='conatiner  d-flex flex-column align-items-center justify-content-center'>
    
   
    <p> click here to   <Link to={"/"}> Login</Link> </p>
    </div>
    
        </div>
        </div>
        </div>
      )
}
