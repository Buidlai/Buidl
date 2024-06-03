
import React from 'react';
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Form, Row, Button } from "react-bootstrap";

import '../../../src/App.css';



import { Link } from 'react-router-dom';

function Login() {
 

  

  const Sectionstyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    width:'100%',
    paddingBottom:5+'rem',
  };
  const inputheader = {
    color:'#ffffff',
    fontSize:'0.8rem',
  }
  const inputbody = {
    backgroundColor:'#404354',
    color:'#C8C8C8',
    borderColor:'#404354',
    outline: 'none',
    boxShadow: 'none'
  }
  const formdiv = {
    marginTop: '1.2rem',
  }

  return (
    
    <Container fluid className='App' style={{backgroundColor:'#272A38'}}>
      <StickyNavbar />
      <section className='formsection' style={Sectionstyle}>
        <div>
          <h2 style={{ color: "#ffffff", fontSize: 1.8 + "rem" }}>
            <strong>Login as</strong>
          </h2>
          <p style={{ color: "#ffffff", fontSize: 0.8 + "rem" }}>
          Login on Buidl to enjoy the revolutionizing collaboration space
          </p>

          <Form>

    

      <Row>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Email Address/ Username</Form.Label>
          <Form.Control style={inputbody} placeholder="Email address or Username" />
          </Form.Group>
      </Row>

      <Row>
      <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Password</Form.Label>
          <Form.Control style={inputbody} placeholder="Enter Password" />
          </Form.Group>
          <span style={{color:'#ffffff',fontSize:0.8+'rem',marginTop:1+'rem'}}>Forget Password ? <span style={{color:'#EEA20E', textDecoration: 'underline'}}>Reset here,</span>  </span>
      </Row><br/><br/>

      
      <Link to='/setupprofile'>
      <Button  style={{width:100+'%',backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem'}}>Login</Button>
      </Link>
    <br/>
    <span style={{color:'#ffffff',fontSize:0.8+'rem'}}>Don't have an Account ? 
    <Link to= '/'>
      <span style={{color:'#EEA20E', textDecoration: 'underline'}}> Register here,</span> 
      </Link> </span>

    </Form>
        </div>

    
      </section>
    </Container>
  );
}

export default Login;