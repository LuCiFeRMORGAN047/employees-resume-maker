import { useState } from 'react'
import {  addDoc, collection } from 'firebase/firestore'
import React from 'react'
import db from '../../database'

import './FeelFree.css'
import CollabNav from '../../components/CollabNav'
export default function FeelFree() {
  const [email, setEmail]=useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [message, setMessage] = useState('')
 //save the message for admin
  async function handleSubmit(e){
 e.preventDefault()
  try{
    const docRef=collection(db,"Notes")
    await addDoc(docRef, {
      Nom:`${nom}`,
      Prenom:`${prenom}`,
      email:`${email}`,
      message:`${message}`
    });
  }catch(err){
    console.log(err.message)

  }
 }
  return (
    <div className='note' style={{height:'100%'}}>
        <CollabNav/>
        <form class="cf" onSubmit={handleSubmit}>
  <div class="half left cf">
    <input type="text" id="input-name" onChange={event => setNom(event.target.value)}  placeholder="nom"></input>
    <input type="text" id="input-name" onChange={event => setPrenom(event.target.value)}  placeholder="prenom"></input>
    <input type="email" id="input-email" onChange={event => setEmail(event.target.value)} placeholder="Email address"></input>
    
  </div>
  <div class="half right cf">
    <textarea name="message" type="text" id="input-message" onChange={event => setMessage(event.target.value)} placeholder="Message"></textarea>
  </div>  
  <input  type="submit" value="Submit" id="input-submit"></input>
  
</form>

    </div>
  )
}
