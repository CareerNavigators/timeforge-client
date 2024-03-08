import { useLocation, useNavigate } from "react-router-dom";
import AxiosSecure from "../../Hook/useAxios";
import { Spin } from "antd";
import {useQuery } from "@tanstack/react-query";
import showToast from "../../Hook/swalToast";
const OauthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caxios = AxiosSecure();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");
  let paresedState: { id: string; route: string,access_type:string }|null = null;
  if (state) {
    const decodedString = decodeURIComponent(state);
    paresedState = JSON.parse(decodedString);
  }
  const queryInsertToken = useQuery({
    queryKey: ["tokenization"],
    queryFn: async () => {
      const res = await caxios.post("/insertToken", {
        code: code,
        id: paresedState?.id,
      });
      return res.data;
    },
    enabled:paresedState?.access_type=="offline",
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry:0,
  });
  const queryStoreToken=useQuery({
    queryKey:["token"],
    queryFn:async()=>{
      const res= await caxios.post(`/getToken`,{
        code:code
      })
      sessionStorage.setItem("token",res.data.token)
      sessionStorage.setItem("exptime",res.data.exptime)
      return res.data
    },
    enabled:paresedState?.access_type=="online",
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry:0,
  })
  if ((!queryInsertToken.isLoading && queryInsertToken.isSuccess) || (!queryStoreToken.isLoading && queryStoreToken.isSuccess)) {
    if (paresedState) {
      navigate("/dashboard");
    }
  } else if (queryInsertToken.isError) {
    showToast("error", queryInsertToken.error.message);
    navigate("/");
  }else if (queryStoreToken.isError) {
    showToast("error", queryStoreToken.error.message);
    navigate("/");
  }

  return (
    <div className="w-full h-svh">
      <p className="text-center mb-7">Google Authentication done</p>
      <div className="flex justify-center">
        <Spin size="large"> </Spin>
      </div>
      <p className="text-center mt-7">Redirecting...</p>
    </div>
  );
};

export default OauthCallback;
