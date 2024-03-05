import AxiosSecure from "../../Hook/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { handleAxiosError } from "../ExtraFunc/handelAxiosError";
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
      handleAxiosError(err)
    },
    retry: 3,
 });
 return mutationAuthorization;
};

export default useAuthorization;
