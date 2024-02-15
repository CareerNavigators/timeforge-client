import { useQuery } from "@tanstack/react-query";
import SingleEvent from "./SingleEvent";
import useAxios from "../../Hook/useAxios";
import { Empty, Spin } from "antd";
import showToast from "../../Hook/swalToast";
import { LoadingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";

export interface EventType {
  _id: string;
  title: string;
  duration: string;
  eventType: string;
  attendee: string;
  camera: boolean;
  mic: boolean;
  desc: string;
  events: any;
  name: string;
  email: string;
  slot: keyof object;
}

const AllEvents: React.FC = () => {
  const customAxios = useAxios();
  const { userData } = useContext(AuthContext);
  // console.log("database user", userData);

  const MAX_API_CALLS = 2;

  // fetching all events

  let apiURL: string;
  if (userData != null) {
    apiURL = `/meeting?id=${userData?._id}&type=all`;
  }

  const {
    data: allEvents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllEvents"],
    queryFn: async () => {
      const res = await customAxios.get(apiURL);
      return res.data;
    },
    enabled: userData != null ? true : false,
    retry: MAX_API_CALLS - 1,
  });

  // console.log(allEvents);

  // deleting a event
  const handleEventDelete = (id: string) => {
    console.log("event id", id);
    customAxios.delete(`/meeting/${id}`).then((res) => {
      const data = res.data;
      console.log(data);
      showToast("success", "Event Deleted");
      refetch();
    });
  };

  // show this loader if data is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed left-[40%] top-[50%]">
        <Spin
          indicator={<LoadingOutlined></LoadingOutlined>}
          size="large"
        ></Spin>
      </div>
    );
  }

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="grid gap-5 px-2 my-4 mt-10 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-auto"
    >
      {allEvents && allEvents.length > 0 ? (
        allEvents.map((item: EventType) => (
          <SingleEvent
            key={item._id}
            item={item}
            handleEventDelete={handleEventDelete}
          />
        ))
      ) : (
        // <p className="flex items-center justify-center h-screen text-lg text-gray-500">
        //   No Events Found
        // </p>
        <div className="lg:w-[85vw]">
          <Empty className="flex flex-col items-center justify-center h-screen" />
        </div>
      )}
    </div>
  );
};

export default AllEvents;
