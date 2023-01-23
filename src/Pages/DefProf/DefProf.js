import React from 'react'
import NavBar from '../../components/NavBar'
import  { useEffect, useState,useRef } from 'react'

import { useUserAuth } from '../../context/UserAuthContext'

import { doc,  updateDoc, arrayUnion,getDoc } from 'firebase/firestore'
import db from '../../database'
import { Alert } from '@mui/material';
import { setDoc } from 'firebase/firestore'
export default function DefProf() {
    const [sucess, setSucess] = useState('')
    const [error,setError]=useState('')
    
    
    var profs=[]
   
   
     const [profile, setProfile] = useState('')
     const [profile1, setProfile1] = useState('')
     const [profiles, setProfiles] = useState([]) 
     const buttonRefpro=useRef()
     const buttonRefpromax=useRef()
     const { user } = useUserAuth()
    async function saveprof(e){
        e.preventDefault()
             
          
        try{
          
              
          const ref=doc(db,"Details",'profiles')
                await updateDoc(
                  ref,{
                    Profiles:arrayUnion(`${profile}`)
                  }
    
    
                )
                setSucess('ajoutée')
                setError('')
                buttonRefpromax.current.disabled = true;
        buttonRefpro.current.disabled = true;
        } catch(err){
          setSucess('')
          setError(err.message)
        }
        
      }
      
      async function getProfiles(){
        const docRef = doc(db, "Details", 'profiles');
        getDoc(docRef).then((doc)=>{ 
          
      setProfiles(doc.data().Profiles)
      })}
      async function suppprof(){
        profs.push(profile1)  
        if (profiles.includes(profile1)===true){let difference = profiles
        .filter(x => !profs.includes(x))
        .concat(profs.filter(x => !profiles.includes(x)));
        console.log("----->",difference)
        
        try{
          await setDoc(doc(db, "Details", `profiles`), {
           Profiles: difference
    
          });
          setSucess('supprimé') 
               setError('')
                  buttonRefpromax.current.disabled = true;
                  buttonRefpro.current.disabled = true;
          }catch(err){
            setSucess('')
            setError(err.message)
          }} else{
            setError('the profile dosent exist')
          }
        
          
      }
      useEffect(()=>{
        
        getProfiles();
        
      },[user])
      const profil=profiles.map(n=>(
        <li class="list-group-item">{n}</li>
      ))
    return (
    <div style={{height:'100%'}}><NavBar/>
    <div className=' saisir '> <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">
        {sucess &&<Alert severity="success">{sucess}</Alert> }
        {error && <Alert severity="error">{error}</Alert>}
        <h5>les profiles disponible</h5>
        <ul class="list-group list-group-horizontal">
  
  {profil}
</ul>
<label >profile a ajouter </label>
<input type='text' required   onChange={event => setProfile(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={saveprof} ref={buttonRefpro} className='btn btn-primary m-3'>save </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">

<label >profile a supprimer</label>
<input type='text' required  onChange={event => setProfile1(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={suppprof} ref={buttonRefpromax} className='btn btn-primary m-3'>save </button>
        </div></div>
   
        </div>
  )
}
