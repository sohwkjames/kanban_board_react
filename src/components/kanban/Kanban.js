import { useParams } from "react-router-dom";
import KanbanHeader from "./KanbanHeader";
import { useEffect, useState } from "react";
import { getTaskByApp, getTaskByPlan } from "../../urls/tasks";
import Page from "../page/Page";
import KanbanBody from "./KanbanBody";

export default function Kanban() {
  const { planName, appAcronym } = useParams();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fireGetTaskByApp();
    // fireGetTaskByPlan();
  }, []);

  async function fireGetTaskByPlan() {
    const response = await getTaskByPlan(planName);
  }

  async function fireGetTaskByApp() {
    const response = await getTaskByApp(appAcronym);
    console.log("getTaskByApp response", response);
    if (response.success) {
      console.log("Setting tasks");
      setTasks(response.data);
    } else {
      console.log("response failed");
    }
  }

  return (
    <Page>
      <KanbanHeader />

      {planName && <div>Selected plan is {planName}</div>}
      {appAcronym && <div>Selected app is {appAcronym}</div>}
      <KanbanBody tasks={tasks} planName={planName} appAcronym={appAcronym} />
    </Page>
  );
}
