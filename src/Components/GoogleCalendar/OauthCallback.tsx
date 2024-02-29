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
  let paresedState: { id: string; route: string }|null = null;
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
    gcTime: 0,
    refetchOnMount: false,
    retry:2,
    retryDelay:2000
  });
  if (!queryInsertToken.isLoading && queryInsertToken.isSuccess) {
    if (paresedState) {
      navigate(paresedState.route);
    }
  } else if (queryInsertToken.isError) {
    showToast("error", queryInsertToken.error.message);
  }
//   const mutationInsertToken = useMutation({
//     mutationFn: async () => {
//       const res = await caxios.post("/insertToken", {
//         code: code,
//         id: paresedState.id,
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       navigate(paresedState.route);
//     },
//     onError: (err) => {
//       showToast("error", err.message);
//     },
//     retry: 2,
//   });
  //   useEffect(() => {
  //     mutationInsertToken.mutate();
  //   }, []);
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
