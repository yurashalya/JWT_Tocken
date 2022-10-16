import { AxiosPromise } from "axios";

import Endpoints from "services/endpoinst";
import { axiosInstance } from "../instance";

import { ILoginRequest, ILoginResponse } from "./types";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => 
    axiosInstance.post(Endpoints.AUTH.LOGIN, params);