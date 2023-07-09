import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkGroup } from "../../urls/userGroups";
import { Button, Dropdown, Space } from "antd";
import "./kanban.css";
import Page from "../page/Page";
import { getAllPlans } from "../../urls/plans";
import { DownOutlined } from "@ant-design/icons";

export default function KanbanHeader(props) {
  const { appAcronym, planName } = useParams();
  const [createPlanVisible, setCreatePlanVisible] = useState(false);
  const [plans, setPlans] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    checkIsProjectManager();
    getPlans();
  }, []);

  async function checkIsProjectManager() {
    const isProjectManager = await checkGroup("projectManager");
    if (isProjectManager.success) {
      setCreatePlanVisible(true);
    }
  }

  async function getPlans() {
    const plansResponse = await getAllPlans(appAcronym);
    setPlans(plansResponse.data);
    console.log("plansResponse", plansResponse);
  }

  console.log("plans", plans);

  // const plansOptions =

  const items = [
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  const plansMenu = plans.map((p) => {
    return {
      key: p.Plan_mvp_name,
      label: p.Plan_mvp_name,
    };
  });

  const onClick = ({ key }) => {
    // console.log("onclick val", val);
    navigate(`/applications/${appAcronym}/${key}`);
  };

  console.log("items", items);
  console.log("plans", plans);
  console.log("plansDropdownOptions", plansMenu);

  return (
    <Page>
      <div className="heading">
        <h3 className="appname">Application: {appAcronym}</h3>
        <div className="right-side">
          <div className="date">
            <p>Start date: </p>
            <p>End date: </p>
          </div>
          <div className="planlist">
            <Dropdown
              menu={{
                items: plansMenu,
                onClick,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                {" "}
                <Space>
                  {planName ? planName : "Select Plan"}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
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
