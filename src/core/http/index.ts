import axios from "axios";

export const APIRoutes = {
  AUTH_LOGIN: "/api/users/login",
  AUTH_CREATE: "/api/users/create",
  AUTH_GOOGLE: "/api/auth/google/token",
  USER_CHANGE_PASSWORD: "/api/users/password/change",
  DISCOVER: "/api/playbooks/discover",
  FILE_UPLOAD: "/api/files/upload",
  LISTINGS: "/api/listings",
  ORDERS: "/api/orders",
  PLAYBOOKS: "/api/playbooks",
  PLAYBOOKS_FAVORITE: "/api/playbooks/favorite",
  PLAYBOOKS_ONBOARD: "/api/playbooks/count",
  PAGES: "/api/pages",
  SEARCH: "/api/search",
  TAGS: "/api/tags",
  USERS_ACCOUNT: "/api/users/account",
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config: any) => {
  if (config?.url.indexOf("login") === -1) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      process.env.REACT_APP_TOKEN_KEY
    )}`;
  }

  return config;
});

export default $api;
