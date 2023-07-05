import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditApplication(props) {
  const { appAcronym } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Firing editApplication useEffect");
  }, []);

  return (
    <div>
      Edit App {appAcronym}{" "}
      <Button onClick={() => navigate("/applications")}>
        Back to app list
      </Button>
    </div>
  );
}
