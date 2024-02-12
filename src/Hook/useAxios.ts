import axios from "axios";
const axiosSecure = axios.create({
  // baseURL: `${import.meta.env.VITE_BACK_END_API}`,
  baseURL:'http://localhost:5111'
});
const AxiosSecure = () => {
  return axiosSecure;
};
export default AxiosSecure;
