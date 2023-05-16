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
      password: password
    }; 
    return RequestsService.postMethod<any>(APIRoutes.AUTH_LOGIN, formData);
  }
 
}
