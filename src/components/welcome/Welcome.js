import { useEffect } from "react";
import { testingBackend } from "../../urls/auth";

export default function Welcome() {
  useEffect(() => {
    async function hitBackend() {
      const result = await testingBackend();
    }

    hitBackend();
  }, []);

  return <div>Welcome!</div>;
}
