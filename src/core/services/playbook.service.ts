import { AxiosResponse } from "axios";
import $api, { APIRoutes } from "../http";
import RequestsService from "./request.service";
// {"playbook":
//   {"name":"Sales Playbook",
//   "url":"https://www.google.com",
//   "privacy":"public",
//   "status":"draft",
//   "color_code":"#000000",
//   "icon_url":"https://www.google.com",
//   "header_url":"https://www.google.com",
//   "category_id":0,
//   "order":"1,2",
//   "favorited":"true",
//   "content":""}
// }
export default class PlaybookService {
  static async createPlaybook(data: any): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: data,
    };
    return RequestsService.postMethod<any>(APIRoutes.PLAYBOOKS, formData);
  }

  static async updatePlaybook(data: any): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: data,
    };
    return RequestsService.putMethod<any>(
      APIRoutes.PLAYBOOKS + "/" + data.id,
      formData
    );
  }

  static async favorite(
    id: any,
    favorite: number
  ): Promise<AxiosResponse<any>> {
    const formData = {
      playbook_id: id,
      favorite: favorite,
    };
    return RequestsService.putMethod<any>(
      APIRoutes.PLAYBOOKS_FAVORITE,
      formData
    );
  }

  static async delete(id: any): Promise<AxiosResponse<any>> {
    return RequestsService.deleteMethod<any>(APIRoutes.PLAYBOOKS + "/" + id);
  }

  static async updateChapter(data: any, id: any): Promise<AxiosResponse<any>> {
    const formData = {
      chapter: data,
    };
    return RequestsService.putMethod<any>(
      `${APIRoutes.PLAYBOOKS}/pages/${id}`,
      formData
    );
  }

  // static async getPages(
  //   id: string,
  // ): Promise<AxiosResponse<any>> {
  //   return RequestsService.getMethod<any>(APIRoutes.PLAYBOOKS + '/' + id +'/pages');
  // }

  // static async getMine(): Promise<AxiosResponse<any>> {
  //   return RequestsService.getMethod<any>(APIRoutes.PLAYBOOKS + '/mine');
  // }
}
