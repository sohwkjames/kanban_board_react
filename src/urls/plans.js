import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function createPlan(
  planMvpName,
  planAppAcronym,
  planStartdate,
  planEnddate
) {
  const token = localStorage.getItem("jwt");
  const response = await axios.post(
    baseUrl + "/plans",
    {
      planMvpName,
      planAppAcronym,
      planStartdate,
      planEnddate,
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
