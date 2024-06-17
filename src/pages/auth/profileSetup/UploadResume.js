import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (file) {
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };
      localStorage.setItem('resumeFile', JSON.stringify(fileData));
    }
  }, [file]);

  useEffect(() => {
    const savedFile = localStorage.getItem('resumeFile');
    if (savedFile) {
      setFile(JSON.parse(savedFile));
    }
  }, []);
  const handleChange = (file) => {
    if (file) {
      console.log("Selected File:", file);
      setFile(file);

      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };

      localStorage.setItem('resumeFile', JSON.stringify(fileData));
      // const storedFile = localStorage.getItem('resumeFile');
    }
  }


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
