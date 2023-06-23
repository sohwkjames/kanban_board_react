import axios from "axios";
const baseUrl = "http://localhost:3001";

export default async function getAllUserGroups() {
  const token = localStorage.getItem("jwt");

  const response = await axios.get(
    baseUrl + "/usergroups",
    token ? { headers: { authorization: "Bearer token " + token } } : {}
  );

  return response.data;
}
