import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkGroup } from "../../urls/userGroups";
import { Button } from "antd";
import "./kanban.css";
import Page from "../page/Page";

export default function Kanban(props) {
  const [createPlanVisible, setCreatePlanVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    checkIsProjectManager();
  }, []);
  const { appAcronym } = useParams();

  console.log("appACronym", appAcronym);

  async function checkIsProjectManager() {
    const isProjectManager = await checkGroup("projectManager");
    if (isProjectManager.success) {
      setCreatePlanVisible(true);
    }
  }

  return (
    <Page>
      <div className="heading">
        <h3 className="appname">Application: {appAcronym}</h3>
        <div className="right-side">
          <div className="date">
            <p>Start date: </p>
            <p>End date: </p>
          </div>
          <div className="planlist">Plan list</div>
          <div className="buttons">
            <Button
              onClick={() => navigate(`/plans/create/${appAcronym}`)}
              type="primary"
            >
              Create Plan
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
