import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function login(username, password) {
  const result = await axios.post(baseUrl + "/login", { username, password });
  return result;
}

export async function testingBackend() {
  const result = await axios.get(baseUrl + "/testing");
  return result;
}

export async function checkUserGroup(groupname) {
  // Attach jwt into header
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/checkusergroup",
      { groupname },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
  } else {
    // Sending without header
    response = await axios.post(baseUrl + "/checkusergroup", { groupname });
  }
  return response.data;
}

export async function getCurrentUserDetails() {
  // Attach jwt into header
  const token = localStorage.getItem("jwt");
  if (!token) return;

  const response = await axios.get(baseUrl + "/get_current_user", {
    headers: {
      authorization: "Bearer token " + token,
    },
  });
  return response.data;
}

export async function getUserList() {
  const token = localStorage.getItem("jwt");
  const response = await axios.get(
    baseUrl + "/users",
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}

export async function createNewUser(
  username,
  email,
  password,
  isActive,
  userGroup
) {
  // Must send jwt with header
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/user",
      { username, email, password, isActive, userGroup },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
  } else {
    // Sending without header
    response = await axios.post(baseUrl + "/checkusergroup", {
      username,
      email,
      password,
      isActive,
      userGroup,
    });
  }

  return response.data;
}
