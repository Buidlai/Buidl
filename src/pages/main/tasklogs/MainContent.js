import React from 'react';
import { Container} from 'react-bootstrap';


import '../dashboard.css'
import CustomNavbar from '../components/CustomNavbar';

import TasksComponent from './TasksComponent';
import CalendarBuild from './CalendarBuild'


const MainContent = ({ toggled, setToggled, onClick }) => {

  

  return (
    <Container fluid style={{width:100+'%',padding:0,backgroundColor:'#1A1C28'}}>

     <CustomNavbar toggled={toggled} setToggled={setToggled} />
      <Container style={{paddingTop:5.5+'rem',paddingBottom:4+'rem'}}>
        <Container fluid >
          <h6 style={{color:'#ffffff', fontSize:0.85+'rem',marginBottom:1+'rem'}}>Tasklogs</h6>

         <CalendarBuild />

        </Container>
    <TasksComponent />
      </Container>
    </Container>
  );
};

export default MainContent;
