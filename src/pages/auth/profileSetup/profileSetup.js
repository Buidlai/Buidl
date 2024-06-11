import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { createPersonalInfo } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import PersonalInfo from './personalinfo';
import Profession from './profession';
import Resume from './resume';
import StickyNavbar from '../../../components/StickyNavbar';

import '../../../App.css';

function ProfileSetup() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  // localStorage.clear();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('bio', localStorage.getItem('bio'));
    formData.append('port_link', localStorage.getItem('portfolioLink'));
    formData.append('country', localStorage.getItem('country'));
    formData.append('skills', localStorage.getItem('skills'));
    formData.append('user', localStorage.getItem('userId'));
    formData.append('language', localStorage.getItem('language'));
    formData.append('professional_role', localStorage.getItem('role'));
    formData.append('picture', localStorage.getItem('image'));
    formData.append('resume', localStorage.getItem('resumeFile'));
    // const resumeFileData = localStorage.getItem('resumeFile');
    // if (resumeFileData) {
    //   formData.append('resume', resumeFileData, 'resume.pdf'); // Append the Blob directly to formData
    // }
      // In your handleSubmit function:
    // const resumeFileData = localStorage.getItem('resumeFile');
    // if (resumeFileData) {
    //   // Convert Base64 string back to Blob object
    //   const resumeBlob = dataURLtoBlob(resumeFileData);
    
    //   // Append the Blob to formData
    //   formData.append('resume', resumeBlob, 'resume.pdf');
    // }
    // dispatch(createPersonalInfo(formData));
   
    console.log("Dispatching createPersonalInfo with formData:", formData);
    dispatch(createPersonalInfo(formData))
      .then((response) => {
        console.log('Response from createPersonalInfo:', response);
        if (response.error) {
          console.error('Error:', response.error.message);
        } else {
          localStorage.clear();
          navigate('/donesetup');
        }
      })
      .catch((error) => {
        console.error('Error dispatching createPersonalInfo:', error);
      });
    

    navigate('/donesetup')
  };

  return (
    <Container fluid className='App' style={{backgroundColor:'#272A38'}}>
        <StickyNavbar />
      {currentPage === 1 && <PersonalInfo onNext={nextPage} />}
      {currentPage === 2 && <Profession onPrev={prevPage} onNext={nextPage} />}
      {currentPage === 3 && <Resume onPrev={prevPage} onSubmit={handleSubmit} />}
     
    </Container>
  );
}

export default ProfileSetup;
