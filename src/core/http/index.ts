import axios from "axios";

export const APIRoutes = {
  AUTH_LOGIN:'/api/users/login',
  AUTH_CREATE:'/api/users/create'
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
}); 

export default $api;
