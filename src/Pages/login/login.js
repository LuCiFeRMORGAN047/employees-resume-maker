import React from 'react'
import { Alert } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom'
import '../Signup/signup.css'
import { useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import wevioo from '../../wevioo.png'
import PasswordInput from '../../components/PasswordInput';
import { Input  } from '@nextui-org/react';
import { Button } from "@nextui-org/react";


function Login() {
  const [email, setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const {logIn} = useUserAuth()
  const navigate = useNavigate()
 
  
  
  
  
  
  async function handleSubmit(e){
     e.preventDefault()
   
     try{
      
 
    await logIn(email,password)
    navigate('/home')

      
     } catch(err){
      setError(err.message)
     }
   
  }
 
    return (
    <div className='shadow-lg p-3 mb-5 bg-white rounded bg-transparent signup container flex-column justify-content-center'>
        <div className='flex-column justify-content-center'>
        
        <div className='logo'>
    
   <a href='https://www.wevioo.com/fr' target='_blank'><img src={wevioo} alt='logo'></img></a> 
    </div>
    {error && <Alert severity='error'>{error}</Alert>}
    <form onSubmit={handleSubmit}>
    <fieldset>
        <div className="form-group inputs">
     
        <Input labelPlaceholder="Email"  size='lg'  onChange={event => setEmail(event.target.value)}  className="form-control"/>
      
    </div>
    <div className="form-group inputs">
     
      <PasswordInput    onChange={event => setPassword(event.target.value)}/>
    </div>
    
        </fieldset>
        
        <div className='container d-flex  justify-content-center sub'>
        <Button type='submit'  shadow color="primary" auto>
         Login
        </Button>
</div>
<div className='conatiner  d-flex flex-column align-items-center justify-content-center'>
<div> <p><Link to='/forget-password'>mot de passe oublié?</Link></p></div>
<br></br>
<p> click ici   <Link to={"/signup"}> créer un compte</Link> </p>
</div>

    </form>
    </div>
    </div>
  )
}

export default Login;