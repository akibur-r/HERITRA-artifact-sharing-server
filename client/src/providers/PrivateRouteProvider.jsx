import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";

const PrivateRouteProvider = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <LoaderLogoSpinner className={"h-48 my-10"} />;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/sign-in"></Navigate>;
};

export default PrivateRouteProvider;
