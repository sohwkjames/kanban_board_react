import { Button, Divider, Table } from "antd";
import Page from "../page/Page";
import { useEffect, useState } from "react";
import { getApplications } from "../../urls/applications";
import { checkGroup } from "../../urls/userGroups";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";
import "./applications.css";
import { useNavigate } from "react-router-dom";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [isProjectLead, setIsProjectLead] = useState(false);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Applications.js useEffect firing");
    getApplicationsData();
    checkIfProjectManager();
  }, []);

  async function getApplicationsData() {
    const response = await getApplications();
    if (response.success) {
      const dataWithKey = response.data.map((record) => {
        return { ...record, key: record.App_Acronym };
      });
      setApplications(dataWithKey);
    }
  }

  async function checkIfProjectManager() {
    const response = await checkGroup("projectManager");
    if (response.success) {
      setShowCreateButton(true);
    } else {
      setShowCreateButton(false);
    }
  }

  const columns = [
    {
      title: "App Acronym",
      dataIndex: "App_Acronym",
      key: "App_Acronym",
    },
    {
      title: "App Description",
      dataIndex: "App_description",
      key: "App_description",
    },
    {
      title: "App R Number",
      dataIndex: "App_rnumber",
      key: "App_description",
    },

    {
      title: "App Start Date",
      dataIndex: "App_startdate",
      key: "App_startdate",
    },
    {
      title: "App End Date",
      dataIndex: "App_enddate",
      key: "App_enddate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => {
            console.log("record", record);
            navigate("/applications/" + record.App_Acronym);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (warning) {
    return (
      <UnverifiedUser message="You do not have permission to access this resource" />
    );
  }

  return (
    <Page>
      <div className="application-nav">
        <h3>Applications</h3>
        <Button type="primary" onClick={() => navigate("/applications/create")}>
          Create application
        </Button>
      </div>

      <Table dataSource={applications} columns={columns} />
    </Page>
  );
}
