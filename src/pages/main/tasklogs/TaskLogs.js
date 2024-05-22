import React, { useState } from 'react';
import SidebarContainer from '../Sidebar';
import MainContent from './MainContent';

const TaskLogs = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div style={{ display: 'flex', height: 'auto', minHeight: '100vh', width:100+'%' }}>
      <SidebarContainer toggled={toggled} setToggled={setToggled} />
      <MainContent toggled={toggled} setToggled={setToggled} />
    </div>
  );
};

export default TaskLogs;