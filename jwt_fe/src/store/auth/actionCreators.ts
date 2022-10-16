import { Dispatch } from "@reduxjs/toolkit";
import { AxiosPromise } from "axios";
import services from "services";
import { store } from "store";
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

import { isTokenExpired } from "utils/jwt";

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart());

        const res = await services.auth.login(data);

        dispatch(loginSuccess(res.data.accessToken));
        dispatch(getProfile());
        
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


export const getProfile = () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart());

      const res = await services.auth.getProfile();

      dispatch(loadProfileSuccess(res.data));
    } catch (e: any) {
      console.error(e);

      dispatch(loadProfileFailure(e.message));
    }
};

let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null
export const getAccessToken =
    () =>
    async (dispatch: Dispatch<any>): Promise<string | null> => {
        try {
            const accessToken = store.getState().auth.authData.accessToken;

            if (!accessToken || isTokenExpired(accessToken)) {
              if (refreshTokenRequest === null) {
                  refreshTokenRequest = services.auth.refreshToken();
              }

              const res = await refreshTokenRequest
              refreshTokenRequest = null;

              dispatch(loginSuccess(res.data.accessToken));

              return res.data.accessToken;
            }
            
            return accessToken;
        } catch (e) {
            console.error(e);

            return null;
        }
};