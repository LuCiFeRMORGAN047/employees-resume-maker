import React, { useRef,useEffect } from 'react'
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext'
import db from '../../database';
import {  arrayUnion, doc ,updateDoc,getDoc } from "firebase/firestore"; 
import { Alert } from '@mui/material';
import './saisie.css'
import CollabNav from '../../components/CollabNav';



export default function SaisieC() {
  
  const buttonRef=useRef()
  const buttonReff=useRef()
  const {user}=useUserAuth()
const [error,setError]=useState('')
const [sucess, setSucess] = useState('')
  const [select, setSelect] = useState('')
  const [select1, setSelect1] = useState('')
  var sel=[]
  const [choices, setChoises] = useState([])
  
  const [usercomps, setUsercomps] = useState([])
  // avoir les competences disponible
  async function getComps(){
    const docRef = doc(db, "Details", 'competences');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises(doc.data().Competences)
  })}
//supprimer user comp
  async function suppusercom(){
    sel.push(select1)  
    let difference = usercomps
    .filter(x => !sel.includes(x))
    .concat(sel.filter(x => !usercomps.includes(x)));
    console.log("----->",difference)
    
    try{
      await updateDoc(doc(db, "Utilisateurs", `${user.email}`), {
      
      competences: difference

      });
      setSucess('supprimé') 
           setError('')
      }catch(err){
        setSucess('')
        setError(err.message)
      }
      
  }
  //get user competences
  async function getUsercomps(){
    const docRef = doc(db, "Utilisateurs", `${user.email}`);
    getDoc(docRef).then((doc)=>{ 
      
  setUsercomps(doc.data().competences)
  })}
  useEffect(() => {
    getUsercomps();
    
  },[sel])
  
  useEffect(() => {
    getComps();
  }, [user])
//ajouter une competence
  async function ajouter(e){
    e.preventDefault()
         
      
    try{
      
          
      const ref=doc(db,"Utilisateurs",`${user.email}`)
            await updateDoc(
              ref,{
                competences:arrayUnion(`${select}`)
              }


            )
           setSucess('ajoutée')
           setError('')
    } catch(err){
    setError(err.message)
    setSucess('')
    }
    
  }
  //maping through the competences array
  const choice=choices.map(n=>(
    <option value={`${n}`}>{n}</option>
  ))
  //maping through the  user competences array 
  const usercomp=usercomps.map(n=>(
    <li class="list-group-item">{n}</li>
  ))
  //maping through the  user competences array for the select options 
  const usercom=usercomps.map(n=>(
    <option value={`${n}`}>{n}</option>
  ))
    return (
  <div style={{height:'100%'}}><CollabNav/>
  <div className="App r" autoComplete="off" style={{height:'100%'}}    >
      
      <div className="form-field">
      
        <h1>Saisie comptences</h1>
        {sucess &&<Alert severity="success">{sucess}</Alert> }
        {error && <Alert severity="error">{error}</Alert>}
        <h5>votre competences</h5>
        <ul class="list-group list-group-horizontal">
  
  {usercomp}
</ul>
        <div className="sel">
            <label > comptences a ajouter</label>
            <select defaultValue='one' className="prof form-select" aria-label="Default select example" onChange={(e) => {
              const SelectOption = (e.target.value)
              setSelect(SelectOption)
            }}>
              
              <option value='one' >Open this select menu</option>
              {choice}
            </select>
            <button  onClick={ajouter} type='submit' ref={buttonRef} className="save btn btn-primary m-3">ajouter comptences</button>
          </div>
          
          
          <div className="sel">
            <label > comptences a supprimer</label>
            <select defaultValue='one' className="prof form-select" aria-label="Default select example" onChange={(e) => {
              const SelectOption = (e.target.value)
              setSelect1(SelectOption)
            }}>
              
              <option  value='one' >Open this select menu</option>
              {usercom}
            </select>
            <button onClick={suppusercom} type='submit' ref={buttonReff} className="save btn btn-primary m-3">supprimer competences</button>
          </div>
      </div>
      
    </div></div>
  
      



  
    

  )
}
