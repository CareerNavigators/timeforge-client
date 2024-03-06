import Daily from "@daily-co/daily-js";
import { useEffect } from "react";

const Meet = () => {
    useEffect(()=>{
        const callFrame = Daily.createFrame({
            showLeaveButton: true,
            iframeStyle: {
              width: "100%",
              height: "100vh",
            },
          });
          callFrame.join({ url: `https://timeforge.daily.co/OrQkEyA5UXy3i1IS17KP` });
    },[])

  return <>
  </>;
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
