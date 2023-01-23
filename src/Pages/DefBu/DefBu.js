import React from 'react'

import {useState,useRef, useEffect} from 'react'
import db from '../../database'
import { getDoc,arrayUnion,doc,updateDoc,setDoc } from 'firebase/firestore'
import NavBar from '../../components/NavBar'
import { useUserAuth } from '../../context/UserAuthContext'
import { Alert } from '@mui/material';
export default function DefBu() {
    const [comp, setComp] = useState('')
    const [comp1, setComp1] = useState('')
    var comps=[]
    const buttonRefpro=useRef()
       const buttonRefpromax=useRef()
    const [choices, setChoises] = useState([])
    const [sucess, setSucess] = useState('')
    const [error,setError]=useState('')
    async function getbu(){
      const docRef = doc(db, "Details", 'bu');
      getDoc(docRef).then((doc)=>{ 
        
    setChoises(doc.data().Bu)
    })}
    async function savebu(e){
      e.preventDefault()
           
        
      try{
        
            
        const ref=doc(db,"Details",'bu')
              await updateDoc(
                ref,{
                  Bu:arrayUnion(`${comp}`)
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
        getbu()
      },[user])
  async function suppbu(){
    comps.push(comp1)  
    let difference = choices
    .filter(x => !comps.includes(x))
    .concat(comps.filter(x => !choices.includes(x)));
    console.log("----->",difference)
    
    try{
      await setDoc(doc(db, "Details", `bu`), {
       Bu: difference
  
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
        <h5>les bu disponible</h5>
        <ul class="list-group list-group-horizontal">
          {compDispo}
</ul>
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">
        
        
<label >bu a ajouter </label>
<input type='text' required   onChange={event => setComp(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={savebu} ref={buttonRefpro} className='btn btn-primary m-3'>save </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">

<label >bu a supprimer</label>
<input type='text' required  onChange={event => setComp1(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={suppbu} ref={buttonRefpromax} className='btn btn-primary m-3'>save </button>
        </div></div>
    </div>
  )
}
