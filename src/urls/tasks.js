import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function checkUserCanPerformAction(appAcronym, actionName) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/check-permission",
      { appAcronym, actionName },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
  } else {
  }
  return response.data;

  // check-permission
}
