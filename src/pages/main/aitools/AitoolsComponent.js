import React from "react";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import gptlogo from "../../../assets/gptlogo.png";

const Ai = [
  {
    id: "01",
    image: gptlogo,
    name: "John Doe",
    Description: [
      "Enter Your Query: Type or speak your search query into the input field to find projects matching your interests, technology stack, or industry focus.",
      "Review Results: Explore tailored project suggestions with summaries and relevant details generated by ChatGPT based on your preferences.",
      "Refine Your Search: Fine-tune your search by entering specific keywords or criteria to get more precise results adjusted by ChatGPT.",
    ],
  },
  {
    id: "02",
    image: gptlogo,
    name: "John Doe",
    Description: [
      "Enter Your Query: Type or speak your search query into the input field to find projects matching your interests, technology stack, or industry focus.",
      "Review Results: Explore tailored project suggestions with summaries and relevant details generated by ChatGPT based on your preferences.",
      "Refine Your Search: Fine-tune your search by entering specific keywords or criteria to get more precise results adjusted by ChatGPT.",
    ],
  },
 
];

function AitoolsComponent() {
  return (
    <Container>
      <Row >
        {Ai.map((item, index) => (
          <Col xs={12} sm={12} md={6} lg={6} style={{marginBottom:2+'rem'}} >
            <div style={{  backgroundColor:'#272A38',padding:'1.1rem',borderRadius:'0.8rem' }}>
            <Row >
              <Col xs={12} sm={12} md={2} lg={2}>
                <Image src={item.image} style={{marginBottom:'1rem'}} />
              </Col>

              <Col xs={12} sm={12} md={10} lg={10}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom:0.7+'rem'
                  }}
                >
                  <h6 style={{color:'#FFFFFF'}}>ChatGPT</h6>
                  <Form>
                    <Form.Check type="switch" id="custom-switch" />
                  </Form>
                </div>
              </div>

              <div>
              {item.Description.map((list, index) => (
                <ul style={{color:'#ECECEC',fontSize:'0.8rem'}}>
                  <li>{list}</li>
                </ul>
              ))}
            </div>
              </Col>
              
            </Row>
            </div>
           
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AitoolsComponent;
