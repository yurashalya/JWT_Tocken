import { AxiosPromise } from "axios";

import Endpoints from "services/endpoints";
import { axiosInstance } from "../instance";

import { ILoginRequest, ILoginResponse } from "./types";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => 
    axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const logout = (): AxiosPromise => axiosInstance.get(Endpoints.AUTH.LOGOUT);

export const getProfile = (): AxiosPromise<string> => axiosInstance.get(Endpoints.AUTH.PROFILE);

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.REFRESH);