import { useEffect, useState } from "react";
import { checkUserGroup } from "../../urls/auth";
import Spinner from "../layout/Spinner";
import UnverifiedUser from "../unverifieduser/UnverifiedUser";

// Only project lead can access this component
export default function CreateTask() {
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleCheckUserGroup();
  }, []);

  async function handleCheckUserGroup() {
    const response = await checkUserGroup("projectLead");
    if (response.success) {
      setLoading(false);
      setBlocked(false);
    } else {
      setLoading(false);
      setBlocked(true);
    }
  }

  if (loading) return <Spinner />;

  if (blocked)
    return (
      <UnverifiedUser message="You do not have permission to access this resource" />
    );

  return <div>This is Create Task</div>;
}
