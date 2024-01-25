import axios from "axios";
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_API}`,
});
const useAxiosSecure = () => {
  return axiosSecure;
};
export default useAxiosSecure;
