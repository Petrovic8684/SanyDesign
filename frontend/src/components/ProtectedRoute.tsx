import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkToken() {
      const valid = await verifyToken();
      setIsValid(valid);
    }

    checkToken();
  }, []);

  if (isValid === null) return <div className="bg-rose-50"></div>;

  if (!isValid) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
