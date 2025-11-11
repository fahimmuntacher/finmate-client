import axios from "axios";

const instane = axios.create({
  baseURL: "https://finmate-server.vercel.app",
});

const useAxios = () => {
  return instane;
};

export default useAxios;
