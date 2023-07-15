import KanbanCard from "./KanbanCard";
import "./kanbanbody.css";
import { TASK_STATES } from "../../constants/taskState";
import { ToastContainer } from "react-toastify";

export default function KabanBody(props) {
  const { tasks, planName, appAcronym } = props;

  console.log("kanbanbody props", props);
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
                planName={planName}
                appAcronym={appAcronym}
                key={idx}
              />
            ))}
          </div>
        </div>
        <div className="kanban-body-column">
          <h3>Todo</h3>
          {todoTasks.map((task, idx) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
              key={idx}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Doing</h3>{" "}
          {doingTasks.map((task, idx) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
              key={idx}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Done</h3>
          {doneTasks.map((task, idx) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
              key={idx}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Closed</h3>
          {closedTasks.map((task) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
              key={task}
            />
          ))}
        </div>
      </div>
      {tasks.length === 0 && <h3>This application currently has no tasks.</h3>}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
