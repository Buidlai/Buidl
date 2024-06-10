import React, { useState, useMemo, useEffect } from "react";
import countryList from 'react-select-country-list'
import { useSelector } from "react-redux";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "../../../App.css";


const animatedComponents = makeAnimated();

function PersonalInfo({ onNext }) {
  const userKey = useSelector((state) => state.userStatus.userId);
  const [bio, setBio] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [userId, setUserId] = useState(null);

  const countryOptions = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const savedBio = localStorage.getItem('bio');
    const savedPortfolioLink = localStorage.getItem('portfolioLink');
    const savedCountry = localStorage.getItem('country');
    const savedLanguage = localStorage.getItem('language');
    const savedUserId = localStorage.getItem('userId');

    if (savedBio) setBio(savedBio);
    if (savedPortfolioLink) setPortfolioLink(savedPortfolioLink);
    if (savedCountry) setCountry(savedCountry);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedUserId) setUserId(parseInt(savedUserId, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem('bio', bio);
    localStorage.setItem('portfolioLink', portfolioLink);
    // localStorage.setItem('country', country);
    localStorage.setItem('language', language);
    localStorage.setItem('userId', userKey);
  }, [bio, portfolioLink, country, language, userKey]);

  const handleBioChange = (e) => setBio(e.target.value);
  const handlePortfolioLinkChange = (e) => setPortfolioLink(e.target.value);
  // const handleCountryChange = (selectedOption) => setCountry(selectedOption);
  // const handleCountryChange = (selectedOption) => {
  //   setCountry(selectedOption);
  //   const countryLabel = selectedOption.label;
  //   console.log('Selected country:', countryLabel); 

  //   localStorage.setItem('country', countryLabel);
  // };
  const handleCountryChange = country => {
    setCountry(country)
    console.log(country);
    const countryLabel = country.label;
    console.log(typeof countryLabel);
    localStorage.setItem('country', countryLabel);
  }
  
  // localStorage.clear()

  const handleLanguageChange = (selectedOptions) => setLanguage(selectedOptions);



  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

    const Sectionstyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left",
        width:'100%',
        paddingBottom:5+'rem',
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
        boxShadow: 'none'
      }
      const formdiv = {
        marginTop: '1.2rem',
      }

  return (
    <Container fluid className='formsectionx' style={Sectionstyle}>
        <div style={{width:100+'%'}}>
      <Row style={{width:100+'%'}}
      >
        <Col xs={12} sm={12} md={2} lg={2}>
        <svg className='svgicon' width="62" height="62" viewBox="0 0 86 87" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M86 43.5C86 67.2482 66.7482 86.5 43 86.5C19.2518 86.5 0 67.2482 0 43.5C0 19.7518 19.2518 0.5 43 0.5C66.7482 0.5 86 19.7518 86 43.5ZM10.75 43.5C10.75 61.3112 25.1888 75.75 43 75.75C60.8112 75.75 75.25 61.3112 75.25 43.5C75.25 25.6888 60.8112 11.25 43 11.25C25.1888 11.25 10.75 25.6888 10.75 43.5Z" fill="#363C53"/>
        <path d="M80.6251 43.5C83.5936 43.5 86.0347 45.9158 85.6646 48.8611C84.9521 54.5308 83.1142 60.0202 80.2392 65C76.4651 71.5368 71.0369 76.9651 64.5001 80.7391C57.9632 84.5131 50.5481 86.5 43.0001 86.5C37.2499 86.5 31.577 85.3469 26.3107 83.1291C23.5749 81.9769 22.7033 78.655 24.1876 76.0842C25.6718 73.5134 28.9505 72.6802 31.7319 73.7174C35.3233 75.0566 39.1385 75.75 43.0001 75.75C48.6611 75.75 54.2224 74.2598 59.1251 71.4293C64.0277 68.5988 68.0989 64.5276 70.9294 59.625C72.8602 56.2808 74.1673 52.63 74.8032 48.8502C75.2957 45.9228 77.6565 43.5 80.6251 43.5Z" fill="#EEA20E"/>
        <path d="M35.6829 50.4819V52.5H29.5138V50.4819H31.6237V42.4093C31.5014 42.9597 31.3026 43.3878 31.0274 43.6936C30.7522 43.9841 30.4618 44.1905 30.156 44.3128C29.8502 44.4351 29.575 44.5116 29.3304 44.5421C29.0858 44.5574 28.9252 44.5651 28.8488 44.5651V42.0195C28.9405 42.0348 29.1393 42.0348 29.445 42.0195C29.7508 41.9889 30.0795 41.8972 30.4312 41.7443C30.7981 41.5914 31.1192 41.3468 31.3944 41.0104C31.6696 40.674 31.8225 40.2001 31.853 39.5885H33.917V50.4819H35.6829ZM37.2184 52.5L43.0434 39.5885H45.268L39.4429 52.5H37.2184ZM51.6146 52.7293C50.5902 52.7293 49.6729 52.5535 48.8626 52.2019C48.0523 51.8502 47.4101 51.3228 46.9362 50.6195C46.4775 49.9009 46.2482 49.0141 46.2482 47.9592L48.4957 47.6381C48.5262 48.6319 48.832 49.3964 49.413 49.9315C50.0093 50.4513 50.7584 50.7112 51.6605 50.7112C52.4402 50.7112 53.0823 50.5048 53.5869 50.092C54.1067 49.6639 54.3666 49.1288 54.3666 48.4867C54.3666 47.9821 54.2366 47.5923 53.9767 47.3171C53.7168 47.0266 53.3881 46.8202 52.9906 46.6979C52.6084 46.5603 52.2261 46.4915 51.8439 46.4915H50.3074V45.276H51.8898C52.5166 45.276 53.0517 45.146 53.4951 44.8861C53.9538 44.6262 54.1831 44.1981 54.1831 43.6019C54.1831 42.8986 53.9385 42.3405 53.4493 41.9277C52.96 41.5149 52.3026 41.3085 51.477 41.3085C50.8196 41.3085 50.2845 41.4461 49.8717 41.7213C49.4589 41.9965 49.1454 42.3329 48.9314 42.7304C48.7326 43.1279 48.6256 43.5101 48.6103 43.8771L46.5234 43.5331C46.5234 43.2884 46.5998 42.9444 46.7527 42.5011C46.9056 42.0424 47.1579 41.5761 47.5095 41.1021C47.8765 40.6129 48.3733 40.2001 49.0002 39.8637C49.6423 39.5274 50.445 39.3592 51.4082 39.3592C52.9524 39.3592 54.1525 39.6956 55.0087 40.3683C55.8649 41.0257 56.293 41.9201 56.293 43.0515C56.293 43.8006 56.0789 44.4428 55.6509 44.9779C55.2381 45.513 54.6265 45.834 53.8162 45.9411C54.6265 46.0481 55.2839 46.3844 55.7885 46.9501C56.293 47.5005 56.5453 48.1809 56.5453 48.9912C56.5453 49.7709 56.3312 50.4436 55.9031 51.0093C55.4903 51.5597 54.9093 51.9878 54.1602 52.2936C53.411 52.5841 52.5625 52.7293 51.6146 52.7293Z" fill="white"/>
        </svg>
        </Col>
        <Col xs={12} sm={12} md={10} lg={10} >
        <div style={{display:'flex',flexDirection:'column',color:'#ffffff'}}>
         <h2 style={{fontSize:1.6+'rem'}}>Personal Information</h2>
         <span style={{marginTop:-0.1+'rem',fontSize:0.8+'rem',width:100+'%'}}>Now write a bio to tell the world about yourself</span>

        </div>
        </Col>

      </Row>
      
      <div style={{marginTop:2+'rem'}}>
      <ImageUpload />

      <Form>
      <Form.Group style={formdiv} >
        <Form.Label style={inputheader} >Bio</Form.Label>
        <Form.Control style={inputbody} placeholder="Write not more than 2 line a bio about yourself, " as="textarea" rows={3} value={bio}
                onChange={handleBioChange} />
      </Form.Group>

     
        <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Portfolio Link</Form.Label>
          <Form.Control style={inputbody} placeholder="Enter your portfolio link" value={portfolioLink}
                onChange={handlePortfolioLinkChange} />
          </Form.Group>

          <Form.Control style={inputbody} type="hidden" defaultValue={userKey}/>
          <Form.Group className="mt-5" controlId="formBasicEmail">
            <Form.Label style={inputheader}>Country</Form.Label>
            <Select options={countryOptions} value={country} onChange={handleCountryChange} />
          </Form.Group>

          {/* <Form.Group style={formdiv}>
          <Form.Label style={inputheader}>Country</Form.Label>
          <Form.Control style={inputbody} placeholder="Select Country" />
          
          </Form.Group> */}


            

          <Form.Group style={formdiv}>
                  {/* <Form.Label style={inputheader} value={language}
                        onChange={handleLanguageChange}>Language</Form.Label> */}
                  {/* <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue="select language"
              isMulti
              options={options}
            /> */}
          </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={inputheader} value={language}>Language(Your Primary language)e.g English, French</Form.Label>
            <Form.Control type="text" style={inputbody} placeholder="English" onChange={handleLanguageChange} />
          </Form.Group>



        
     
      </Form>
      </div>
 
      
      <div style={{display:'flex',flexDirection:'column'}}>
      <Button className="stepbtn" style={{backgroundColor:'#EEA20E',borderColor:'#EEA20E', color:'#222532',fontsize:0.8+'rem',marginBottom:1+'rem',marginTop:2+'rem'}} onClick={onNext}>Proceed</Button>
      </div>

      

      <br/><span onClick={onNext} style={{color:'#EEA20E', textDecoration: 'underline', cursor:'pointer',fontSize:0.8+'rem'}}>Skip stage</span>  
      


      </div>
    </Container>
  );
}

export default PersonalInfo;
