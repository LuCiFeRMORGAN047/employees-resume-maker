import React,{useRef, useState} from 'react'
import wevioo from '../../wevioo.png'
import './card.css'

import { PDFExport} from '@progress/kendo-react-pdf';



export default function Card(props) {
const [down,setDown]=useState(false)

// ref for the section to download
const download=useRef(null) 
//show/hide the cv 
function show(){
       setDown(!down)}
        function Download(){
            download.current.save()
            setDown(false)
        }
       
// check if the user is admin or not 
  if (props.nom==='admin'|| props.nom===undefined){
    return(
        <div></div>
    )
  }else{
     return (
    <div className='card1'>
      <div class="card-container">
        
        <div>
          <h3 id='h3'>{props.nom+' '+ props.prenom}</h3>
        <h6 id='h6'>{props.id}</h6>
        <p id='p'>{props.email}</p>
        <p id='p'> {props.profil}<br/>{props.bu} <br/>{props.equipe} <br/> année d'experience {props.nb}</p></div>
        
        
        {down && <div className='cv ' id='cv'> 
    
    <PDFExport ref={download} paperSize='A4'  >
        <div >
            <div className='header'>
            <div className='logocv'>
                <a href='https://www.wevioo.com/fr' target='_blank'>
                    <img className='logoimg' src={wevioo} alt="logo"></img>
                    </a>
                </div>
            <div className='infos'>
                <h3>{`${props.prenom}`+' '+ `${props.nom}`}
                        <br></br>
                        </h3>
               <h6>{props.profil} </h6>
               <span>année d'experience {props.nb}</span>
            </div>
        </div>
        <div>
            <div className='comptences'>
                <div className='seg' style={{textAlign:'start'}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg> competences</div>
          <div className='compts' style={{textAlign:'start'}}> {props.competences.map(n=>(
            <div>| {n}</div>
          ))} </div>
            </div>
            
            </div> 
        </div>
        
       </PDFExport>
        
       <button  type="button" id='download' onClick={Download} className="download btn btn-primary">download</button>
       
    </div> }
        <button onClick={show} class="primary m-3">
            show Cv
          </button>
          
      </div>
      
        </div>
    
      
      
        
  )
  }    
}
