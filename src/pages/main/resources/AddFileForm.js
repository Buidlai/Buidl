import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';

const AddFileForm = ({ handleAddFile,  userImages }) => {

    const userList = Object.keys(userImages).map((userName, index) => ({
        name: userName,
        image: userImages[userName],
      }));


  const [fileName, setFileName] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleAssigneeChange = (e) => {
    const assignee = e.target.value;
    if (selectedAssignees.includes(assignee)) {
      setSelectedAssignees(selectedAssignees.filter(item => item !== assignee));
    } else {
      setSelectedAssignees([...selectedAssignees, assignee]);
    }
  };

  const handleSubmit = () => {

    if (!file) {
        console.log('Please choose a file');
        return;
      }
    
    const fileType = file.name.split('.').pop();
    const dateUploaded = new Date().toISOString().split('T')[0];

    const newFile = {
      fileName: fileName,
      dateUploaded: dateUploaded,
      assignees: selectedAssignees,
      fileType: fileType,
    };

    handleAddFile(newFile);
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
    borderRadius:'0.4rem'
    
  
  }
  const formdiv = {
    marginTop: '1rem',
  }

  return (
    <div style={{ padding: '0.5rem' }}>
      <Form>
        <Form.Group style={formdiv} >
          <Form.Label style={inputheader}>Choose File</Form.Label>
          <Form.Control style={inputbody} required type="file" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group style={formdiv} >
          <Form.Label  style={inputheader} >Assignees</Form.Label><br/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem',marginTop:'0.7rem' }}>
            {userList.map((user, index) => (
              <Form.Check
                key={index}
                inline
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={user.image}
                      roundedCircle
                      style={{ marginRight: '0.5rem', width: '30px', height: '30px' }}
                    />
                    {user.name}
                  </div>
                }
                type="checkbox"
                id={`user${index}`}
                value={user.name}
                checked={selectedAssignees.includes(user.name)}
                onChange={handleAssigneeChange}
              />
            ))}
          </div>
        </Form.Group><br/><br/>
        <Button variant="primary"  size="sm" style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E',color:'#222532',paddingLeft:'1rem',paddingRight:'1rem'}} onClick={handleSubmit}>
          Save File
        </Button>
      </Form>
    </div>
  );
};

export default AddFileForm;
