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
  const MAX_API_CALLS = 2;
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
  const handleEventDelete = (id: string) => {
    console.log("event id", id);
    customAxios.delete(`/meeting/${id}`).then((res) => {
      const data = res.data;
      console.log(data);
      showToast("success", "Event Deleted");
      refetch();
    });
  };

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
    <div className="max-w-screen-xl mx-auto">
      {allEvents && allEvents.length > 0 ? (
        allEvents.map((item: EventType) => (
          <>
            <div className="grid grid-cols-1 gap-10 px-2 my-10 md:grid-cols-2 lg:grid-cols-3">
              <SingleEvent
                key={item._id}
                item={item}
                handleEventDelete={handleEventDelete}
              />
            </div>
          </>
        ))
      ) : (
        <p className="flex items-center justify-center h-screen text-lg text-gray-500">
          No Events Found
        </p>
      )}
    </div>
  );
};

export default AllEvents;
