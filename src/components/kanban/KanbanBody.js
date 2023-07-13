import { ToastContainer } from "react-toastify";
import KanbanCard from "./KanbanCard";
import "./kanbanbody.css";
import { TASK_STATES } from "../../constants/taskState";

export default function KanbanBody(props) {
  const { tasks, planName, appAcronym } = props;

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

  // Sort the tasks in this function
  return (
    <div>
      <div className="kanban-body-container">
        <div className="kanban-body-column">
          <div>
            <h3>Open</h3>
            {openTasks.map((task) => (
              <KanbanCard
                task={task}
                planName={planName}
                appAcronym={appAcronym}
              />
            ))}
          </div>
        </div>
        <div className="kanban-body-column">
          <h3>Todo</h3>
          {todoTasks.map((task) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Doing</h3>{" "}
          {doingTasks.map((task) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
            />
          ))}
        </div>
        <div className="kanban-body-column">
          <h3>Done</h3>
          {doneTasks.map((task) => (
            <KanbanCard
              task={task}
              planName={planName}
              appAcronym={appAcronym}
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
            />
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
