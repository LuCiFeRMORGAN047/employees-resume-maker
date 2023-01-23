import React from 'react'
import Sig from './Pages/Signup/signup'
import Login from './Pages/login/login'
import SaisieF from './Pages/saisief/SaisieF'
import ProtectedRoute from './ProtectedRoute'
import {  Routes, Route } from "react-router-dom"
import { UserAuthContextProvider } from './context/UserAuthContext'

import SaisieC from './Pages/saisiec/SaisieC'
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile'

import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import Role from './Role'
import DefProf from './Pages/DefProf/DefProf'
import DefComp from './Pages/DefComp/DefComp'
import CollabCreation from './Pages/CollabCreation/CollabCreation'
import DefBu from './Pages/DefBu/DefBu'
import DefEquipe from './Pages/DefEquipe/DefEquipe'
import NoteAdmin from './Pages/NoteAdmin/NoteAdmin'
import FeelFree from './Pages/Notes/FeelFree'
import Admin from './Pages/Admin/Admin'
import Home from './Pages/Homee/Home'
import Dashborad from './Pages/Dashbord/Dashboard'

export default function App () {
  
 
 
  return (
    
      <UserAuthContextProvider>
        <Routes>
          
          <Route path='/admin/profile-creation' element={<ProtectedRoute><DefProf/></ProtectedRoute>}></Route>
          <Route path='/collab' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='/admin/note-creation' element={<ProtectedRoute><NoteAdmin/></ProtectedRoute>}></Route>
          <Route path='/feel-free' element={<ProtectedRoute><FeelFree/></ProtectedRoute>}></Route>
          <Route path='/admin/bu-creation' element={<ProtectedRoute><DefBu/></ProtectedRoute>}></Route>
          <Route path='/admin/equipe-creation' element={<ProtectedRoute><DefEquipe/></ProtectedRoute>}></Route>
          <Route path='/admin/comp-creation' element={<ProtectedRoute><DefComp/></ProtectedRoute>}></Route>
          <Route path='/admin/collab-creation' element={<ProtectedRoute><CollabCreation/></ProtectedRoute>}></Route>
          <Route path='/Update-profile' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}></Route>
          <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route>
          
        <Route path='/home' element={<ProtectedRoute><Role/>
        </ProtectedRoute>
      }></Route>
      <Route path='/saisiefiche' element={<ProtectedRoute><SaisieF/></ProtectedRoute>}></Route>
      <Route path='/forget-password' element={<ForgetPassword/>}></Route>
        <Route path='/saisiecompetences' element={<SaisieC/>}></Route>
        <Route path='/signup' element={<Sig />}></Route>
        <Route path='/' element={<Login/>}></Route>
        </Routes>
        </UserAuthContextProvider>

      
   
    
  )
}

