import React, { useEffect } from "react";
import { useState } from "react";
import './saisief.css'
import { doc, getDoc ,updateDoc } from "firebase/firestore";
import { useUserAuth } from '../../context/UserAuthContext'
import db from "../../database";
import CollabNav from "../../components/CollabNav";
export default function SaisieF() {
  const {user}=useUserAuth()
  const [choices,setChoices]=useState([])
  const [userData,setUserData]=useState([])
  const [yearExp,setYearExp]=useState('')
  const [select,setSelect]=useState('')
  async function getProfiles(){
    const docRef = doc(db, "Details", 'profiles');
    getDoc(docRef).then((doc)=>{ 
      
  setChoices(doc.data().Profiles)
  })}
  



  async function getUser(){
    const docRef = doc(db, "Utilisateurs", `${user.email}`);
    getDoc(docRef).then((doc)=>{ 
      setYearExp(doc.data().DateIg)
  setUserData(doc.data())
  })}
  async function handleSs(e){
    e.preventDefault()
    try{
      const ref=doc(db,"Utilisateurs",`${user.email}`)
      await updateDoc(
        ref,{
          profile:`${select}`
        }


      )
    }catch(error){
        console.log(error.message)
    }
  }
  useEffect(() => {
    getUser();
    getProfiles();
  }, [user])
  
const choice=choices.map(n=>(
  <option value={`${n}`}>{n}</option>
))

  return (
    <>
      <CollabNav/>
      <form onSubmit={handleSs}>
        <div className="saisir ">
          <div><h1>fiche utilisateur</h1></div>
          
          <fieldset >
            <div className="form-group inputs">
              <label >ID</label>
              <input type='text' value={userData.Id} disabled  className="form-control"  ></input>
            </div>
            <div className="form-group inputs">
              <label >nom</label>
              <input type='text' value={userData.Nom} disabled  className="form-control"  ></input>
            </div>
            <div className="form-group inputs">
              <label >Pérnom</label>
              <input type='text' value={userData.Prenom} disabled   id="password" className="form-control"    ></input>
            </div>
            <div className="form-group inputs">
              <label >Bu</label>
              <input type='text' value={userData.Bu} disabled  className="form-control"  ></input>
            </div>
            <div className="form-group inputs">
              <label >Equipe</label>
              <input type='text' value={userData.equipe} disabled  className="form-control"  ></input>
            </div>
            <div className="form-group inputs">
              <label >année d'experience</label>
              <input type='text' value={userData.Tnb} disabled  className="form-control"  ></input>
            </div>
          </fieldset>

          <div className="sel">
            <label > profil</label>
            <select defaultValue='one' className="prof form-select" aria-label="Default select example" onChange={(e) => {
              const SelectOption = (e.target.value)
              setSelect(SelectOption)
            }}>
              <option value='one' >Open this select menu</option>
              {choice}
            </select>

          </div>
          <div className="save"><button type="submit" className="btn btn-outline-primary justify-content-center align-items-center">save</button></div>

        </div>
      </form>



    </>
  )
}
