import { AxiosResponse } from "axios";
import $api, { APIRoutes } from "../http";
import RequestsService from "./request.service";

export default class AuthService {
  static async Login(
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> {
    const formData = {
      email: email,
      password: password,
    };
    return RequestsService.postMethod<any>(APIRoutes.AUTH_LOGIN, formData);
  }

  static async Create(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> {
    const formData = {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      },
    };
    return RequestsService.postMethod<any>(APIRoutes.AUTH_CREATE, formData);
  }

  static async LoginGoogle(code: string): Promise<AxiosResponse<any>> {
    return RequestsService.postMethod<any>(APIRoutes.AUTH_GOOGLE, { code });
  }

  static async ChangePassword(data: {
    current_password: string;
    new_password: string;
  }): Promise<AxiosResponse<any>> {
    return RequestsService.putMethod<any>(APIRoutes.USER_CHANGE_PASSWORD, data);
  }
}
