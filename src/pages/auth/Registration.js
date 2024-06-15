import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { getUserStatus, createUser } from '../../redux/user/userSlice';

import '../../../src/App.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router-dom';

function Registration() {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInputFocused, setInputFocused] = useState(false);
  const userStats = useSelector((state) => state.userStatus.userStatus.length > 0);

  const handleCountrySelect = () => {
    if (!isInputFocused) {
      setInputFocused(true);
    }
  };

  // console.log('hello');

  const handleUserStatusChange = (e) => {
    setUserStatus(e.target.value);
  };

  useEffect(() => {
    if (!userStats) {
      dispatch(getUserStatus());
    }
  },[dispatch, userStats]);
  // dispatch(getUserStatus());

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to the backend
    if (!validatePassword(password)) {
      alert('Password must contain at least 8 characters, 1 lowercase character, and 1 special character.');
      return;
    }
    const formData = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      user_status: userStatus,
      password: password
    };
    dispatch(createUser(formData));
    navigate('/verification');

  };

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

  const uStatus = useSelector((state) => state.userStatus.userStatus);
  // console.log(uStatus);

  
  // console.log(uStatus);

  return (
    
    <Container fluid className='App' style={{backgroundColor:'#272A38'}}>
      <StickyNavbar />
      <section className='formsection' style={Sectionstyle}>
        <div>
          <h2 style={{ color: "#ffffff", fontSize: 1.8 + "rem" }}>
            <strong>Register as a Freelance</strong>
          </h2>
          <p style={{ color: "#ffffff", fontSize: 0.8 + "rem" }}>
            Register on Buidl to enjoy the revolutionizing collaboration space
          </p>

        <Form>

      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>First Name</Form.Label>
          <Form.Control style={inputbody} placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Last Name</Form.Label>
          <Form.Control style={inputbody} placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Email Address</Form.Label>
          <Form.Control style={inputbody} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
      </Row>

      <Row>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Phone Number</Form.Label>
          <PhoneInput
      country={'us'}
      value={phone}
      onChange={setPhone}
      onSelectCountry={handleCountrySelect}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
      style={{ width: '100%' }}
    />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Username</Form.Label>
          <Form.Control style={inputbody} placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
      </Row>
      <Row>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>User Status</Form.Label>
          <Form.Select aria-label="Default select example"  value={userStatus} onChange={handleUserStatusChange}>
            {uStatus.map((status) => (
              <option key={status.id} value={status.id}>
                {status.status_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Password</Form.Label>
          <Form.Control style={inputbody} type="password" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <ul style={{fontSize:0.8+'rem',color:'white',marginTop:1.0+"rem", marginLeft:1+'rem'}}>
            <span><strong>Password must contain atleast</strong></span>
            <br/>
            <li>8 characters</li>
            <li>1 lower case character</li>
            <li>1 special character</li>
          </ul>
      </Row>

      <Row>
      <Form.Check
      
      style={{marginLeft:1+'rem'}}
        type="checkbox"
        label={<span>Send me emails with tips on how to find talent that fits<br/> my needs.</span>}
         
        
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      </Row><br/>

      <Row>
      <Form.Check
       style={{marginLeft:1+'rem'}}
        type="checkbox"
        label={
          <span >
         I have read, understood and I agree to Buidl’ Privacy<br/> Policy, and Terms and conditions.
          </span>
        }
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      </Row><br/>
      
      <Button type="button" onClick={handleSubmit} style={{width:100+'%',backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem'}}>Proceed</Button>
    <br/>
    <span style={{color:'#ffffff',fontSize:0.8+'rem'}}>Already have an Account ? 
    <Link to= './login'>
    <span style={{color:'#EEA20E', textDecoration: 'underline',cursor:'pointer'}}> Login here,</span>
    </Link>  </span>

    </Form>
        </div>

    
      </section>
    </Container>
  );
}

export default Registration;
