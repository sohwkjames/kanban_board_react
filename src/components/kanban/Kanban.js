import { useParams } from "react-router-dom";
import KanbanHeader from "./KanbanHeader";

export default function Kanban() {
  const { planName } = useParams();
  return (
    <>
      <KanbanHeader />
      {planName && <div>Selected plan is {planName}</div>}
    </>
  );
}
