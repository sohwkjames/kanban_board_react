import { useEffect, useState } from "react";

// objective of this hook is to let components read the JWT from local storage very easily.
export default function useJwt() {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    // Check if jwt exist in localStorage. If yes, call setJwt.
  }, []);

  return [jwt, setJwt];
}
