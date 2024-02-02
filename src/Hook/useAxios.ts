import axios from "axios";
const axiosSecure = axios.create({
  // baseURL: `${import.meta.env.VITE_BACK_END_API}`,
  baseURL: 'https://nt-via-allied-municipal.trycloudflare.com',
});
const AxiosSecure = () => {
  return axiosSecure;
};
export default AxiosSecure;
