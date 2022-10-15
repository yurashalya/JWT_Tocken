import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Main from "./pages/Main";
import DashBoard from './pages/DashBoard';

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  </Router>
}

export default App;
