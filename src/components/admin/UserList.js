import { Table } from "antd";
import { ConfigProvider } from "antd";
export default function UserList({ users }) {
  const columns = [
    { title: "username", dataIndex: "username", key: "username" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "user group", dataIndex: "userGroup", key: "userGroup" },
  ];

  return (
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary: "#1D3557",
    //       // colorFillSecondary: "#A8DADC",
    //     },
    //   }}
    // >
    <Table dataSource={users} columns={columns} />
    // </ConfigProvider>
  );
}
