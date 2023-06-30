import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function createNewUser(
  username,
  email,
  password,
  isActive,
  userGroups
) {
  // Must send jwt with header
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/user",
      { username, email, password, isActive, userGroups },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
  } else {
    // Sending without header
    response = await axios.post(baseUrl + "/user", {
      username,
      email,
      password,
      isActive,
      userGroups,
    });
  }

  return response.data;
}

export async function updateUser(
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

export async function getUser() {
  const token = localStorage.getItem("jwt");
  let requestHeader;

  const response = await axios.get(
    baseUrl + "/user",
    token ? { headers: { authorization: "Bearer token " + token } } : {}
  );

  return response.data;
}
