import axios from "axios";
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_API}`,
});
const AxiosSecure = () => {
  return axiosSecure;
};
export default AxiosSecure;
