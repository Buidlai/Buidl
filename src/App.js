import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Launchpad from "./pages/Launchpad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Launchpad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
