import React, {useEffect, useState} from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import '../../../App.css';

function Profession({ onPrev, onNext }) {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const savedSkills = localStorage.getItem('skills');
    
    if (savedRole) setRole(savedRole);
    if (savedSkills) setSkills(savedSkills);
  }, []);

  useEffect(() => {
    localStorage.setItem('role', role);
    localStorage.setItem('skills', skills);
  }, [role, skills]);

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleSkillsChange = (e) => setSkills(e.target.value);

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
    <Container fluid className='formsectionx'  style={Sectionstyle}>
        <div style={{width:100+'%'}}  >
        <Row style={{width:100+'%'}}
       
       >
         <Col xs={12} sm={12} md={2} lg={2}>
         <svg className='svgicon' width="62" height="62" viewBox="0 0 86 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M86 43.5C86 67.2482 66.7482 86.5 43 86.5C19.2518 86.5 0 67.2482 0 43.5C0 19.7518 19.2518 0.5 43 0.5C66.7482 0.5 86 19.7518 86 43.5ZM10.75 43.5C10.75 61.3112 25.1888 75.75 43 75.75C60.8112 75.75 75.25 61.3112 75.25 43.5C75.25 25.6888 60.8112 11.25 43 11.25C25.1888 11.25 10.75 25.6888 10.75 43.5Z" fill="#363C53"/>
<path d="M80.6251 43.5C83.5937 43.5 86.0347 45.9158 85.6646 48.8611C84.9523 54.53 83.1148 60.0188 80.2403 64.998C76.467 71.5344 71.0398 76.9625 64.504 80.7368C57.9683 84.5112 50.5542 86.4988 43.0069 86.5C35.4596 86.5012 28.0449 84.5159 21.5079 80.7436C14.971 76.9713 9.54203 71.5449 5.76666 65.0098C1.99129 58.4746 0.00249607 51.0608 0.000124194 43.5135C-0.00224768 35.9662 1.98189 28.5512 5.75315 22.0137C8.62601 17.0335 12.4588 12.6962 17.0106 9.2429C19.3756 7.4487 22.6886 8.35348 24.174 10.9237C25.6593 13.4939 24.7429 16.7503 22.4547 18.6414C19.5007 21.0829 16.9942 24.0408 15.0649 27.3852C12.2364 32.2884 10.7483 37.8497 10.7501 43.5101C10.7519 49.1706 12.2435 54.7309 15.075 59.6323C17.9066 64.5337 21.9783 68.6035 26.881 71.4327C31.7837 74.2619 37.3447 75.7509 43.0052 75.75C48.6657 75.7491 54.2262 74.2584 59.128 71.4276C64.0299 68.5969 68.1003 64.5258 70.9303 59.6235C72.8606 56.2797 74.1674 52.6295 74.8032 48.8502C75.2957 45.9228 77.6566 43.5 80.6251 43.5Z" fill="#EEA20E"/>
<path d="M27.9634 52V50.0507C27.9634 50.0507 28.1546 49.9513 28.5368 49.7525C28.9343 49.5385 29.4312 49.2556 30.0274 48.904C30.6237 48.5371 31.2506 48.1243 31.908 47.6656C32.5654 47.1916 33.1693 46.6871 33.7197 46.152C34.2701 45.6016 34.6906 45.0359 34.981 44.4549C35.3327 43.7516 35.4397 43.1324 35.3021 42.5973C35.1798 42.0622 34.897 41.6494 34.4536 41.3589C34.0102 41.0532 33.4827 40.9003 32.8712 40.9003C32.0456 40.9003 31.3882 41.1755 30.8989 41.7259C30.4097 42.2763 30.2415 43.1248 30.3944 44.2715L28.2157 43.9733C28.1087 42.9184 28.2539 42.0164 28.6514 41.2672C29.0642 40.518 29.6605 39.9447 30.4402 39.5472C31.22 39.1344 32.1144 38.928 33.1234 38.928C33.949 38.928 34.6906 39.0809 35.348 39.3867C36.0054 39.6924 36.5329 40.1129 36.9304 40.648C37.3432 41.1831 37.5802 41.7947 37.6413 42.4827C37.7025 43.1707 37.5419 43.9045 37.1597 44.6843C36.8692 45.2652 36.4641 45.8233 35.9442 46.3584C35.4397 46.8782 34.8893 47.3522 34.293 47.7803C33.7121 48.2084 33.1387 48.5829 32.573 48.904C32.0226 49.2098 31.541 49.462 31.1282 49.6608C30.7154 49.8443 30.4402 49.9513 30.3026 49.9819H37.8706V52H27.9634ZM39.4658 52L45.2908 39.0885H47.5154L41.6903 52H39.4658ZM53.862 52.2293C52.8376 52.2293 51.9203 52.0535 51.11 51.7019C50.2997 51.3502 49.6575 50.8228 49.1836 50.1195C48.7249 49.4009 48.4956 48.5141 48.4956 47.4592L50.7431 47.1381C50.7736 48.1319 51.0794 48.8964 51.6604 49.4315C52.2567 49.9513 53.0058 50.2112 53.9079 50.2112C54.6876 50.2112 55.3297 50.0048 55.8343 49.592C56.3541 49.1639 56.614 48.6288 56.614 47.9867C56.614 47.4821 56.484 47.0923 56.2241 46.8171C55.9642 46.5266 55.6355 46.3202 55.238 46.1979C54.8558 46.0603 54.4735 45.9915 54.0913 45.9915H52.5548V44.776H54.1372C54.764 44.776 55.2991 44.646 55.7425 44.3861C56.2012 44.1262 56.4305 43.6981 56.4305 43.1019C56.4305 42.3986 56.1859 41.8405 55.6967 41.4277C55.2074 41.0149 54.55 40.8085 53.7244 40.8085C53.067 40.8085 52.5319 40.9461 52.1191 41.2213C51.7063 41.4965 51.3928 41.8329 51.1788 42.2304C50.98 42.6279 50.873 43.0101 50.8577 43.3771L48.7708 43.0331C48.7708 42.7884 48.8472 42.4444 49.0001 42.0011C49.153 41.5424 49.4053 41.0761 49.7569 40.6021C50.1239 40.1129 50.6207 39.7001 51.2476 39.3637C51.8897 39.0274 52.6924 38.8592 53.6556 38.8592C55.1998 38.8592 56.3999 39.1956 57.2561 39.8683C58.1123 40.5257 58.5404 41.4201 58.5404 42.5515C58.5404 43.3006 58.3263 43.9428 57.8983 44.4779C57.4855 45.013 56.8739 45.334 56.0636 45.4411C56.8739 45.5481 57.5313 45.8844 58.0359 46.4501C58.5404 47.0005 58.7927 47.6809 58.7927 48.4912C58.7927 49.2709 58.5786 49.9436 58.1505 50.5093C57.7377 51.0597 57.1567 51.4878 56.4076 51.7936C55.6584 52.0841 54.8099 52.2293 53.862 52.2293Z" fill="white"/>
</svg>
         </Col>
         <Col xs={12} sm={12} md={10} lg={10} >
         <div style={{display:'flex',flexDirection:'column',color:'#ffffff'}}>
          <h2 style={{fontSize:1.6+'rem'}}>Professional Role</h2>
          <span style={{marginTop:-0.1+'rem',fontSize:0.8+'rem', width:100+'%'}}>Tell us about your profession, what Buidl will know you for </span>
 
         </div>
         </Col>
 
       </Row>
      
      <div style={{marginTop:2+'rem'}}>
    

      <Form>
      

     
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Professional Role(e.g Product Manager, Frontend Developer)</Form.Label>
          <Form.Control style={inputbody} placeholder="Select your Role" value={role} onChange={handleRoleChange}  />
          </Form.Group>

          <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Skills(e.g HtMl, Project Management.)To list multiple(Adobe|Figma|web3 etc)</Form.Label>
          <Form.Control style={inputbody} placeholder="Enter skills" value={skills} onChange={handleSkillsChange}  />
          </Form.Group>

        



        
     
      </Form>
      </div>
 
      <div style={{display:'flex',flexDirection:'row',gap:1+'rem'}}>
      <Button className='stepbtn' style={{backgroundColor:'transparent',borderColor:'#EEA20E', color:'#EEA20E',fontsize:0.8+'rem',marginBottom:1+'rem',marginTop:2+'rem'}}  onClick={onPrev}>Previous</Button>
      <Button className='stepbtn' style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem',marginTop:2+'rem'}}  onClick={onNext}>Proceed</Button>
      </div>
      <br/><span onClick={onNext} style={{color:'#EEA20E', textDecoration: 'underline', cursor:'pointer',fontSize:0.8+'rem'}}>Skip stage</span>  
      </div>
    </Container>
  );
}

export default Profession;
