import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form, FormControl, InputGroup, Image } from "react-bootstrap";

import gptlogo from "../../../assets/gptlogo.png";

import "../dashboard.css";

const ModalComponent = ({ show, handleClose }) => {
  const inputbodyx = {
    backgroundColor: "#404354",
    color: "#C8C8C8",
    borderColor: "#404354",
    outline: "none",
    boxShadow: "none",
    borderRadius: 2 + "rem",
    width:100+'%'
    
    
  };
 

  return (
    <Modal
      style={{ backgroundColor: "rgba(69, 75, 101, 0.6)" }}
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#ffffff", fontSize: "0.9rem" }}>
          Search and Ai
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: "#999999", fontSize: "0.8rem" }}>
          We have multi Ai tools click on any one to use or search
        </p>
        <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
          <Form style={{width:100+'%'}} >
            <InputGroup size="lg">
              <FormControl
                style={inputbodyx}
                type="text"
                placeholder="Search"
              />
            </InputGroup>
          </Form>
          <div>
            <Image  src={gptlogo} width={34}/>
          </div>
        </div><br/>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
