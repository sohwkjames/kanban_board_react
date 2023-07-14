import { useNavigate } from "react-router-dom";
import "./kanbancard.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
export default function KanbanCard(props) {
  const { task, appAcronym, planName, planColour } = props;
  const navigate = useNavigate();

  return (
    <div
      style={{ borderLeft: `10px solid ${task.Plan_colour}` }}
      className="card"
    >
      <span>Plan Colour: {task.Plan_colour}</span>

      <span>Task id: {task.Task_id}</span>
      <span style={{ fontSize: "1.2em" }}>Task name: {task.Task_name}</span>
      <p>Owner: {task.Task_owner}</p>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CaretLeftOutlined
          onClick={() => navigate(`/tasks/demote/${task.Task_id}`)}
          style={{ fontSize: "150%" }}
        />
        <span onClick={() => navigate(`/tasks/edit/${task.Task_id}`)}>
          Edit
        </span>
        <CaretRightOutlined
          style={{ fontSize: "150%" }}
          onClick={() => navigate(`/tasks/promote/${task.Task_id}`)}
        />
      </div>
    </div>
  );
}
