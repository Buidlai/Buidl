import React from 'react'
import { useNavigate } from 'react-router-dom';
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Image, Button } from "react-bootstrap";
import '../../../src/App.css';

import congratulationimage from '../../assets/congratulationimage.png';


function DoneSetup() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Replace '/your-route' with the actual route where you want to navigate
        navigate('/maindashboard');
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
           <Image src={congratulationimage} width={120} /><br/>
           <h2 style={{color:"#EEA20E",fontSize:1.7+'rem',textAlign: 'center'}}>
           Congratulation
           </h2>

           <p  className="authenticationtext" style={{color:"#FFFFFF", fontSize:0.8+'rem',textAlign: 'center'}}>Congratulations on creating your account! Now, let's dive in and get started. <br/>
            </p>
             

            <Button className='buttonstyle' onClick={handleButtonClick}  style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem'}}>Visit Market-Space</Button>
       
           
      </section>
    </Container>
  )
}

export default DoneSetup
