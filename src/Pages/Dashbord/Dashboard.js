import React,{useState,useEffect} from 'react'
import db from '../../database'
import { Card } from "@nextui-org/react";
import users from '../../users.png'
import profile from '../../profile.png'
import dep  from '../../dep.png'


import { getDocs,getDoc,doc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import './dashboard.css'

import { useUserAuth } from '../../context/UserAuthContext'
import NavBar from '../../components/NavBar';

export default function Dashborad() {
  const {user}=useUserAuth()
  const [emp,setEmp]=useState([])
  const [notes,setNotes]=useState([])
  const [profiles, setProfiles] = useState([])
  const [choices, setChoises] = useState([]) 
  const [choices1, setChoises1] = useState([]) 
  async function getMarker() {
    const snapshot = await getDocs(collection(db, "Utilisateurs"));
   let mvp=[]
    snapshot.docs.map(doc=>{ mvp.push(doc.data()) })
  setEmp(mvp)
}
let data={}
choices1.map(doc=>data[`${doc}`]=0)

emp.map((doc)=>(data[`${doc.Bu}`]=data[`${doc.Bu}`]+1))
console.log(data)
const datas=choices1.map((doc)=>({name:`${doc}`,Bu:`${data[doc]}`}))
async function getComps(){
  const docRef = doc(db, "Details", 'competences');
  getDoc(docRef).then((doc)=>{ 
    
setChoises(doc.data().Competences)
})}
useEffect(() => {
  getMarker();
  getProfiles();
  getComps();
  getbu();
  getNotes();
},[user])

async function getNotes() {
  const snapshot = await getDocs(collection(db, "Notes"));
 let mvp=[]
  snapshot.docs.map(doc=>{ mvp.push(doc.data()) })
setNotes(mvp)
}
async function getbu(){
  const docRef = doc(db, "Details", 'bu');
  getDoc(docRef).then((doc)=>{ 
    
setChoises1(doc.data().Bu)
})}
async function getProfiles(){
  const docRef = doc(db, "Details", 'profiles');
  getDoc(docRef).then((doc)=>{ 
    
setProfiles(doc.data().Profiles)
})}

  return (
    
      <div style={{height:'100%'}}>
           <nav><NavBar/></nav>
           <div id='dashheader' style={{margin:'1%'}}> 
           
           
      <Card
      isPressable
      isHoverable
      variant="bordered"
      id='dashcard'
      style={{ display:'flex' }}
    >
      <div style={{width:'fit-content'}}>
        <img src={users}></img>
      </div>
      <div style={{fontSize:'45px'} }>{emp.length}</div>
  </Card>
     
      <Card
      isPressable
      isHoverable
      variant="bordered"
      id='dashcard'
      style={{ display:'flex' }}
      
    
    >
      <div style={{width:'fit-content'}}>
        <img src={profile}></img>
</div>
      <div style={{fontSize:'45px'} }>{profiles.length}</div>
        
     
     
  </Card>
      
      <Card
      isPressable
      isHoverable
      variant="bordered"
      id='dashcard'
      style={{ display:'flex' }}
      
    
    >
      <div style={{width:'fit-content'}}>
        <img height='95px' src={dep}></img>
      </div>
      <div style={{fontSize:'45px'} }>{choices1.length}</div>
        
     
     
  </Card>
<div>hey</div>

      </div>
      
 

        </div>
    
  )
}
