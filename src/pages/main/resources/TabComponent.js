import React, { useState } from 'react';
import { Button, Table, Image, Offcanvas } from 'react-bootstrap';
import actionicon from '../../../assets/actionicon.svg';
import pdf from '../../../assets/pdf.svg';
import doc from '../../../assets/doc.svg';
import pptx from '../../../assets/pptx.svg';
import excel from '../../../assets/excel.svg';
import img from '../../../assets/img.svg';
import user1Img from '../../../assets/user1Img.png';
import user2Img from '../../../assets/user2Img.png';
import user3Img from '../../../assets/user3Img.png';
import user4Img from '../../../assets/user4Img.png';
import AddFileForm from './AddFileForm';

import emptylist from '../../../assets/emptylist.svg';

import '../dashboard.css';

function TabComponent() {
  const [activeTab, setActiveTab] = useState('Resources');
  const [showAddFileForm, setShowAddFileForm] = useState(false);
  const [deliveryFiles, setDeliveryFiles] = useState([]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddFile = (newFile) => {
    setDeliveryFiles([...deliveryFiles, newFile]);
    setShowAddFileForm(false);
    setActiveTab("Delivery")
  };

  // Define file type icons
  const fileTypeIcons = {
    pdf: pdf,
    doc: doc,
    docx: doc,
    pptx: pptx,
    xlsx: excel,
    jpg: img,
    png: img,
  };

  // Define user images
  const userImages = {
    'charles jame': user1Img,
    'Daniel Micheal': user2Img,
    'Flora Joy': user3Img,
    'Samuel Chike': user4Img,
  };

  const clickbtn = {
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    color: "white",
    fontSize: 0.8 + "rem",
  };

  return (
    <div style={{ backgroundColor: '#272A38', borderRadius: 0.6 + 'rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', paddingBottom: '0rem', paddingLeft: '0.2rem', paddingRight: '0.5rem' }}>
        <div className="tab" style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <button
            style={clickbtn}
            className={activeTab === "Resources" ? "active" : ""}
            onClick={() => handleTabClick("Resources")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.65"
                y="0.65"
                width="25.7"
                height="25.7"
                rx="12.85"
                fill="#272A38"
              />
              <rect
                x="0.65"
                y="0.65"
                width="25.7"
                height="25.7"
                rx="12.85"
                stroke="#EEA20E"
                stroke-width="1.3"
              />
              <circle
                cx="14"
                cy="14"
                r="7"
                fill={activeTab === "Resources" ? "#EEA20E" : "#272A38"}
              />
            </svg>
            Resources
          </button>
          <button
            style={clickbtn}
            className={activeTab === "Delivery" ? "active" : ""}
            onClick={() => handleTabClick("Delivery")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.65"
                y="0.65"
                width="25.7"
                height="25.7"
                rx="12.85"
                fill="#272A38"
              />
              <rect
                x="0.65"
                y="0.65"
                width="25.7"
                height="25.7"
                rx="12.85"
                stroke="#EEA20E"
                stroke-width="1.3"
              />
              <circle
                cx="14"
                cy="14"
                r="7"
                fill={activeTab === "Delivery" ? "#EEA20E" : "#272A38"}
              />
            </svg>
            Delivery
          </button>
        </div>

        <Button size="sm" style={{ backgroundColor: '#EEA20E', borderColor: '#EEA20E', color: '#222532' }} onClick={() => setShowAddFileForm(true)}>
          Add Files
        </Button>
      </div>
      <br />

      <div className="tab-content">
        {activeTab === 'Resources' && (
          <div>
            <Table bordered hover className="table-bordered" style={{ overflow: 'hidden' }}>
              <tbody>
                <center>
                    <div>
                        <Image src={emptylist} /><br/>
                        <div style={{marginTop:0.8+'rem'}}>
                    <h6 style={{color:'#EEA20E',fontSize:'0.95rem'}}>No file at the moment</h6>
                    <p style={{fontSize:0.8+'rem'}}>Move files from the Delivery stack here</p>
                    <span style={{fontSize:0.8+'rem',textDecoration:'underline',cursor:'pointer',color:'#EEA20E'}} onClick={() => setShowAddFileForm(true)} >Add file</span>
                    </div>
                    </div>
                </center>
              </tbody>
            </Table>
          </div>
        )}
        {activeTab === 'Delivery' && (
          <div>
            <Table bordered hover className="table-bordered" style={{ overflow: 'hidden' }}>
              <tbody>
                {deliveryFiles.map((item, index) => (
                  <tr key={index}>
                    <td className="table-column" style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.id}</td>
                    <td className="table-column" style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>
                      <Image src={fileTypeIcons[item.fileType]} />
                    </td>
                    <td style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.fileName}</td>
                    <td className="table-column" style={{ fontSize: 0.85 + 'rem', color: '#F8F8F8' }}>{item.dateUploaded}</td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        {item.assignees.map((assignee, index) => (
                          <Image key={index} src={userImages[assignee]} style={{ marginRight: '-10px', width: '2.5rem' }} />
                        ))}
                      </div>
                    </td>
                    <td><Image src={actionicon} alt="icon" /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <Offcanvas placement='end' style={{backgroundColor:'#272A38'}} show={showAddFileForm} onHide={() => setShowAddFileForm(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:'1rem',color:'#ffffff'}}>Add File</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AddFileForm userImages={userImages} handleAddFile={handleAddFile} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default TabComponent;
