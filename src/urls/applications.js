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

export async function getApplication(appAcronym) {
  const token = localStorage.getItem("jwt");
  const response = await axios.get(
    baseUrl + `/applications/${appAcronym}`,
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
  appDescription,
  appStartdate,
  appEnddate,
  appPermitOpen,
  appPermitTodolist,
  appPermitDoing,
  appPermitDone
) {
  const token = localStorage.getItem("jwt");
  const response = await axios.post(
    baseUrl + "/applications",
    {
      appAcronym,
      appRnumber,
      appDescription,
      appStartdate,
      appEnddate,
      appPermitOpen,
      appPermitTodolist,
      appPermitDoing,
      appPermitDone,
    },
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}
