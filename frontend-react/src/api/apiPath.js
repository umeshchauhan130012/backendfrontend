import axios from "axios";
import { baseUrl } from "./baseUrl";

const API = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

export default API;