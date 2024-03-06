import Daily from "@daily-co/daily-js";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Empty, Form, Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AxiosSecure from "../../Hook/useAxios";
import { handelAxiosSuccess } from "../../Components/ExtraFunc/handelAxiosSuccess";
import { handleAxiosError } from "../../Components/ExtraFunc/handelAxiosError";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import { useEffect } from "react";

const Meet = () => {
  const navigate = useNavigate();
  const params = useParams();
  const caxios = AxiosSecure();
  const queryMeeting = useQuery({
    queryKey: ["EventDetails", params.id],
    queryFn: async () => {
      const res = await caxios.get(`/meeting?id=${params.id}&type=single`);
      return res.data;
    },
    enabled: !!params.id,
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: 0,
  });
  useEffect(()=>{
    const framediv= document.getElementById("framediv")
    console.log("~ framediv", framediv)
    if (framediv) {
      framediv.firstChild?.remove()
    }
  },[])
  const mutationCheckAttendee = useMutation({
    mutationFn: async (email: string) => {
      const res = await caxios.post(`/checkattendee`, {
        email: email,
        eventid: params.id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      handelAxiosSuccess(data);
      const behide = document.getElementById("behide");
      if (behide) {
        behide.style.display = "none";
      }
      const MY_IFRAME = document.createElement('iframe');
      MY_IFRAME.setAttribute(
        'allow',
        'microphone; camera; autoplay; display-capture'
      );
      MY_IFRAME.setAttribute(
        'class',
        'w-full h-screen'
      )
      const callProperties = {
        url: queryMeeting.data.meetLink.url,
        showLeaveButton: true,
        
      };
      const framediv=document.getElementById("framediv")
      framediv?.appendChild(MY_IFRAME)
      const call = Daily.wrap(MY_IFRAME, callProperties);
      call.destroy();
      call.join();
      call.on("left-meeting", () => {
        navigate("/");
        call.destroy();
      });
      // const callFrame = Daily.createFrame({
      //   showLeaveButton: true,
      // iframeStyle: {

      //   width: "100%",
      //   height: "100vh",
      // },
      // });
      // callFrame.join({ url: queryMeeting.data.meetLink.url });
      // callFrame.on('left-meeting', () => {
      //   navigate("/")
      //   callFrame.destroy()
      //  });
    },
    onError: (err: AxiosError) => {
      handleAxiosError(err);
    },
  });
  async function FormOnFinish(values: any) {
    await mutationCheckAttendee.mutateAsync(values.email);
  }

  if (params.id) {
    return (
      <>
      <div id="framediv">

      </div>
        <div className="mx-auto mt-3 w-1/2 h-full">
          <Spin
            spinning={queryMeeting.isLoading || mutationCheckAttendee.isPending}
          >
            <Card id="behide">
              <p className="text-lg font-bold">{queryMeeting.data?.title}</p>
              <div className="text-gray-600 mt-5 border border-[#d6d1ff] lg:w-full min-h-40 max-h-full rounded-md">
                <ReactQuill
                  theme="snow"
                  value={queryMeeting.data?.desc}
                  modules={{ toolbar: false }}
                  readOnly
                />
              </div>
              <p></p>
              <div className="w-full">
                <h4 className="font-bold text-sm text-gray-400 ml-1 my-1.5">
                  Author Info
                </h4>
                <div className="flex items-center gap-3 border border-[#d6d1ff] px-3 py-1.5 rounded-md">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={queryMeeting.data?.createdBy?.img_profile}
                    alt="author-image"
                  />
                  <div className="flex flex-col truncate">
                    <h2 className="font-semibold dark:text-dw text-gray-600">
                      {queryMeeting.data?.createdBy?.name}
                    </h2>
                    <h3 className="text-xs font-medium dark:text-dw text-[#713acf]">
                      {queryMeeting.data?.createdBy?.email}
                    </h3>
                  </div>
                </div>
              </div>
              <Form layout="vertical" onFinish={FormOnFinish}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                  validateTrigger="onBlur"
                >
                  <Input />
                </Form.Item>
                <div className="flex justify-center">
                  <Button htmlType="submit">JOIN</Button>
                </div>
              </Form>
              <p>{dayjs(queryMeeting.data?.createdAt).format("DD/MM/YYYY")}</p>
            </Card>
          </Spin>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Empty
          description="Invalid URL"
          className="flex flex-col items-center justify-center"
        />
      </>
    );
  }
};

export default Meet;

//https://timeforge.daily.co/${params.name}

// import Daily from "@daily-co/daily-js";

//   const callFrame = Daily.createFrame({
//     showLeaveButton: true,
//     iframeStyle: {
//       width: "100%",
//       height: "100vh",
//     },
//   });
//   callFrame.join({ url: `https://timeforge.daily.co/${params.name}` });
//   callFrame.on("call-instance-destroyed", (event) => {
//     console.log(event);
//   });

//   const rtcProps = {
//       appId: 'aca82a0dc6004887af5becc298455337',
//       channel: 'test',
//       token: null, // enter your channel token as a string
//     };
