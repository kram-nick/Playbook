import { AxiosResponse } from "axios";
import $api, { APIRoutes } from "../http";
import RequestsService from "./request.service";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> {
    const formData = {
      email: email,
      password: password,
    };
    return RequestsService.postMethod<any>(APIRoutes.AUTH_LOGIN, formData);
  }

  static async create(
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

  static async loginGoogle(code: string): Promise<AxiosResponse<any>> {
    return RequestsService.postMethod<any>(APIRoutes.AUTH_GOOGLE, { code });
  }
}
