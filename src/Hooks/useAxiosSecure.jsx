import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      console.log(config);
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }

      return config;
    });

    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }
        console.log(err);
      }
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, signOutUser]);

  return instance;
};

export default useAxiosSecure;
