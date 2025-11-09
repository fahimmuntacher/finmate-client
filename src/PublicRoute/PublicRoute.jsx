import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate()
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (!user) {
    return children;
  }
  return navigate("/my-profile")
};

export default PublicRoute;
