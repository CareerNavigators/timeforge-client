import { useMutation } from "@tanstack/react-query";
import AxiosSecure from "../../Hook/useAxios";
import showToast from "../../Hook/swalToast";
import { AxiosError } from "axios";
import { handleAxiosError } from "../ExtraFunc/handelAxiosError";
type SendData = {
  userId: string;
  eventId: string;
};
const useInsertCalendar = () => {
  const caxios = AxiosSecure();
  const mutationAddCalendar = useMutation({
    mutationFn: async (data: SendData) => {
      const res = await caxios.post("/insertcalendar", data);
      return res.data;
    },
    retry: 0,
    onSuccess: (data) => {
      showToast("success", data.msg);
    },
    onError: (err: AxiosError) => {
      handleAxiosError(err)
    },
  });
  return mutationAddCalendar;
};

export default useInsertCalendar;
