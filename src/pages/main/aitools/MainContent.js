import React from 'react';
import { Container} from 'react-bootstrap';


import '../dashboard.css'
import CustomNavbar from '../components/CustomNavbar';


import AitoolsComponent from './AitoolsComponent';








const MainContent = ({ toggled, setToggled }) => {

  

  return (
    <Container fluid style={{width:100+'%',padding:0,backgroundColor:'#1A1C28'}}>

     <CustomNavbar toggled={toggled} setToggled={setToggled} />
      <Container style={{paddingTop:5.5+'rem',paddingBottom:4+'rem'}}>
        <Container fluid style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
          <h6 style={{color:'#ffffff', fontSize:0.85+'rem',marginBottom:1+'rem'}}>Multi Ai-tools</h6>
         

        </Container>
    <AitoolsComponent />
      </Container>
    </Container>
  );
};

export default MainContent;
