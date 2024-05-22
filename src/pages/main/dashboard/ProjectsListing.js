import React from 'react';
import { Row, Col, Button, Container} from 'react-bootstrap';




const Projects = [
    {
      id:"1",
      title: "Build a Mobile App",
      description: "Develop a mobile application for iOS and application for iOS and Android  Android platforms.",
      salary: 5000,
      duration: "3 months",
      datePosted: "4 days ago",
      numOfApplicants: 10
    },
    {
      id:"2",
      title: "Design a Website",
      description: "Create a modern website with responsive design and interactive features.",
      salary: 3000,
      duration: "2 months",
      datePosted: "1 day ago",
      numOfApplicants: 8
    },
    {
      id:"3",
      title: "Write a Research Paper",
      description: "Conduct a literature review and write a research paper on a specific topic.",
      salary: 2000,
      duration: "1 month",
      datePosted: "5 days ago",
      numOfApplicants: 5
    },
    {
      id:"4",
      title: "Develop a Chatbot",
      description: "Build an AI-powered application for iOS and Android  chatbot for customer service on a website.",
      salary: 4000,
      duration: "2 months",
      datePosted: "3 days ago",
      numOfApplicants: 7
    },
    {
      id:"5",
      title: "Create a Marketing Campaign",
      description: "Plan and execute a comprehensive marketing campaign for a new product launch.",
      salary: 6000,
      duration: "3 months",
      datePosted: "2 days ago",
      numOfApplicants: 12
    },
    {
        id:"6",
        title: "Create a Marketing Campaign",
        description: "Plan and execute a comprehensive marketing campaign for a new product launch.",
        salary: 6000,
        duration: "3 months",
        datePosted: "2 days ago",
        numOfApplicants: 12
      },
      {
        id:"7",
        title: "Write a Research Paper",
        description: "Conduct a literature review and write a research paper on a specific topic.",
        salary: 2000,
        duration: "1 month",
        datePosted: "5 days ago",
        numOfApplicants: 5
      },
  ];
  

function ProjectsListing() {

    const Cardbody ={
        backgroundColor:'#222532',border:'1px solid #3F4561',padding:'1.6rem 1rem ',borderRadius:12+'px',height:'auto'
      }
    const Headingcontainer ={
        display:'flex',justifyContent:'space-between'
    }
    const Headingtitle = {
        color:'#ffffff',fontWeight:'600',fontSize:0.9+'rem'
    }
    const Headingcountdown = {
        color:'#B6B6B6', fontSize:0.8+"rem"
    }
    const Section = {
        marginBottom:0.5+'rem'
    }
    const Projectdescription = {
        color:'#B6B6B6', fontSize:0.7+"rem"
    }
    const Salarysection = {
        display:'flex',flexDirection:'column',gap:0.2+'rem',marginBottom:0.5+'rem'
    }
    const Salarytitle = {
        color:'#B6B6B6', fontSize:0.8+"rem"
    }
    const Salarycontain = {
        display:'flex',flexDirection:'row',gap:5
    }
    const Salaryhead = {
        color:'#ffffff',fontWeight:'600',fontSize:0.9+'rem'
    }
    const Salarysubhead = {
        color:'#B6B6B6', fontSize:0.7+"rem"
    }
    const Durationsection = {
        display:'flex',flexDirection:'column',gap:0.2+'rem',marginBottom:0.5+'rem'
    }
    const Durationtitle = {
        color:'#B6B6B6', fontSize:0.8+"rem"
    }
    const Durationcount = {
        color:'#ffffff',fontWeight:'600',fontSize:0.9+'rem'
    }
    const Buttonsection = {
        display:'flex',flexDirection:'row',justifyContent:'space-between',padding:'1.2rem 0rem 0rem 0rem',borderTop:'1px solid #3F4561'

    }
    const Buttonstyle = {
        borderRadius:'26.22px',backgroundColor:'transparent',border:'1px solid #EEA20E',color:'#EEA20E',fontSize:0.8+'rem'
    }
    const Noapplicant = {
        color:'#ffffff',fontSize:0.8+'rem'
    }

      
  return (
    <Container fluid>
    <Row className="g-4">
         {Projects.map((item, index) => (
            <Col key={item.id} xs={12} sm={12} md={6} lg={4} >
            <div style={Cardbody}>
            <div style={Headingcontainer}>
             <h6 style={Headingtitle}>{item.title}</h6>
             <span style={Headingcountdown}>{item.datePosted}</span>
            </div>
            <div style={Section}>
             <span style={Projectdescription}>
             {item.description}
             </span>
            </div>
            <div style={Salarysection} >
             <span style={Salarytitle}>Salary</span>
             <div style={Salarycontain}>
               <h6 style={Salaryhead}>{item.salary}</h6>
               <span style={Salarysubhead} >{item.salary}</span>
             </div>
            </div>
   
            <div style={Durationsection} >
               <span style={Durationtitle}>Duration</span>
               <h6 style={Durationcount}>{item.duration}</h6>
            </div>
   
            <div style={Buttonsection}>
             <Button type='outline' style={Buttonstyle} size="sm">
               Apply Now
             </Button>
             <span style={Noapplicant}>{item.numOfApplicants} Applicants</span>
   
            </div>
            </div>
           </Col>
         ))}
        
      </Row>
      </Container>
  )
}

export default ProjectsListing
