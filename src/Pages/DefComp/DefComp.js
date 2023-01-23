import React,{useState,useRef, useEffect} from 'react'
import db from '../../database'
import NavBar from '../../components/NavBar'
import { getDoc,arrayUnion,doc,updateDoc,setDoc } from 'firebase/firestore'
import { useUserAuth } from '../../context/UserAuthContext'
import { Alert } from '@mui/material';
export default function DefComp() {
  const {user}=useUserAuth()
  const [comp, setComp] = useState('')
  const [comp1, setComp1] = useState('')
  var comps=[]
  const buttonRefpro=useRef()
     const buttonRefpromax=useRef()
  const [choices, setChoises] = useState([])
  const [sucess, setSucess] = useState('')
  const [error,setError]=useState('')
  async function getComps(){
    const docRef = doc(db, "Details", 'competences');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises(doc.data().Competences)
  })}
  //ajouter un competences pour tous les utilisateurs
  async function savecomp(e){
    e.preventDefault()
         
      
    try{
      
          
      const ref=doc(db,"Details",'competences')
            await updateDoc(
              ref,{
                Competences:arrayUnion(`${comp}`)
              }


            )
            setSucess('ajoutée')
            setError('')
    } catch(err){
      setSucess('')
      setError(err.message)
    }
    
  }
  //ajouter un competences pour tous les utilisateurs
async function suppcomp(){
  comps.push(comp1)  
  let difference = choices
  .filter(x => !comps.includes(x))
  .concat(comps.filter(x => !choices.includes(x)));
  console.log("----->",difference)
  
  try{
    await setDoc(doc(db, "Details", `competences`), {
     Competences: difference

    });
    
    setSucess('supprimé') 
         setError('')
    }catch(err){
      setSucess('')
      setError(err.message)
    }
    
}

//getting actual user role for the protected route  

  // getting comps once the page loads 
useEffect(()=>{
  getComps()
},[user])
//aficher les comps dispo
  const compDispo=choices.map(n=>(
    <li class="list-group-item">{n}</li>
  ))
  return (
    <div style={{height:'100%'}}><NavBar/>
    <div className=' saisir '> {sucess &&<Alert severity="success">{sucess}</Alert> }
        {error && <Alert severity="error">{error}</Alert>}
        <h5>les competences disponible</h5>
        <ul class="list-group list-group-horizontal">
          {compDispo}
</ul>
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">
        
        
<label >Competences a ajouter </label>
<input type='text' required   onChange={event => setComp(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={savecomp} ref={buttonRefpro} className='btn btn-primary m-3'>save </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="form-group modid">

<label >Competences a supprimer</label>
<input type='text' required  onChange={event => setComp1(event.target.value)} className="form-control"  ></input>
</div>
<button onClick={suppcomp} ref={buttonRefpromax} className='btn btn-primary m-3'>save </button>
        </div></div>
    
    
    
    
    </div>
  )
}
