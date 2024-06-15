import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StickyNavbar from "../../components/StickyNavbar";
import { Container, Image, Button } from "react-bootstrap";
import "../../../src/App.css";
import OtpInput from "react-otp-input";
import { verifyUser } from "../../redux/user/userSlice";

import Authimage from "../../assets/Authimage.svg";
// import { Link } from "react-router-dom";

function Verification() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaste = (event) => {
    const data = event.clipboardData.getData('text');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = otp.toString(); // Convert OTP to string
    const formData = { token }; // Create formData object
    dispatch(verifyUser(formData)); // Dispatch verifyUser with formData
    navigate('/login');
   
  };
  
  

  const Sectionstyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    width: "100%",
    paddingBottom: 5 + "rem",
  };

  return (
    <Container fluid className="App" style={{ backgroundColor: "#272A38" }}>
      <StickyNavbar />
      <section className="formsection" style={Sectionstyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={Authimage} width={54} />
          <h2 style={{ color: "#FFFFFF", fontSize: 1.7 + "rem" }}>
            Verification
          </h2>
        </div>

        <p
          className="authenticationtext"
          style={{
            color: "#FFFFFF",
            fontSize: 0.8 + "rem",
            textAlign: "center",
            marginTop: 1 + "rem",
          }}
        >
          Enter the 4 digit code sent to your registered email and phone number
          to access Buidl revolutionizing collaboration space
        </p>

        <span style={{color:'#ffffff', fontWeight:600, fontSize:0.9+'rem'}}>Enter 4 digit OTP code</span><br/>

        <OtpInput
       
          value={otp}
          onChange={setOtp}
          numInputs={4}
          onPaste={handlePaste}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
       <Button style={{marginTop:1+'rem'}}  onClick={handleSubmit}>
        <span style={{cursor:'pointer',color:'#ffffff',textDecoration:'underline',marginTop:4+'rem'}}>proceed</span>
        </Button>
      </section>
    </Container>
  );
}

export default Verification;
