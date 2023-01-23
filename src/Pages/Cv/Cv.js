import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import './Cv.css'
import { doc, getDoc  } from "firebase/firestore";
import wevioo from '../../wevioo.png'
import { useUserAuth } from '../../context/UserAuthContext'
import { PDFExport} from '@progress/kendo-react-pdf';
import db from '../../database';

    


export default  function Cv() {
    const {user} = useUserAuth()
    const [local,setLocal]=useState({})
    const [comps,setComps]=useState([])
    const download=useRef(null)
    // download the cv 
    function handleDownload(){
        download.current.save()
    }
   console.log("----->",user.email)
   useEffect(()=>{
    const docRef = doc(db, "Utilisateurs", `${user.email}`);

    
    getDoc(docRef).then((doc)=>{ 
        console.log(doc.data())
    setLocal(doc.data())
    
    setComps(doc.data().competences)
    }
    )
    
    
        
},[user])
    // maping through the comps 
const comp=comps.map(n=>(
    <div>|{n}</div>
)
    )


    
    return (
    
    
   
    <div className='cv' id='cv' style={{height:'100%'}} > 
    
    <PDFExport ref={download} paperSize='A4' >
        <div>
            <div className='header'>
            <div className='logocv'>
                <a href='https://www.wevioo.com/fr' target='_blank'>
                    <img className='logoimg' src={wevioo} alt="logo"></img>
                    </a>
                </div>
            <div className='infos'>
                <h3>{`${local.Prenom}`+' '+ `${local.Nom}`}
                        <br></br>
                        </h3>
                        <h6>{local.email} </h6>
               <h6>{local.profile} </h6>
               <span> année d'experience {local.Tnb}</span>
            </div>
        </div>
        <div>
            <div className='comptences'>
                <div className='seg'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg> competences</div>
          <div className='compts'>{comp}</div>
            </div>
            
            </div> 
        </div>
        
       </PDFExport>
        
        
        <button  type="button" onClick={handleDownload} className="download btn btn-primary">Download</button>
    </div>
   

       
    
  )
}
