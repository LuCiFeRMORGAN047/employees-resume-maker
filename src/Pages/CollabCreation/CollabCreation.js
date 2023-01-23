import React from 'react'
import NavBar from '../../components/NavBar'
import emailjs from '@emailjs/browser';
import  { useEffect } from "react";
import { auth } from "../../firebase"
import './collab.css'
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, orderBy, query, setDoc, collection, limit, getDocs, getDoc } from "firebase/firestore";
import { Alert } from '@mui/material';
import db from "../../database";

import { useUserAuth } from '../../context/UserAuthContext'

export default function CollabCreation() {  
  
  const [nom, setNom] = useState('')
  const [lastid, setlastId] = useState('')
  const { user } = useUserAuth()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')

  const [bu, setBu] = useState('one')
  const [eq, setEq] = useState('one')
  const [rolle, setRolle] = useState('one')
  const [value, setValue] = useState('');
  const [nbexp, setNbexp] = useState('')
  const [choices, setChoises] = useState([])
  const [choices1, setChoises1] = useState([])
  const [choices2, setChoises2] = useState([])
  const [choices3, setChoises3] = useState([])
  const today = new Date()
 
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const [error, setError] = useState('')
  const [sucess, setSucess] = useState('')
  async function getLastId() {
    const q = query(collection(db, "Utilisateurs"), orderBy('Time', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setlastId(doc.data().Id)

    });
  }
  async function getBu(){
    const docRef = doc(db, "Details", 'bu');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises1(doc.data().Bu)
  })}
  async function getRole(){
    const docRef = doc(db, "Details", 'role');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises2(doc.data().Role)
  })}
  
  async function getEquipe(){
    const docRef = doc(db, "Details", 'equipe');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises3(doc.data().Equipe)
  })}
  //get profiles 
  async function getProfiles(){
    const docRef = doc(db, "Details", 'profiles');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises(doc.data().Profiles)
  })}
  // getting infos from the firestore when the page loads
  useEffect(() => {
    getLastId();
    getProfiles();
    getBu();
    getRole();
    getEquipe();
  }, [user])
 
 const rndPass= Math.random().toString(36).slice(2, 10)
 // sending mail to the new user
function sendEmail() {
    
    var templateparams={
      username:`${nom+' '+ prenom}`,
      email: `${email}`,
      password: `${rndPass}`
    }
  emailjs.send('service_z6u4aon', 'template_zgsbrnl', templateparams,'JtmHnHE0gxvBOHYFO')
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });
   ;
  };
  const copy = lastid.slice(2)
  const newid = `ID${parseInt(copy) + 1}`
 
  function countString(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '/') {
            count += 1;
        }
    }
    return count;
}
const result = countString(value);
//creaction du collab
  async function handleSs(e) {
    e.preventDefault()
    if (prenom === '') {
      setError('saisir votre prenom')
      setSucess('')
    } else if (nom === '') {
      setError('saisir votre nom')
      setSucess('')
    } else if (bu === 'one') {
      setError('choisir un bu')
      setSucess('')
    }else if (value === '' || result!==2) {
      setError('donner le date d integration ')
      setSucess('')
    }else if (eq === 'one') {
      setError('choisir un Equipe')
      setSucess('')
    } else if (email === '') {
      setError('donner email')
      setSucess('')
    }else if (nbexp === '') {
      setError('donner annee d experience')
      setSucess('')
    }else if (rolle === 'one') {
      setError('choisir un role')
      setSucess('')
    }
    else  {
      const today1 = new Date()
      const date1 = today1.getFullYear()
      const ig=value.slice(6)
      console.log(ig)
      console.log(nbexp)
      const Exp= parseInt(date1) - parseInt(ig)+parseInt(nbexp)
      console.log(Exp)
      try {
        await setDoc(doc(db, "Utilisateurs", `${email}`), {
          Id: `${newid}`,
          Nom: `${nom}`,
          Prenom: `${prenom}`,
          competences: [],
          equipe:`${eq}`,
          Bu: `${bu}`,
          role: `${rolle}`,
          Time: `${date}`,
          email: `${email}`,
          NbExp: `${nbexp}`,
          Tnb:`${Exp}`,
          DateIg: `${value}`
        });
        await createUserWithEmailAndPassword(auth,email, `${rndPass}`)
        sendEmail()
        setError('')
        setSucess('profile saved')
        
      } catch (err) {
        setError(err.message)
        setSucess('')
      }
    }

  }
 

const choice1=choices1.map(n=>(
  <option value={`${n}`}>{n}</option>
)) 
const choice2=choices2.map(n=>(
  <option value={`${n}`}>{n}</option>
)) 
const choice3=choices3.map(n=>(
  <option value={`${n}`}>{n}</option>
)) 
    
    return (
    <div style={{height:'100%'}}><NavBar/>
  <div style={{height:'100%'}}><form  onSubmit={handleSs}>
        <div className="saisir ">
          <div><h1>saisie fiche utilisateur</h1></div>
          {error && <Alert severity="error">{error}</Alert>}
          {sucess && <Alert severity="success">{sucess}</Alert>}
          <fieldset >
            <div className="form-group inputs">
              <label >ID</label>
              <input type='text' disabled value={newid} className="form-control"  ></input>
            </div>
            <div className="form-group inputs" name="user_name">
              <label >nom</label>
              <input type='text' onChange={event => setNom(event.target.value)} className="form-control"  ></input>
            </div>
            <div className="form-group inputs">
              <label >Pérnom</label>
              <input type='text' onChange={event => setPrenom(event.target.value)} className="form-control"    ></input>
            </div>
            <div className="form-group inputs">
              <label >email</label>
              <input  name="user_email" type='text' onChange={event => setEmail(event.target.value)}  className="form-control"    ></input>
            </div>
            <div className="form-group inputs">
              <label >date d'integration chez wevioo</label>
              <input type='text' onChange={event => setValue(event.target.value)} className="form-control" placeholder='DD/MM/YYYY'   ></input>
            </div>
            <div className="form-group inputs">
              <label >nombre d'experience quand intgré chez wevioo</label>
              <input type='text' onChange={event => setNbexp(event.target.value)} className="form-control"    ></input>
            </div>
          </fieldset>

          
          <div className="sel">
            <label > Bu</label>
            <select defaultValue='one' className="prof form-select" aria-label="Default select example" onChange={(e) => {
              const SelectOption = (e.target.value)
              setBu(SelectOption)
            }}>
              <option value='one' >Open this select menu</option>
              {choice1}
            </select>

          </div>
          <div className="sel">
            <label > role</label>
            <select defaultValue='one' className="prof form-select" aria-label="Default select example" onChange={(e) => {
              const SelectOption = (e.target.value)
              setRolle(SelectOption)
            }}>
              <option value='one' >Open this select menu</option>
              {choice2}
            </select>

          </div>
          <div className="sel">
            <label > équipe</label>
            <select defaultValue='one' className="prof form-select" aria-label="Default select example" onChange={(e) => {
              const SelectOption = (e.target.value)
              setEq(SelectOption)
            }}>
              <option value='one' >Open this select menu</option>
              {choice3}
            </select>

          </div>
          <div className="save"><button type="submit"  className="btn btn-outline-primary justify-content-center align-items-center">save</button></div>

        </div>
      </form></div>
  </div>
  )
}
