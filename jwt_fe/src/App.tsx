import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

import {IRootState} from "store";
import {Header} from "components";

import Main from "./pages/Main";
import DashBoard from './pages/DashBoard';

function App() {

  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashBoard /> : <Navigate to="/"/>} />
      </Routes>
    </Router>
  )
}

export default App;
