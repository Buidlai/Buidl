import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PersonalInfo from './personalinfo';
import Profession from './profession';
import Resume from './resume';
import StickyNavbar from '../../../components/StickyNavbar';

import '../../../App.css';

function ProfileSetup() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = () => {
    

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
