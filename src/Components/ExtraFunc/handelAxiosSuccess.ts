import showToast from "../../Hook/swalToast";

export const handelAxiosSuccess = (data?:any, msg?: string) => {
  if (msg && msg != "") {
    showToast("success", msg);
  } else if (data && data?.msg) {
    showToast("success", data.msg);
  }else{
    console.log("handelAxiosSuccess Wrong Parameter");
  }
};
