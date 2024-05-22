import React, { useState } from 'react';
import { Button, Table, Image, Offcanvas, Form } from 'react-bootstrap';
import actionicon from '../../../assets/actionicon.svg';
import user1Img from '../../../assets/user1Img.svg';
import user2Img from '../../../assets/user2Img.svg';
import user3Img from '../../../assets/user3Img.svg';
import user4Img from '../../../assets/user4Img.svg';
import user5Img from '../../../assets/user5Img.svg';
import user6Img from '../../../assets/user6Img.svg';

function CreatorComponent() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const usersData = [
    {
      id: '01',
      image: user1Img,
      fullname: 'John Doe',
      role: 'Developer',
      dateJoined: '2022-01-01'
    },
    {
      id: '02',
      image: user2Img,
      fullname: 'Jane Smith',
      role: 'Designer',
      dateJoined: '2022-02-15'
    },
    {
      id: '03',
      image: user3Img,
      fullname: 'Michael Johnson',
      role: 'Manager',
      dateJoined: '2022-03-20'
    },
    {
      id: '04',
      image: user4Img,
      fullname: 'Michael Johnson',
      role: 'Manager',
      dateJoined: '2022-03-20'
    },
    {
      id: '05',
      image: user5Img,
      fullname: 'Michael Johnson',
      role: 'Manager',
      dateJoined: '2022-03-20'
    },
    {
      id: '06',
      image: user6Img,
      fullname: 'Michael Johnson',
      role: 'Manager',
      dateJoined: '2022-03-20'
    },
    {
      id: '07',
      image: user1Img,
      fullname: 'Michael Johnson',
      role: 'Manager',
      dateJoined: '2022-03-20'
    },
  ];

  const handleAddCreator = () => {
    setShowOffCanvas(true);
  };

  const handleCloseOffCanvas = () => {
    setShowOffCanvas(false);
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
    boxShadow: 'none',
  
  }
  const formdiv = {
    marginTop: '0.8rem',
  }

  return (
    <div style={{ backgroundColor: '#272A38', borderRadius: 0.6 + 'rem' }}>
      <div style={{ paddingTop: '1rem', paddingBottom: '0rem', paddingLeft: '1rem', paddingRight: '0.5rem' }}>
        <Button size="sm" style={{ backgroundColor: '#EEA20E', borderColor: '#EEA20E', color: '#222532' }} onClick={handleAddCreator}>
          Post a Role
        </Button>
      </div>
      <br />
      <Table bordered hover className="table-bordered" style={{ overflow: 'hidden' }}>
        <tbody>
          {usersData.map((item, index) => (
            <tr key={index}>
              <td className="table-column" style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.id}</td>
              <td style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>
                <Image src={item.image} width={40} />
              </td>
              <td style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.fullname}</td>
              <td style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.role}</td>
              <td className="table-column" style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.dateJoined}</td>
              <td>
                <Image src={actionicon} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Offcanvas placement="end" show={showOffCanvas} style={{backgroundColor:'#272A38'}} onHide={handleCloseOffCanvas} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:'#ffffff',fontSize:'1rem'}}>Post a Role</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group style={formdiv} className="mb-3" controlId="role">
              <Form.Label style={inputheader}>Select Role</Form.Label>
              <Form.Control style={inputbody} as="select">
                <option>Developer</option>
                <option>Designer</option>
                <option>Manager</option>
              </Form.Control>
            </Form.Group>
            <Form.Group style={formdiv} className="mb-3" controlId="jobDescription">
              <Form.Label style={inputheader}>Job Description</Form.Label>
              <Form.Control style={inputbody} as="textarea" rows={3} />
            </Form.Group>
            <Form.Group style={formdiv} className="mb-3" controlId="skills">
              <Form.Label style={inputheader}>Select Skills</Form.Label>
              <Form.Control style={inputbody} type="text" placeholder="Enter skills" />
            </Form.Group>
            <Button variant="primary" size="sm" style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E',color:'#222532',paddingLeft:'1rem',paddingRight:'1rem',marginTop:2+'rem'}} type="submit">
              Post Role
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CreatorComponent;
