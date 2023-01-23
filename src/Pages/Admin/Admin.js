import React, { useState , useEffect , useMemo} from 'react'
import './admin.css'
import { useUserAuth } from '../../context/UserAuthContext'
import Card from '../Card/Card'
import db from '../../database'
import { collection, getDocs } from "firebase/firestore";
import { doc,getDoc  } from 'firebase/firestore'
import NavBar from '../../components/NavBar'


export default function Admin() {
  const [choices, setChoises] = useState([])
  const [select, setSelect] = useState([])
  const [Profiles, setProfiles] = useState([])
  const {user} = useUserAuth()
  const [emp,setEmp]=useState([])
  useEffect(()=>{
    getbu();
    getProfile();
   
    getEquipe();
    getMarker();
  },[user])

const DataBu=choices.map(doc=>(
  <option value={doc} >{doc}</option>
))
const DataEquipe=select.map(doc=>(
  <option value={doc} >{doc}</option>
))
const DataProfile=Profiles.map(doc=>(
  <option value={doc} >{doc}</option>
))

    //get all the users
    async function getMarker() {
      const snapshot = await getDocs(collection(db, "Utilisateurs"));
     let mvp=[]
      snapshot.docs.map(doc=>(  mvp.push(doc.data()) ))
    setEmp(mvp)
  }
  const [selectedCategory, setSelectedCategory] = useState();
  //filltring the results
  function getFilteredList() {
    
    if (!selectedCategory) {
      return emp;
    }else if(select.indexOf(selectedCategory)!==-1){ 
      return emp.filter((item) => item.equipe === selectedCategory)
    }else if(Profiles.indexOf(selectedCategory)!==-1){ 
      return emp.filter((item) => item.profile === selectedCategory)
    }
    else {
      return emp.filter((item) => item.Bu === selectedCategory)
    }
   
  }
  var filteredList = useMemo(getFilteredList, [selectedCategory, emp]);
  // handle the selected category 
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  // get all the bu from firestore
  async function getbu(){
    const docRef = doc(db, "Details", 'bu');
    getDoc(docRef).then((doc)=>{ 
      
  setChoises(doc.data().Bu)
  })}
  // get all the profoiles from firestore
  async function getProfile(){
    const docRef = doc(db, "Details", 'profiles');
    getDoc(docRef).then((doc)=>{ 
      
  setProfiles(doc.data().Profiles)
  })}
    // get all the equipes from firestore
  async function getEquipe(){
    const docRef = doc(db, "Details", 'equipe');
    getDoc(docRef).then((doc)=>{ 
      
  setSelect(doc.data().Equipe)
  })}
  
  
  console.log(emp)
  // returing the result of the users as a div 
const list=filteredList.map(doc=>{
  return <Card id={doc.Id} nom={doc.Nom} nb={doc.Tnb} profil={doc.profile} prenom={doc.Prenom} bu={doc.Bu} equipe={doc.equipe} competences={doc.competences}   email={doc.email} />
})
  return (
    <div className='admindash'>
<NavBar/>
<div className='content1'>
  <div className="filter-container">
        <div className='filteroption'>
          <div>Filter by Bu:</div>
        <div>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {DataBu}
            {DataEquipe}
            {DataProfile}
            
          </select>
          
        </div></div>
        
       
        
      </div>

<div className="filter">
        {list}
      </div></div>

    </div>
  )



  
  
  
}
