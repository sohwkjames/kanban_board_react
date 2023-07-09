import { useLocation, useSearchParams } from "react-router-dom";

export default function TaskManagement() {
  const [searchParams] = useSearchParams();

  return <div>Task management here</div>;
}
