import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Image} from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import Project from './iconcomponents/project';
import Aitools from './iconcomponents/aitools';
import Chatroom from './iconcomponents/chatroom';
import Wallet from './iconcomponents/wallet';
import Tasks from './iconcomponents/tasks';
import Creator from './iconcomponents/creator';
import Resources from './iconcomponents/resources';
import Settings from './iconcomponents/settings';

import './dashboard.css'
import { NavLink, useLocation } from 'react-router-dom';

const SidebarContainer = ({ toggled, setToggled }) => {

  const location = useLocation();

  

  return (
    <Sidebar 
      backgroundColor="#272A38"
      className="sidebar"
      onBackdropClick={() => setToggled(false)} 
      toggled={toggled} 
      breakPoint="always">

        <div style={{paddingTop:1.5+'rem',paddingLeft:1.6+'rem'}}>
        <Image src={logo} width={82} />
        </div>
      <Menu
       className="menu"
       style={{ marginBottom: '2rem' ,marginTop: '4rem' }}
       menuItemStyles={{
        button: ({ active }) => ({
          color: active ? '#16192A' : '#FFFFFF',
          backgroundColor: active ? '#EEA20E' : 'transparent',
          '&:hover': {
            backgroundColor: active ? '#EEA20E' : 'transparent',
            color: active ? '#16192A' : '#FFFFFF',
          },
          borderRadius: '21px',
          padding: '0px 2px',
          fontSize: '0.8rem',
          marginBottom: '0.9rem',
          '@media (min-width: 768px)': {
            marginBottom: '0.5rem',
          },
        }),
      }}
      
      >
        <NavLink style={{textDecoration:'none'}} to='/maindashboard'>
        <MenuItem
         active={location.pathname === '/maindashboard'}
         
         style={{height:'40px'}}
         icon={<Project active={location.pathname === '/maindashboard'} />}
        >
          Project
        </MenuItem>
        </NavLink>
        
        <NavLink style={{textDecoration:'none'}} to='/wallet'>
        <MenuItem
        active={location.pathname === '/wallet'}
        
         style={{height:'40px'}}
         icon={<Wallet active={location.pathname === '/wallet'}/>}
        >
          Wallets
        </MenuItem>
        </NavLink>
        
        <NavLink style={{textDecoration:'none'}} to='/tasklog'>
        <MenuItem
         active={location.pathname === '/tasklog'}
       
         style={{height:'40px'}}
         icon={<Tasks active={location.pathname === '/tasklog'} />}
        >
          Tasks Log
        </MenuItem>
        </NavLink>
        
        <NavLink style={{textDecoration:'none'}} to='/chatroom'>
        <MenuItem
         active={location.pathname === '/chatroom'}
        
         style={{height:'40px'}}
         icon={<Chatroom active={location.pathname === '/chatroom'} />}
        >
          Chatroom
        </MenuItem>
        </NavLink>

        <NavLink style={{textDecoration:'none'}} to='/resources'>
        <MenuItem
          active={location.pathname === '/resources'}
       
         style={{height:'40px'}}
         icon={<Resources active={location.pathname === '/resources'} />}
        >
          Resources Stack
        </MenuItem>
        </NavLink>


        <NavLink style={{textDecoration:'none'}} to='/creator'>
        <MenuItem
          active={location.pathname === '/creator'}
        
         style={{height:'40px'}}
         icon={<Creator active={location.pathname === '/creator'} />}
        >
          Manage Creator
        </MenuItem>
        </NavLink>

        <NavLink style={{textDecoration:'none'}} to='/aitools'>
        <MenuItem
          active={location.pathname === '/aitools'}
        
         style={{height:'40px'}}
         icon={<Aitools active={location.pathname === '/aitools'} />}
        >
          Multi AI-tool
        </MenuItem>
        </NavLink>

        <NavLink style={{textDecoration:'none'}} to='/settings'>
        <MenuItem
          active={location.pathname === '/settings'}
        
         style={{height:'40px',}}
         icon={<Settings active={location.pathname === '/settings'} />}
        >
          Settings
        </MenuItem>
        </NavLink>

      </Menu>
    </Sidebar>
  );
};

export default SidebarContainer;
