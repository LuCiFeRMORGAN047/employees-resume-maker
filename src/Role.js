import React, { useState , useEffect} from 'react'
import Home from './Pages/Homee/Home'
import { useNavigate } from 'react-router'

import { useUserAuth } from './context/UserAuthContext'
import { doc ,getDoc } from 'firebase/firestore';
import db from './database';

export default function Role() {
const  {user}=useUserAuth()
const navigate=useNavigate()
const [rol,setRol]=useState()
async function role(){
    const docRef = doc(db, "Utilisateurs", `${user.email}`);
  const docSnap = await getDoc(docRef);
  setRol(docSnap.data().role)
  }
  useEffect(()=>{
    role()
  },[])
  if(rol==='admin'){return (
    navigate('/admin/collab-creation')
  )}else{ return( 
    <Home/>
  )
   
  }
  }
    


