import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3310",
  // withCredentials: true, parce que je n'ai pas les cookies pas bien ça... Mauvais garçon.
});

export default api;
