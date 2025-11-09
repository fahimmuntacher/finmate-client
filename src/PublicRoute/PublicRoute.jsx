import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import Spinner from "../Components/Spinner/Spinner";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate()
  if (loading) {
    return <Spinner></Spinner>;
  }
  if (!user) {
    return children;
  }
  return navigate("/my-profile")
};

export default PublicRoute;
