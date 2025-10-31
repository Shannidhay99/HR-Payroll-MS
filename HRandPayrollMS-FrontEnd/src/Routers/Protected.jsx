import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../app/AuthContext";
import Loading from "../components/loading";

export function LoggedIn({ children }) {
  const { user, isLoading, isSuccess } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  } else if (isSuccess && user?.user_type) {
    return children;
  }
  return <Navigate to="/" />;
}

// handle admin route access if the user is not admin redirect to product page
export function Admin({ children }) {
  const { user, isLoading, isSuccess } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  } else if (isSuccess && user?.user_type === "user") {
    return children;
  }
  return <Navigate to="/product" />;
}

// handle the route if the user is already logged in
export function AlreadyLoggedIn({ children }) {
  const { user, isLoading, isSuccess } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  } else if (isSuccess && user?.user_type) {
    return children;
  }
  return <Navigate to="/" />;
}
