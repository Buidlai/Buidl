import React from 'react'
import { Navbar,  Image} from 'react-bootstrap';
import logo from '../assets/logo.svg';

import '../App.css'

function StickyNavbar() {
  return (
    <Navbar fixed className="bg-transparent" style={{width:100+"%"}} expand="lg">
   
      <Navbar.Brand>
        <Image src={logo} width={100} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      
       
      </Navbar.Collapse>
   
  </Navbar>
  
  )
}

export default StickyNavbar;
