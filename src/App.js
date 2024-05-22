import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Registration from '../src/pages/auth/Registration';




import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Verification from "./pages/auth/Verification";
import Authentication from "./pages/auth/Authentication";
import Login from "./pages/auth/Login";
import SetProfile from "./pages/auth/SetProfile";
import ProfileSetup from "./pages/auth/profileSetup/profileSetup";
import DoneSetup from "./pages/auth/DoneSetup";
import MainDashboard from "./pages/main/dashboard/MainDashboard";
import Wallet from "./pages/main/wallet/Wallet";
import TaskLogs from "./pages/main/tasklogs/TaskLogs";
import Chatroom from "./pages/main/chatroom/Chatroom";
import ResourcesStack from "./pages/main/resources/ResourcesStack";
import ManageCreator from "./pages/main/managecreator/ManageCreator";

import Settings from "./pages/main/settings/Settings";
import Aitools from "./pages/main/aitools/Aitools";



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {


    window.scrollTo(0, 0);

  }, [pathname]);

  return null;
}


const RootApplication = () => {
  return (
    <>


      <Routes>

        <Route path="/" exact element={<Registration /> } />
        <Route path="verification" exact element={<Verification /> } />
        <Route path="authentication" exact element={<Authentication /> } />
        <Route path="login" exact element={<Login /> } />
        <Route path="setupprofile" exact element={<SetProfile /> } />
        <Route path="profilesetup" exact element={<ProfileSetup /> } />
        <Route path="donesetup" exact element={<DoneSetup /> } />
        <Route path="maindashboard" exact element={<MainDashboard /> } />
        <Route path="wallet" exact element={<Wallet /> } />
        <Route path="tasklog" exact element={<TaskLogs /> } />
        <Route path="chatroom" exact element={<Chatroom /> } />
        <Route path="resources" exact element={<ResourcesStack /> } />
        <Route path="creator" exact element={<ManageCreator /> } />
        <Route path="aitools" exact element={<Aitools /> } />
        <Route path="settings" exact element={<Settings /> } />
        
        

      </Routes>


    </>
  );
};


function App() {
  return (

    <Router>
      <ScrollToTop />
      <RootApplication />


    </Router>

   
  );
}

export default App;
