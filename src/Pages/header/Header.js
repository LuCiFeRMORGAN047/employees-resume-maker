import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import wevioo from '../../wevioo.png'
import { useUserAuth } from '../../context/UserAuthContext'

export default function Header() {
    const { logOut} = useUserAuth()
    const navigate=useNavigate()
    
    async function handleLogOut(){
        try{
                await logOut();
                navigate('/home')
        } catch(err){
            console.log(err.message)

        }
    }
  
  
    return (
    
        <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <div >
    <a href='https://www.wevioo.com/fr' target='_blank'><img  className='hlogo'src={wevioo} alt='logo'></img></a>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="deco menu collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
      <Link to='/home'><li className="nav-item active">
         <span  className="sr-only nav-link">Home</span>
      </li></Link>
      
      <li className="nav-item active"> <Link to={'/saisiefiche'}><span className="sr-only nav-link">fiche utilisateur</span></Link></li>
            <li className="nav-item active"><Link to={'/saisiecompetences'}><span className="sr-only nav-link">Saisie Compétences</span></Link> </li>
            
            <li className="nav-item active"><span className="sr-only nav-link"></span></li>
            <li className="nav-item active"> <span className="sr-only nav-link"></span></li>
            <li className="nav-item active"><span className="sr-only nav-link"></span> </li>
            <li className="nav-item active"><span className="sr-only nav-link"> </span></li>
        <li className="nav-item active"><Link to={'/feel-free'}><span className="sr-only nav-link"></span></Link> </li>
      </ul>
      
       
    </div>
    
    <div   className="iconlogout ">
    
         
     <Link to='/Update-profile'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></Link>     
          
    
      <svg   onClick={handleLogOut} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fillRule='evenodd' d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fillRule='evenodd'd="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
</div>
  </div>
</nav></div>
  )
}
