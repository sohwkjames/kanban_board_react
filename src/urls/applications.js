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
  appPermitCreate,
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
      appPermitCreate,
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

// Takes an appAcronym, returns the enddate of the earliest ending Plan
export async function getEarliestEndDate(appAcronym) {
  const token = localStorage.getItem("jwt");
  const response = await axios.post(
    baseUrl + `/applications/earliest-end-date`,
    { appAcronym },
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}

export async function getLatestEndDate(appAcronym) {
  const token = localStorage.getItem("jwt");
  const response = await axios.post(
    baseUrl + `/applications/latest-end-date`,
    { appAcronym },
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}
