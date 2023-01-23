import { Navbar,  Link, Text,  Dropdown , Avatar } from "@nextui-org/react";
import React from "react";
import wevioo from '../wevioo.png'
import { useUserAuth } from '../context/UserAuthContext'
import { useNavigate } from "react-router";

export default function CollabNav() {
    const collapseItems = [
        {nom:'Home',link:'/home'},
        {nom:'fiche utilisateur',link:'/saisiefiche'},
        {nom:'Saisie Compétences',link:'/saisiecompetences'},
        {nom:'Saisie compétences techniques',link:''},
        {nom:'Saisie Diplôme',link:''},
        {nom:'Saisie Langues ',link:''},
        {nom:'Saisie Expérience',link:''},
        {nom:'Feel free',link:'/feel-free'}
      ];
    const navigate=useNavigate()
      const { logOut , user } = useUserAuth()
      async function handleLogOut() {
          try {
            await logOut();
            navigate('/')
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
                
              <Navbar.Link isActive href='/home'>Home </Navbar.Link>
              <Navbar.Link href='/saisiefiche'>fiche utilisateur</Navbar.Link>
              <Navbar.Link href='/saisiecompetences'> Saisie Compétences </Navbar.Link>
              <Navbar.Link href='#'>Saisie compétences techniques </Navbar.Link>
              <Navbar.Link href="#">Saisie Diplôme </Navbar.Link>
              <Navbar.Link href="#">Saisie Langues  </Navbar.Link>
              <Navbar.Link href="#"> Saisie Expérience</Navbar.Link>
              <Navbar.Link href="/feel-free">Feel free </Navbar.Link>
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
                  <Dropdown.Item  key="logout" withDivider color="">
                  <Link href="/update-profile">Update profile</Link>
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