import React from 'react'
import { useState, useEffect } from 'react';
import { getDocs , collection } from 'firebase/firestore';

import { Textarea } from "@nextui-org/react";
import { useUserAuth } from '../../context/UserAuthContext';
import db from '../../database';
import NavBar from '../../components/NavBar'
import { Card, Grid, Text } from "@nextui-org/react";
export default function NoteAdmin() {
  const {user}=useUserAuth()
  const [emp,setEmp]=useState([])
  async function getMarker() {
    const snapshot = await getDocs(collection(db, "Notes"));
   let mvp=[]
    snapshot.docs.map(doc=>( mvp.push(doc.data()) ))
  setEmp(mvp)
}
useEffect(() => {
  getMarker();
},[user])
const list =emp.map(doc=>( <Grid xs={3}>
  <Card variant="bordered">
    <Card.Body>
    <Text
        h1
        size={30}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        {doc.Nom +' '+ doc.Prenom}
      </Text><br></br>
      <Text
        h1
        size={20}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        {doc.email}
      </Text><br></br>
      <Textarea
        readOnly
        label="message"
        initialValue={doc.message}
      /><br></br>
    </Card.Body>
  </Card>
</Grid>))
  return (
    <div style={{height:'100%'}}>
        <NavBar/>
        <div className='noteadmin'>
        <Grid.Container gap={2}>
      
      
      {list}
    </Grid.Container>
        </div>
    </div>
  )
}
