import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Container, Button, Offcanvas, Form, Row, Col } from 'react-bootstrap';

import '../dashboard.css';

const CalendarBuild = () => {
  const inputheader = {
    color: '#ffffff',
    fontSize: '0.8rem',
  };

  const inputbody = {
    backgroundColor: '#404354',
    color: '#C8C8C8',
    borderColor: '#404354',
    outline: 'none',
    boxShadow: 'none',
  };

  const formdiv = {
    marginTop: '0.8rem',
  };

  const calendarRef = useRef(null);
  const [showCreateOffcanvas, setShowCreateOffcanvas] = useState(false);
  const [showDetailOffcanvas, setShowDetailOffcanvas] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStart, setTaskStart] = useState('');
  const [taskEnd, setTaskEnd] = useState('');
  const [assignee, setAssignee] = useState('');
  const [tasks, setTasks] = useState([
    {
      title: 'Completion of UI design',
      start: '2024-05-17',
      end: '2024-05-19',
      description: 'Task description 1',
      status: 'todo',
      assignee: 'John Doe',
      color: '#FFFBF4', // Default color
    },
    {
      title: 'frontend design',
      start: '2024-05-20',
      end: '2024-05-27',
      description: 'Task description 2',
      status: 'done',
      assignee: 'Jane Smith',
      color: '#E0FFEC', // Default color
    },
  ]);

  useEffect(() => {
    const calendar = calendarRef.current.getApi();
    calendar.render();
    return () => {
      calendar.destroy();
    };
  }, []);

  const handleCreateOffcanvas = () => {
    setShowCreateOffcanvas(!showCreateOffcanvas);
  };

  const handleDetailOffcanvas = () => {
    setShowDetailOffcanvas(!showDetailOffcanvas);
  };

  const getRandomColor = () => {
    const colors = ['#E0FFEC', '#DCEEFF', '#FFFBF4', '#FFE4E2', '#E4E4E4', '#F8CDFF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleEventClick = (info) => {
    console.log(info.event.extendedProps);
    const { title, start, end, description, assignee } = info.event.extendedProps;
    setSelectedTask({ title, start, end, description, assignee });
    setShowDetailOffcanvas(true);
  };

  const handleCreateTask = () => {
    const newTask = {
      title: taskTitle,
      start: taskStart,
      end: taskEnd,
      description: taskDescription,
      status: 'todo',
      assignee: assignee,
      color: getRandomColor(), // Randomize color
    };
    setTasks([...tasks, newTask]);
    setShowCreateOffcanvas(false);
    // Clear form fields
    setTaskTitle('');
    setTaskDescription('');
    setTaskStart('');
    setTaskEnd('');
    setAssignee('');
  };

  return (
    <Container style={{ width: '100%' }} id="calendar">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
        <div></div>
        <div>
          <Button
            size="sm"
            style={{ backgroundColor: '#EEA20E', borderColor: '#EEA20E', color: '#222532' }}
            onClick={handleCreateOffcanvas}
          >
            Create Task
          </Button>
        </div>
      </div>
      {console.log(tasks)};
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={tasks} // Ensure tasks contains the correct event data
        eventClick={handleEventClick} // Handle task click
      />
      <Offcanvas placement="end" style={{ backgroundColor: '#272A38' }} show={showDetailOffcanvas} onHide={handleDetailOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedTask && (
            <div>
              {console.log(selectedTask)}
              <div style={{ display: 'flex', gap: '1', flexDirection: 'column' }}>
                <span style={{ color: '#999999' }}>Task Title</span>
                <h5 style={{ color: '#ffffff' }}>{selectedTask.title}</h5>
              </div>
              <br />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1' }}>
                <span style={{ color: '#999999', fontSize: '0.8rem' }}>Task Description</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem' }}>{selectedTask.description}</p>
              </div>
              <br />
              <p style={{ color: '#999999' }}>Assignee: {selectedTask.assignee}</p>
              <p style={{ color: '#999999' }}>Start Date: {selectedTask.start}</p>
              <p style={{ color: '#999999' }}>End Date: {selectedTask.end}</p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas placement="end" style={{ backgroundColor: '#272A38' }} show={showCreateOffcanvas} onHide={handleCreateOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: '#ffffff', fontSize: '1rem' }}>Create Task</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ marginTop: '-0.5rem' }}>
          <Form>
            <Form.Group style={formdiv}>
              <Form.Label style={inputheader}>Title</Form.Label>
              <Form.Control style={inputbody} type="text" placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} size="sm" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group style={formdiv} className="mb-3" controlId="taskStart">
                  <Form.Label style={inputheader}>Start Date</Form.Label>
                  <Form.Control style={inputbody} type="date" value={taskStart} onChange={(e) => setTaskStart(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group style={formdiv}>
                  <Form.Label style={inputheader}>End Date</Form.Label>
                  <Form.Control style={inputbody} type="date" value={taskEnd} placeholder="End Date" onChange={(e) => setTaskEnd(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group style={formdiv} className="mb-3" controlId="taskDescription">
              <Form.Label style={inputheader}>Description</Form.Label>
              <Form.Control style={inputbody} as="textarea" rows={3} placeholder="Enter task description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
            </Form.Group>
            <Form.Group style={formdiv} className="mb-3" controlId="assignee">
              <Form.Label style={inputheader}>Assignee</Form.Label>
              <Form.Control style={{ ...inputbody }} as="select" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                <option style={{ fontSize: '0.9rem' }} value="">
                  Select assignee
                </option>
                <option style={{ fontSize: '0.9rem', backgroundColor: 'transparent' }} value="John Doe">
                  John Doe
                </option>
                <option style={{ fontSize: '0.9rem' }} value="Jane Smith">
                  Jane Smith
                </option>
                <option style={{ fontSize: '0.9rem' }} value="Alex Johnson">
                  Alex Johnson
                </option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button variant="primary" size="sm" style={{ backgroundColor: '#EEA20E', borderColor: '#EEA20E', color: '#222532', paddingLeft: '1rem', paddingRight: '1rem' }} onClick={handleCreateTask}>
              Save Task
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default CalendarBuild;
