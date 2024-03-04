import { Button, Spin } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import AxiosSecure from "../../Hook/useAxios";
import { useMutation } from "@tanstack/react-query";
import showToast from "../../Hook/swalToast";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthorization from "./useAuthorization";
type Props = {
  access_type?: string;
};
const Authorization = ({ access_type = "offline" }: Props) => {
  const location = useLocation();
  const { userData, loading } = useContext(AuthContext);
  const caxios = AxiosSecure();
  const mutationAuthorization = useMutation({
    mutationFn: async () => {
      let uri = `/authorization?route=${location.pathname}&access_type=${access_type}`;
      if (access_type != "online") {
        uri += `&id=${userData._id}`;
      }
      const res = await caxios.get(uri);
      return res.data;
    },
    onSuccess: (data) => {
      window.location = data;
    },
    onError: (err) => {
      console.log(err);
      showToast("error", "Something Error");
    },
  });
  const authorization =useAuthorization()
  function googleCal() {
    Swal.fire({
      title:"Google Calendar Integration",
      text:"Do you want to connect with google calendar?",
      icon:"question",
      confirmButtonText:"Yes",
      showDenyButton:true,
    }).then(result=>{
      if (result.isConfirmed) {
        authorization.mutate(userData._id)
      }
    })
  }
  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large"></Spin>
        </div>
      ) : (
        <Button
          type="primary"
          onClick={() => googleCal()}
          disabled={mutationAuthorization.isPending}
        >
          Authorize with Google
        </Button>
      )}
    </div>
  );
};

export default Authorization;
