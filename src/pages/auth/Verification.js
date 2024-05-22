import React from 'react'
import { useNavigate } from 'react-router-dom';
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Image, Button } from "react-bootstrap";
import '../../../src/App.css';

import verificationimage from '../../assets/verificationimage.png';


function Verification() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Replace '/your-route' with the actual route where you want to navigate
        navigate('/authentication');
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

  return (
    <Container fluid className='App' style={{backgroundColor:'#272A38'}}>
      <StickyNavbar />
      <section className='formsection' style={Sectionstyle}>
           <Image src={verificationimage} width={130} />
           <h2 style={{color:"#EEA20E",fontSize:1.7+'rem',textAlign: 'center'}}>
           Verification Code Sent
           </h2>

           <p style={{color:"#FFFFFF", fontSize:0.8+'rem',textAlign: 'center'}}>We have sent a Verification Code to <br/>
            <span style={{color:"#B6B6B6"}}>akinseyeoluwasegun@gmail.com</span></p>
             

            <Button className='buttonstyle' onClick={handleButtonClick}  style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem'}}>I’ve received the code</Button>
       
            <br/>

            <span style={{color:'#ffffff',fontSize:0.8+'rem', textAlign: 'center'}}>Didn’t receive the email ? <br/><span style={{color:'#EEA20E', textDecoration: 'underline'}}>Resend here,</span>  </span>
      </section>
    </Container>
  )
}

export default Verification
