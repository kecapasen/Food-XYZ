import axios from "axios";
export const instance = axios.create({
  withCredentials: true,
  baseURL: "/api",
});
