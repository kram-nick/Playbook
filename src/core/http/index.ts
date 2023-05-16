import axios from "axios";

export const APIRoutes = {
  AUTH_LOGIN:'/api/users/login'
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
}); 

export default $api;
