import React ,{useEffect, useState}from 'react'
import { getAuth, updateEmail , updatePassword} from "firebase/auth";
import { getDoc, doc,deleteDoc,setDoc } from 'firebase/firestore';
import { useUserAuth } from '../../context/UserAuthContext'
import { Alert } from '@mui/material';
import './update.css'
import db from '../../database'
import CollabNav from '../../components/CollabNav';
export default function UpdateProfile() {
  const [email, setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error, setError]=useState('')
  const [data,setData]=useState({})
  const {user}=useUserAuth()
  const [sucess, setSucess] = useState('')
  const auth = getAuth();
  
  async function Data(){
    const docRef = doc(db, "Utilisateurs", `${user.email}`);
  const docSnap = await getDoc(docRef);
  setData(docSnap.data())
  }
  useEffect(()=>{
    Data();

  },[])

  async function handleUpdateEmail(){
    try {
      await setDoc(doc(db, "Utilisateurs", `${email}`), {
        Id: `${data.Id}`,
        Nom: `${data.Nom}`,
        Prenom: `${data.Prenom}`,
        competences: data.competences,
        profil: `${data.profil}`,
        role: `${data.role}`,
        Time: `${data.Time}`,
        email: `${email}`
  
      })
      await deleteDoc(doc(db, "Utilisateurs", `${data.email}`));
      
updateEmail(auth.currentUser, `${email}`)
    
   


      setSucess('email has been updated ')
      setError('')
    }catch(error) {
      setSucess('')
      setError(error.message)
      console.log(error.message)
    }
  }
async function handleUpdatePassword(){
  try{
    const user = auth.currentUser;
    
    
   await updatePassword(user, password)
   setSucess('password has been updated')
  }catch(error){
    setError(error.message)
  }
}
  return (
    <div style={{height:'100%'}}><div><CollabNav/>
    </div>
    <div className='update' style={{height:'100%'}}>
    {error && <Alert severity="error">{error}</Alert>}
    {sucess && <Alert severity="success">{sucess}</Alert>}
    <div> 
      <fieldset>
        <div className="form-group inputs">
      <label >email</label>
      <input  type='text' id="Id" className="form-control" onChange={event => setEmail(event.target.value)}   ></input>
      
    </div>
    <div className='p-3 d-flex justify-content-center align-items-center'><button  onClick={handleUpdateEmail}  type="submit"    className="btn btn-outline-primary justify-content-center align-items-center">Update Email</button></div>
    
        </fieldset>
        <fieldset>
        <div className="form-group inputs">
      <label  >Mot de passe</label>
      <input  type='password' id="nom" className="form-control" onChange={event => setPassword(event.target.value)}   ></input>
    </div>
    <div className='p-3 d-flex justify-content-center align-items-center'><button  onClick={handleUpdatePassword}   type="submit"    className="btn btn-outline-primary justify-content-center align-items-center">Update Password</button></div>
        </fieldset>
        </div>
    <div>
      
    </div>
    </div>
    
    </div>
    
  )
}
