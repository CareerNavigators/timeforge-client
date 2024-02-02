import Swal, { SweetAlertIcon } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function showToast(icon: SweetAlertIcon, title: string): void {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
      title: "dark:text-dw",
      timerProgressBar: "dark:bg-dt",
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
}
