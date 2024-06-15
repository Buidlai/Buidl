import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Navbar, Container} from 'react-bootstrap';
import logo from '../../../assets/logo.svg';
import profileavater from '../../../assets/profileavater.png';
import hamburger from '../../../assets/hamburger.svg';
import { getPersonalInfo } from '../../../redux/user/userSlice';

import '../dashboard.css';
import ModalComponent from './ModalComponent';

const baseUrl = 'http://127.0.0.1:8000';

const CustomNavbar = ({ toggled, setToggled }) => {

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const dispatch = useDispatch();
  const pInfo = useSelector((state) => state.userStatus.personalInfo !==null)

  useEffect(() => {
    if(!pInfo) {
      dispatch(getPersonalInfo())
    }
  }, [dispatch, pInfo])

  const personInfo = useSelector((state) => state.userStatus.personalInfo);
  console.log(personInfo);
  const imageUrl = personInfo ? `${baseUrl}${personInfo.picture_url}` : '';
  console.log(imageUrl);






  return (
    <Navbar fixed='top' className='navbarx' style={{backgroundColor:'#272A38',width:100+'%'}}>
          <Container >
            <Navbar.Brand >
          
          <div style={{display:'flex',gap:10}}>
          <Image src={hamburger} width={34} style={{cursor:'pointer'}} onClick={() => setToggled(!toggled)} />
          <Image src={logo} className='homelogo' width={80} />
          </div>
          
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <div style={{display:'flex',gap:10}} >
            <svg onClick={handleShowModal} style={{cursor:'pointer'}} width="38" height="38" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="51" height="51" rx="25.5" fill="#363A4D"/>
    <rect x="0.5" y="0.5" width="51" height="51" rx="25.5" stroke="#6A7294"/>
    <path d="M38 37L32.4507 31.4507M32.4507 31.4507C33.3999 30.5014 34.1529 29.3745 34.6666 28.1343C35.1803 26.8941 35.4447 25.5648 35.4447 24.2224C35.4447 22.8799 35.1803 21.5507 34.6666 20.3104C34.1529 19.0702 33.3999 17.9433 32.4507 16.9941C31.5014 16.0448 30.3745 15.2919 29.1343 14.7781C27.8941 14.2644 26.5648 14 25.2224 14C23.8799 14 22.5507 14.2644 21.3104 14.7781C20.0702 15.2919 18.9433 16.0448 17.9941 16.9941C16.077 18.9111 15 21.5112 15 24.2224C15 26.9335 16.077 29.5336 17.9941 31.4507C19.9111 33.3677 22.5112 34.4447 25.2224 34.4447C27.9335 34.4447 30.5336 33.3677 32.4507 31.4507Z" stroke="white" stroke-width="1.46364" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <ModalComponent show={showModal} handleClose={handleCloseModal} />

    <svg width="38" height="38" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="51" height="51" rx="25.5" fill="#363A4D"/>
    <rect x="0.5" y="0.5" width="51" height="51" rx="25.5" stroke="#6A7294"/>
    <path d="M26.5418 40.9841H26.4762L26.412 40.9975C26.2749 41.026 26.1354 41.0421 25.9954 41.0454C25.3515 41.0402 24.7351 40.7829 24.2786 40.3286C23.9755 40.027 23.7589 39.6546 23.645 39.25H28.3396C28.3124 39.3562 28.278 39.4607 28.2367 39.5628C28.0785 39.9227 27.8376 40.2403 27.5334 40.4895C27.2439 40.7267 26.905 40.8957 26.5419 40.9841H26.5418ZM17.0803 33.0465L17.4321 32.8706V32.4773V24.0398V24.0279L17.4316 24.016C17.3551 21.9661 17.8172 19.932 18.7718 18.1164C19.2239 17.3195 19.8393 16.6272 20.5777 16.0846C21.3186 15.5403 22.1665 15.1592 23.0654 14.9666L23.5684 14.8588V14.3443V12.8409C23.5684 12.1757 24.1077 11.6364 24.773 11.6364H27.2275C27.8928 11.6364 28.4321 12.1757 28.4321 12.8409V14.3443V14.847L28.9211 14.9634C30.7417 15.3968 32.134 16.3954 33.0826 17.894C34.0395 19.4057 34.5684 21.4656 34.5684 24.0398V32.4773V32.8706L34.9202 33.0465L36.9708 34.0717C37.3789 34.2758 37.6366 34.6929 37.6366 35.1491V35.2386C37.6366 35.9039 37.0973 36.4432 36.4321 36.4432H15.5684C14.9032 36.4432 14.3639 35.9039 14.3639 35.2386V35.1491C14.3639 34.6929 14.6217 34.2758 15.0298 34.0717L17.0803 33.0465Z" stroke="white" stroke-width="1.27273"/>
    <circle cx="33" cy="17" r="3" fill="#F30E0E"/>
    </svg>


    <div style={{display:'flex',gap:7}}>
    <Image src={imageUrl} width={38} height={38} />

    <div className='homeprofile' style={{display:'flex',flexDirection:'row',marginTop:0.1+'rem'}}>
        <span style={{fontSize:0.6+'rem',color:'#A0A0A0'}}>Username</span>
        <span style={{marginTop:0+'rem',color:'#FFFFFF',fontSize:0.8+'rem'}}>{personInfo ? personInfo.username : 'Loading...'}</span>
    </div>

    </div>

        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  );
};

export default CustomNavbar;