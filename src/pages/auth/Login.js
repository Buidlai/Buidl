import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Form, Row, Button } from "react-bootstrap";
import { logInUser, getPersonalInfo } from '../../redux/user/userSlice';

import '../../../src/App.css';



import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userStatus.loggedUser);
  const token = useSelector((state) => state.userStatus.token);
  const idUser = useSelector((state) => state.userStatus.userId);
  console.log(idUser);
  const personalInfo = useSelector((state) => state.userStatus.personalInfo !== null);
  console.log(personalInfo);
  const personalInfoLoading = useSelector((state) => state.userStatus.personalInfoLoading);
  console.log(personalInfoLoading);

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = { username, password };
    await dispatch(logInUser(userData));
    if (loggedUser && token) {
      dispatch(getPersonalInfo(idUser));
    }
  }

  useEffect(() => {
    if (loggedUser && personalInfo && !personalInfoLoading) {
      navigate('/maindashboard');
    } else if (loggedUser && !personalInfoLoading) {
      navigate('/setupprofile');
    }
  }, [loggedUser, personalInfo, personalInfoLoading, navigate]);

  // localStorage.clear();
  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   const userData = { username, password };
  //   dispatch(logInUser(userData));
  // }


  // useEffect(() => {
  //   if (loggedUser && token && !personalInfo) {
  //     dispatch(getPersonalInfo(idUser));
  //   }
  // }, [loggedUser, token, idUser, personalInfo, dispatch]);

  // const realPersonInfo = useSelector((state) => state.userStatus.personalInfo);
  // console.log('next one',realPersonInfo);

  // useEffect(() => {
  //   if (loggedUser && personalInfo && !personalInfoLoading) {
  //     navigate('/maindashboard');
  //   } else if (loggedUser && !personalInfoLoading) {
  //     navigate('/setupprofile');
  //   }
  // }, [loggedUser, personalInfo, personalInfoLoading, navigate]);

  // useEffect(() => {
  //   if (loggedUser && token) {
  //     navigate('/setupprofile');
  //   }
  // }, [loggedUser, token, navigate]);

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
          <Form.Label style={inputheader}>Username</Form.Label>
          <Form.Control style={inputbody} placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
      </Row>

      <Row>
      <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Password</Form.Label>
          <Form.Control style={inputbody} placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <span style={{color:'#ffffff',fontSize:0.8+'rem',marginTop:1+'rem'}}>Forget Password ? <span style={{color:'#EEA20E', textDecoration: 'underline'}}>Reset here,</span>  </span>
      </Row><br/><br/>

      
      <Button onClick={handleLogin}  style={{width:100+'%',backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem'}}>Login</Button>
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
