import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function login(username, password) {
  const result = await axios.post(baseUrl + "/login", { username, password });
  return result;
}
