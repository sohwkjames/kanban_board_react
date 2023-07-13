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

export async function addTask(
  taskName,
  taskDescription,
  taskPlan,
  taskAppAcronym,
  taskState
) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/tasks",
      {
        taskName,
        taskDescription,
        taskPlan,
        appAcronym: taskAppAcronym,
      },
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

export async function getTaskByApp(appAcronym) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/tasks-by-app",
      { appAcronym },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
    return response.data;
  }
  return;
}

export async function getTaskByPlan(planName) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/tasks-by-plan",
      { planName },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
    return response.data;
  }
  return;
}

export async function getTask(taskId) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.get(baseUrl + `/task/${taskId}`, {
      headers: {
        authorization: "Bearer token " + token,
      },
    });
    return response.data;
  }
  return;
}

export async function editTask(
  taskId,
  taskName,
  taskDescription,
  taskPlan,
  taskNote
) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.put(
      baseUrl + "/tasks",
      { taskId, taskName, taskDescription, taskPlan, taskNote },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
    return response.data;
  }
  return;
}

export async function promoteTask(
  taskId,
  taskName,
  taskDescription,
  taskPlan,
  taskNote
) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/task/promote",
      { taskId, taskName, taskDescription, taskPlan, taskNote },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
    return response.data;
  }
  return;
}

export async function demoteTask(
  taskId,
  taskName,
  taskDescription,
  taskPlan,
  taskNote
) {
  const token = localStorage.getItem("jwt");
  let response;
  if (token) {
    response = await axios.post(
      baseUrl + "/task/demote",
      { taskId, taskName, taskDescription, taskPlan, taskNote },
      {
        headers: {
          authorization: "Bearer token " + token,
        },
      }
    );
    return response.data;
  }
  return;
}
