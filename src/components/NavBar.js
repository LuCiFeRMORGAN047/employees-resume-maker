import { Navbar,  Link, Text,  Dropdown , Avatar } from "@nextui-org/react";
import React from "react";
import wevioo from '../wevioo.png'
import { useUserAuth } from '../context/UserAuthContext'

export default function NavBar() {
    const collapseItems = [
        {nom:'créer une fiche d utilisateur',link:'/admin/collab-creation'},
        {nom:'list des Cvs',link:'/admin'},
        {nom:'Définition des profiles',link:'/admin/profile-creation'},
        {nom:'Définition des competences',link:'/admin/comp-creation'},
        {nom:'Définition des Bu',link:'/admin/bu-creation'},
        {nom:'Définition des Equipe ',link:'/admin/equipe-creation'},
        {nom:'Notes',link:'/admin/note-creation'},
      ];
    
      const { logOut , user } = useUserAuth()
      async function handleLogOut() {
          try {
            await logOut();
          } catch (err) {
            console.log(err.message)
          }
        }
      return (
        
          <Navbar  maxWidth='fluid' isBordered variant="sticky">
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
              css={{
                "@xs": {
                  w: "10%",
                },
              }}
            >
              <img src={wevioo} ></img>
              
            </Navbar.Brand>
            <Navbar.Content
              enableCursorHighlight
              activeColor="secondary"
              hideIn="xs"
              variant="highlight"
            >
                
              <Navbar.Link isActive href='/admin/collab-creation'>créer une fiche d'utilisateur </Navbar.Link>
              <Navbar.Link href='/admin'>list des Cvs</Navbar.Link>
              <Navbar.Link href='/admin/profile-creation'>Définition des profiles  </Navbar.Link>
              <Navbar.Link href='/admin/comp-creation'>Définition des competences </Navbar.Link>
              <Navbar.Link href="/admin/bu-creation">Définition des Bu </Navbar.Link>
              <Navbar.Link href="/admin/equipe-creation">Définition des Equipe  </Navbar.Link>
              <Navbar.Link href="/admin/note-creation"> Notes</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content
              css={{
                "@xs": {
                  w: "12%",
                  jc: "flex-end",
                },
              }}
            >
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Avatar
                      bordered
                      as="button"
                      color="secondary"
                      size="md"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  color="warning"
                  onAction={(actionKey) => console.log({ actionKey })}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                     {user.email}
                    </Text>
                  </Dropdown.Item>
                  
                  <Dropdown.Item  key="logout" withDivider color="error">
                  <span onClick={handleLogOut}>Log Out</span>  
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
            <Navbar.Collapse disableAnimation>
              {collapseItems.map(element => (
                <Navbar.CollapseItem
                  key={element.nom}
                  isActive
                 
                  
                >
                  <Link
                    color="inherit"
                    css={{
                      minWidth: "100%",
                    }}
                    href={element.link}
                  >
                    {element.nom}
                  </Link>
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
          </Navbar>
        
      );
    }