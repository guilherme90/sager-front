import React from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Nav,
  Navbar, 
  NavItem
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const MenuTop = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          <FontAwesome name="home" /> Sager
        </Link>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <LinkContainer to="users">
        <NavItem eventKey={1}>
          <FontAwesome name="users" /> Usuários
        </NavItem>
      </LinkContainer>
    </Nav>

    <Nav pullRight>
      <NavItem eventKey={2} href="#">
        <FontAwesome name="user-circle" /> Guilherme
      </NavItem>
      
      <NavItem eventKey={3} href="#">
        <FontAwesome name="lock" /> Sair
      </NavItem>
    </Nav>
  </Navbar>
)

export default MenuTop