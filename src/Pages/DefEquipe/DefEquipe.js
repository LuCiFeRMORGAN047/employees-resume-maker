import React from 'react'
import NavBar from '../../components/NavBar'

import {useState,useRef, useEffect} from 'react'
import db from '../../database'
import { getDoc,arrayUnion,doc,updateDoc,setDoc } from 'firebase/firestore'

import { useUserAuth } from '../../context/UserAuthContext'
import { Alert } from '@mui/material';

export default function DefEquipe() {
    const [comp, setComp] = useState('')
    const [comp1, setComp1] = useState('')
    var comps=[]
    const buttonRefpro=useRef()
       const buttonRefpromax=useRef()
    const [choices, setChoises] = useState([])
    const [sucess, setSucess] = useState('')
    const [error,setError]=useState('')
    async function getequipe(){
      const docRef = doc(db, "Details", 'equipe');
      getDoc(docRef).then((doc)=>{ 
        
    setChoises(doc.data().Equipe)
    })}
    async function saveequipe(e){
      e.preventDefault()
           
        
      try{
        
            
        const ref=doc(db,"Details",'equipe')
              await updateDoc(
                ref,{
                  Equipe:arrayUnion(`${comp}`)
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
    const {user}=useUserAuth()
    useEffect(()=>{
        getequipe()
      },[user])
  async function suppequipe(){
    comps.push(comp1)  
    let difference = choices
    .filter(x => !comps.includes(x))
    .concat(comps.filter(x => !choices.includes(x)));
    console.log("----->",difference)
    
    try{
      await setDoc(doc(db, "Details", `equipe`), {
       Equipe: difference
  
      });
      buttonRefpromax.current.disabled = true;
        buttonRefpro.current.disabled = true;
      setSucess('supprimé') 
           setError('')
      }catch(err){
        setSucess('')
        setError(err.message)
      }
      
  }
  const compDispo=choices.map(n=>(
    <li class="list-group-item">{n}</li>
  ))
    return (
    <div style={{height:'100%'}}>
    <NavBar/>
    <div className=' saisir '> {sucess &&<Alert severity="success">{sucess}</Alert> }
        {error && <Alert severity="error">{error}</Alert>}
        <h5>les equipe disponible</h5>
        <ul class="list-group list-group-horizontal">
          {compDispo}
</ul>
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">
        
        
<label >equipe a ajouter </label>
<input type='text' required   onChange={event => setComp(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={saveequipe} ref={buttonRefpro} className='btn btn-primary m-3'>save </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">

<label >Equipe a supprimer</label>
<input type='text' required  onChange={event => setComp1(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={suppequipe} ref={buttonRefpromax} className='btn btn-primary m-3'>save </button>
        </div></div>
</div>
  )
}
