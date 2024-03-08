import showToast from "../../Hook/swalToast";
import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response?.data) {
    const data = error.response.data as { msg: string };
    showToast("error", data.msg);
  } else {
    showToast("error", error.message);
  }
};
