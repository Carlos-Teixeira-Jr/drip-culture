import { useUser } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: ReactNode
}

export function PrivateRoute({children}: IPrivateRoute) {
  const {isSignedIn} = useUser();

  if (isSignedIn !== undefined) {
    return (
      isSignedIn ? <>{children}</> : <Navigate to="/forbidden-page" replace />
    ) 
  }
}