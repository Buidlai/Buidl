import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {  Form } from "react-bootstrap";

const fileTypes = ["JPG", "PNG", "PDF"];

function UploadResume() {

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


  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <Form.Group style={formdiv}>
    <Form.Label style={inputheader}>Upload Resume</Form.Label>
    <div style={inputbody}>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
    {file && <p style={{color:'#ffffff',fontSize:0.8+'rem'}}>file: <span style={{color:'#889CFF',fontStyle:'italic'}}>{file.name}</span></p>}
    </Form.Group>
  );
}

export default UploadResume;
