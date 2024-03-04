import AxiosSecure from "../../Hook/useAxios";
import { useMutation } from "@tanstack/react-query";
import showToast from "../../Hook/swalToast";
import { AxiosError } from "axios";
const useAuthorization = () => {
 const caxios = AxiosSecure();
 const mutationAuthorization = useMutation({
    mutationFn: async (userid : string) => {
      if (userid=="" || !userid) {
        throw new Error("Invalid userid");
      }
      const uri = `/authorization?route=${location.pathname}&access_type=offline&id=${userid}`;
      const res = await caxios.get(uri);
      return res.data;
    },
    onSuccess: (data) => {
      window.location=data
    },
    onError: (err:AxiosError) => {
      if (err.response?.data) {
        const data = err.response.data as {msg:string};
        showToast("error",data.msg);
      }else{
        showToast("error",err.message);
      }
    },
    retry: 3,
 });
 return mutationAuthorization;
};

export default useAuthorization;
