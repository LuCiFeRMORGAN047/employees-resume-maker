import React, { useState} from 'react'
import './signup.css'
import { Alert } from '@mui/material';
import wevioo from '../../wevioo.png'
import { Button , Input} from '@nextui-org/react';
import PasswordInput from '../../components/PasswordInput';
import { Link , useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'


export default function Sig () { 
    const [email, setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
 
  const {signUp} = useUserAuth()
  const navigate = useNavigate()

  





  
  async function handleSubmit(e){
     e.preventDefault()
     
     try{
    await signUp(email,password)
      navigate('/')

     } catch(err){
      setError(err.message)
     }
     
  }
  

 


  
   
    return (
    <div className=' shadow-lg p-3 mb-5 bg-white rounded bg-transparent signup container flex-column justify-content-center'>
        
            <div className='logo'>
            <a href='https://www.wevioo.com/fr' target='_blank'><img src={wevioo} alt='logo'></img></a> 
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} >
        <fieldset >
            <div className="form-group inputs">
      
      <Input labelPlaceholder="Email"  size='lg'  onChange={event => setEmail(event.target.value)}  className="form-control"/>
    </div>
<div className="form-group inputs">
     
      <PasswordInput    onChange={event => setPassword(event.target.value)}/>
    </div>
</fieldset>



        
       
<div className='container d-flex justify-content-center sub'>
<Button type='submit'  shadow color="primary" auto>
         sign up
        </Button>
</div>
 
<div className='conatiner  d-flex justify-content-center'>
<p> vous avez deja un compte? <Link to={'/'}>Sign in</Link>  </p>
</div>
</form>
        
    </div>
  )
}
