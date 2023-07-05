import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function getAllUserGroups() {
  const token = localStorage.getItem("jwt");

  const response = await axios.get(
    baseUrl + "/usergroups",
    token ? { headers: { authorization: "Bearer token " + token } } : {}
  );

  return response.data;
}

export async function addUserGroup(groupName) {
  const token = localStorage.getItem("jwt");

  const response = await axios.post(
    baseUrl + "/usergroups",
    {
      groupName,
    },
    token ? { headers: { authorization: "Bearer token " + token } } : {}
  );

  return response.data;
}

export async function checkGroup(groupname) {
  const token = localStorage.getItem("jwt");

  const response = await axios.post(
    baseUrl + "/checkusergroup",
    {
      groupname,
    },
    token ? { headers: { authorization: "Bearer token " + token } } : {}
  );

  return response.data;
}
