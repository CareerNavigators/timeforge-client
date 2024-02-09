import { useQuery } from "@tanstack/react-query";
import SingleEvent from "./SingleEvent";
import useAxios from "../../Hook/useAxios";
import { Spin } from "antd";
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
  const {
    data: allEvents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllEvents"],
    queryFn: async () => {
      const res = await customAxios.get(
        `/meeting?id=${userData?._id}&type=all`
      );
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
          size="large"></Spin>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-20 xl:mx-32">
      <h1 className="my-5 text-2xl font-extrabold text-center">
        Events of <span className="text-[#5038ED]">{userData?.name}</span>
      </h1>
      <div className="grid grid-cols-1 gap-5 px-2 my-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allEvents && allEvents.length > 0 ? (
          allEvents.map((item: EventType) => (
            <SingleEvent
              key={item._id}
              item={item}
              handleEventDelete={handleEventDelete}
            />
          ))
        ) : (
          <div>No Events Found</div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
