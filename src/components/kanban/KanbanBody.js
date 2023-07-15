import KanbanCard from "./KanbanCard";
import "./kanbanbody.css";
import { TASK_STATES } from "../../constants/taskState";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getApplication } from "../../urls/applications";
import { getMyUserGroups } from "../../urls/userGroups";

export default function KabanBody(props) {
  const { tasks, planName, appAcronym } = props;
  const [userGroups, setUsergroups] = useState([]);
  const [userGroupOpen, setUserGroupOpen] = useState("");

  const [userGroupTodo, setUserGroupTodo] = useState("");

  const [userGroupDoing, setUserGroupDoing] = useState("");

  // const [usergroupOpen, setUsergroupOpen] = useState('')

  useEffect(() => {
    fireGetApplication();
    fireGetMyUserGroup();
  }, []);
  // Get this application's usergroup for App_permit_open, App_permit_todo etc.
  async function fireGetApplication() {
    const applicationResponse = await getApplication(appAcronym);
    console.log("application", applicationResponse);

    if (applicationResponse.success) {
      setUserGroupOpen(applicationResponse.data[0].App_permit_open);
      setUserGroupTodo(applicationResponse.data[0].App_permit_todo);
      setUserGroupDoing(applicationResponse.data[0].App_permit_doing);
      // setUserGroupTodo(applicationResponse.data[0].App_permit_todo);
      // setUserGroupTodo(applicationResponse.data[0].App_permit_todo);
    }
  }

  async function fireGetMyUserGroup() {
    const userResponse = await getMyUserGroups();
    console.log("user response", userResponse);
    if (userResponse.success) {
      setUsergroups(userResponse.data);
    }
  }
  // Get this user's usergroup.

  // Client side handle the button.

  let openTasks;
  let todoTasks;
  let doingTasks;
  let doneTasks;
  let closedTasks;

  let tasksFilteredByPlan;
  if (planName) {
    tasksFilteredByPlan = tasks.filter((task) => task.Task_plan === planName);
  } else {
    tasksFilteredByPlan = tasks;
  }

  openTasks = tasksFilteredByPlan.filter(
    (task) => task.Task_state === TASK_STATES.open
  );
  todoTasks = tasksFilteredByPlan.filter(
    (task) => task.Task_state === TASK_STATES.todo
  );
  doingTasks = tasksFilteredByPlan.filter(
    (task) => task.Task_state === TASK_STATES.doing
  );
  doneTasks = tasksFilteredByPlan.filter(
    (task) => task.Task_state === TASK_STATES.done
  );
  closedTasks = tasksFilteredByPlan.filter(
    (task) => task.Task_state === TASK_STATES.closed
  );

  return (
    <div>
      <div className="kanban-body-container">
        <div className="kanban-body-column">
          <div>
            <h3>Open</h3>
            {openTasks.map((task, idx) => (
              <KanbanCard
                task={task}
                key={idx}
                renderDemote={false}
                renderEdit={userGroups.includes(userGroupOpen)}
                renderPromote={userGroups.includes(userGroupOpen)}
              />
            ))}
          </div>
        </div>
        <div className="kanban-body-column">
          <h3>Todo</h3>
          {todoTasks.map((task, idx) => (
            <KanbanCard
              task={task}
              key={idx}
              // renderDemote={}
              // renderEdit={}
              // renderPromote={}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Doing</h3>{" "}
          {doingTasks.map((task, idx) => (
            <KanbanCard
              task={task}
              key={idx}
              // renderDemote={}
              // renderEdit={}
              // renderPromote={}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Done</h3>
          {doneTasks.map((task, idx) => (
            <KanbanCard
              task={task}
              key={idx}
              // renderDemote={}
              // renderEdit={}
              // renderPromote={}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Closed</h3>
          {closedTasks.map((task) => (
            <KanbanCard
              task={task}
              key={task}
              renderDemote={true}
              renderEdit={true}
              renderPromote={false}
            />
          ))}
        </div>
      </div>
      {tasks.length === 0 && <h3>This application currently has no tasks.</h3>}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
