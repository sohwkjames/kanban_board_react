import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function createPlan(
  planMvpName,
  planAppAcronym,
  planStartdate,
  planEnddate,
  appAcronym
) {
  const token = localStorage.getItem("jwt");
  const response = await axios.post(
    baseUrl + "/plans",
    {
      planMvpName,
      planAppAcronym,
      planStartdate,
      planEnddate,
      appAcronym,
    },
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}

export async function getAllPlans() {
  const token = localStorage.getItem("jwt");
  const response = await axios.get(
    baseUrl + "/plans",
    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}

export async function getPlanByAppAcronym(appAcronym) {
  const token = localStorage.getItem("jwt");
  const response = await axios.get(
    baseUrl + `/plans/${appAcronym}`,

    token && {
      headers: {
        authorization: "Bearer token " + token,
      },
    }
  );

  return response.data;
}
