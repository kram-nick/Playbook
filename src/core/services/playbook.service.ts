import { AxiosResponse } from "axios";

import { APIRoutes } from "../http";
import RequestsService from "./request.service";
import { Data } from "../models";

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
  static async UpdateUserAccount(
    data: Data.UserAccount
  ): Promise<AxiosResponse<any>> {
    const formData = {
      user: data,
    };
    return RequestsService.putMethod<any>(APIRoutes.USERS_ACCOUNT, formData);
  }

  static async CreatePlaybook(data: any): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: data,
    };
    return RequestsService.postMethod<any>(APIRoutes.PLAYBOOKS, formData);
  }

  static async UpdatePlaybook(data: any): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: data,
    };
    return RequestsService.putMethod<any>(
      `${APIRoutes.PLAYBOOKS}/${data.id}`,
      formData
    );
  }

  static async Favorite(
    id: any,
    favorite: number
  ): Promise<AxiosResponse<any>> {
    const formData = {
      playbook_id: id,
      favorite,
    };
    return RequestsService.putMethod<any>(
      APIRoutes.PLAYBOOKS_FAVORITE,
      formData
    );
  }

  static async Delete(id: any): Promise<AxiosResponse<any>> {
    return RequestsService.deleteMethod<any>(`${APIRoutes.PLAYBOOKS}/${id}`);
  }

  static async UpdateChapter(data: any, id: any): Promise<AxiosResponse<any>> {
    const formData = {
      chapter: data,
    };
    return RequestsService.putMethod<any>(
      `${APIRoutes.PLAYBOOKS}/pages/${id}`,
      formData
    );
  }

  static async ChangePrivacy(data: any, id: any): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: data,
    };
    return RequestsService.putMethod<any>(
      `${APIRoutes.PLAYBOOKS}/${id}`,
      formData
    );
  }

  static async AddPage(data: any): Promise<AxiosResponse<any>> {
    const formData = {
      page: data,
    };
    return RequestsService.postMethod<any>(APIRoutes.PAGES, formData);
  }

  static async UpdatePage(id: string, data: any): Promise<AxiosResponse<any>> {
    const formData = {
      page: data,
    };
    return RequestsService.putMethod<any>(`${APIRoutes.PAGES}/${id}`, formData);
  }

  static async UpdatePlay(id: string, data: any): Promise<AxiosResponse<any>> {
    const formData = {
      play: data,
    };
    return RequestsService.putMethod<any>(`${APIRoutes.PLAYS}/${id}`, formData);
  }

  static async DeletePage(id: any): Promise<AxiosResponse<any>> {
    return RequestsService.deleteMethod<any>(`${APIRoutes.PAGES}/${id}`);
  }

  static async DeletePlay(id: any): Promise<AxiosResponse<any>> {
    return RequestsService.deleteMethod<any>(`${APIRoutes.PLAYS}/${id}`);
  }

  static async Search(search: string): Promise<AxiosResponse<any>> {
    return RequestsService.getMethod<any>(
      APIRoutes.SEARCH + "?search=" + search
    );
  }

  static async PublishPlaybook(id: string): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: {
        status: "published",
      },
    };
    return RequestsService.putMethod<any>(
      `${APIRoutes.PLAYBOOKS}/${id}`,
      formData
    );
  }

  static async UpdatePlaybookOrder(
    id: string,
    data: string[]
  ): Promise<AxiosResponse<any>> {
    const formData = {
      playbook: {
        order: data,
      },
    };
    return RequestsService.putMethod<any>(
      `${APIRoutes.PLAYBOOKS}/${id}`,
      formData
    );
  }

  static async UploadFile(data: Data.File): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append("mode", data.mode);
    formData.append("file", data.file);
    formData.append("playbook_id", data.playbook_id);

    return RequestsService.postMethod<any>(
      `${APIRoutes.FILE_UPLOAD}`,
      formData
    );
  }

  static async CreateOrder(data: {
    listing_id: string;
  }): Promise<AxiosResponse<any>> {
    const order = {
      order: data,
    };
    return RequestsService.postMethod<any>(`${APIRoutes.ORDERS}`, order);
  }

  static async getPages(playbook_id: string): Promise<AxiosResponse<any>> {
    return RequestsService.getMethod<any>(
      `${APIRoutes.PLAYBOOKS}/${playbook_id}/pages`
    );
  }

  static async AddListing(data: Data.Listing): Promise<AxiosResponse<any>> {
    const formData = {
      listing: data,
    };
    return RequestsService.postMethod<any>(`${APIRoutes.LISTINGS}`, formData);
  }

  static async CreatePlay(data: Data.TaskCard): Promise<AxiosResponse<any>> {
    const formData = {
      play: data,
    };
    return RequestsService.postMethod<any>(APIRoutes.PLAYS, formData);
  }
}
