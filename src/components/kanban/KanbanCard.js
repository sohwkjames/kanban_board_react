import { useNavigate } from "react-router-dom";
import "./kanbancard.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
export default function KanbanCard(props) {
  const { task, renderEdit, renderPromote, renderDemote } = props;
  const navigate = useNavigate();

  return (
    <div
      style={{ borderLeft: `10px solid ${task.Plan_colour}` }}
      className="card"
    >
      <span
        className="card-title"
        style={{ fontSize: "1.2em" }}
        onClick={() => navigate(`/tasks/view/${task.Task_id}`)}
      >
        {task.Task_name}
      </span>

      <span style={{ color: "grey" }}>Task id: {task.Task_id}</span>
      <span style={{ color: "grey" }}>Owner: {task.Task_owner}</span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "auto",
        }}
      >
        <CaretLeftOutlined
          onClick={() => navigate(`/tasks/demote/${task.Task_id}`)}
          style={{
            fontSize: "150%",
            visibility: renderDemote ? "visible" : "hidden",
          }}
        />
        <span
          style={{
            cursor: "pointer",
            visibility: renderEdit ? "visible" : "hidden",
          }}
          onClick={() => navigate(`/tasks/edit/${task.Task_id}`)}
        >
          Edit
        </span>
        <CaretRightOutlined
          style={{
            fontSize: "150%",
            visibility: renderPromote ? "visible" : "hidden",
          }}
          onClick={() => navigate(`/tasks/promote/${task.Task_id}`)}
        />
      </div>
    </div>
  );
}
