import React from 'react'
import { useNavigate } from 'react-router-dom';
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Image, Button } from "react-bootstrap";
import '../../../src/App.css';

import setprofileimage from '../../assets/setprofileimage.png';


function SetProfile() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Replace '/your-route' with the actual route where you want to navigate
        navigate('/profilesetup');
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
           <Image src={setprofileimage} width={115} /><br/>
           <h2 style={{color:"#EEA20E",fontSize:1.7+'rem',textAlign: 'center'}}>
           Set up Your  Profile
           </h2>

           <p  className="authenticationtext" style={{color:"#FFFFFF", fontSize:0.8+'rem',textAlign: 'center'}}>
           Customize your profile on BuidlAI to align with your specific expertise, enabling our platform to connect you with projects tailored to your niche.
           </p>
             

            <Button className='buttonstyle' onClick={handleButtonClick}  style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem'}}>Get Started</Button>
       
          
      </section>
    </Container>
  )
}

export default SetProfile;
