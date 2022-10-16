import React from 'react';
import { useSelector } from "react-redux";
import {IRootState, useAppDispatch} from "store";

import { logoutUser, getProfile } from "store/auth/actionCreators";
import {Login } from "components";

const MainApp = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector((state: IRootState) => 
   !!state.auth.authData.accessToken);

  const profileName = useSelector(
    (state: IRootState) => state.auth.profileData.profile
  );

  const renderProfile = () => (
    <div>
        <h3>{profileName}, you are logged in successfully</h3>
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
        <button onClick={() => dispatch(getProfile())}>Update Profile</button>
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