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

const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const jsonToFile = (json) => {
  const blob = new Blob([json], { type: json.type });
  return new File([blob], json.name, { type: json.type });
};

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
    // formData.append('picture', localStorage.getItem('image'));
    // formData.append('resume', localStorage.getItem('resumeFile'));
    // Convert JSON string back to File object for picture
    const imageData = localStorage.getItem('image');
    if (imageData) {
      const imageBlob = dataURLtoBlob(imageData);
      formData.append('picture', imageBlob, 'profile_picture.jpg');
    }

    // Convert JSON string back to File object for resume
    const resumeData = localStorage.getItem('resumeFile');
    if (resumeData) {
      const resumeJson = JSON.parse(resumeData);
      const resumeFile = jsonToFile(resumeJson);
      formData.append('resume', resumeFile);
    }

    
   
    dispatch(createPersonalInfo(formData))
      .then((response) => {
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
