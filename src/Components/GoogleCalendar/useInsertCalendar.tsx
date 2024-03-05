import { useMutation } from "@tanstack/react-query";
import AxiosSecure from "../../Hook/useAxios";
import showToast from "../../Hook/swalToast";
import { AxiosError } from "axios";
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
    retry: 3,
    onSuccess: (data) => {
      showToast("success", data.msg);
    },
    onError: (err: AxiosError) => {
      if (err.response?.data) {
        const data = err.response.data as { msg: string };
        showToast("error", data.msg);
      } else {
        showToast("error", err.message);
      }
    },
  });
  return mutationAddCalendar;
};

export default useInsertCalendar;
