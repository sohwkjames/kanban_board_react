import axios from "axios";
const baseUrl = "http://localhost:3001";

export default async function updateUser(
  username,
  password,
  email,
  isActive,
  userGroup
) {
  const token = localStorage.getItem("jwt");
  let response;
  let requestHeader;
  if (token) {
    requestHeader = {
      headers: {
        authorization: "Bearer token " + token,
      },
    };
  }

  response = await axios.put(
    baseUrl + "/user",
    {
      username,
      password,
      email,
      isActive,
      userGroup,
    },
    requestHeader
  );

  return response.data;
}
