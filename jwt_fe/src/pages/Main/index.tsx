import React from 'react';
import { useSelector } from "react-redux";
import {IRootState, useAppDispatch} from "store";

import { logoutUser } from "store/auth/actionCreators";
import {Login } from "components";

const MainApp = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector((state: IRootState) => 
   !!state.auth.authData.accessToken);

  const renderProfile = () => (
    <div>
        <h3>You are logged in successfully</h3>
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  )
  return (
    <div>
        <h1>Main Page</h1>
        {isLoggedIn ? renderProfile() : <Login />}
    </div>
  )
}

export default MainApp;