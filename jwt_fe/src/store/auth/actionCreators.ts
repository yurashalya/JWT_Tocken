import { Dispatch } from "@reduxjs/toolkit";
import services from "services";
import { ILoginRequest, ILoginResponse } from "services/auth/types";
import { history } from 'utils/history';
import { 
    loginStart,
    loginSuccess, 
    loginFailure, 
    logoutSuccess,
    loadProfileStart,
    loadProfileFailure, 
    loadProfileSuccess 
} from "./authReducer";

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart());

        const res = await services.auth.login(data);

        dispatch(loginSuccess(res.data.accessToken));
        
      } catch (e: any) {
        console.error(e);

        dispatch(loginFailure(e.message));
      }
};

export const logoutUser = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    await services.auth.logout();

    dispatch(logoutSuccess());

    history.push('/');
  } catch (e) {
      console.error(e);
  }
};