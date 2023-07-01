import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <LoadingOutlined style={{ fontSize: 48 }} spin />
    </div>
  );
}
