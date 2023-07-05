import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function getApplications() {
  const token = localStorage.getItem("jwt");
  const response = await axios.get(
    baseUrl + "/applications",
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}

export async function createApplication(
  appAcronym,
  appRnumber,
  // appDescription,
  appStartdate,
  appEnddate
  // appPermitOpen,
  // appPermitTodolist,
  // appPermitDoing,
  // appPermitDone
) {
  const token = localStorage.getItem("jwt");
  console.log("token", token);
  const response = await axios.post(
    baseUrl + "/applications",
    { appAcronym, appRnumber, appStartdate, appEnddate },
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}
