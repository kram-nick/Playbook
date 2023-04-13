import axios from "axios";

export const APIRoutes = {};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default $api;
