import { useQuery } from "@tanstack/react-query";
import SingleEvent from "./SingleEvent";
import useAxios from "../../Hook/useAxios";
import { Empty, Spin } from "antd";
import showToast from "../../Hook/swalToast";
import { LoadingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

export interface EventType {
  _id: string;
  title: string;
  duration: number | undefined;
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
    refetchOnWindowFocus:false
  });

  // console.log(allEvents);

  // deleting a event
  const handleEventDelete = (id: string) => {
    console.log("event id", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        customAxios.delete(`/meeting/${id}`).then((res) => {
          const data = res.data;
          refetch();
          console.log(data);
          showToast("success", "Event Deleted");
        });
      }
    });
  };

  // show this loader if data is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed left-[45%] top-[50%]">
        <Spin
          indicator={<LoadingOutlined></LoadingOutlined>}
          size="large"
        ></Spin>
      </div>
    );
  }

  return (
    <div
      className="mx-auto overflow-auto scroll-smooth"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h2 className="text-center my-5 text-lg font-medium">
        Event's of
        <span className="text-[#7c3aed] ml-1 font-semibold">
          {userData && userData?.name}
        </span>
      </h2>
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 p-4 mx-auto">
        {allEvents && allEvents.length > 0 ? (
          allEvents.map((item: EventType) => (
            <SingleEvent
              key={item._id}
              item={item}
              handleEventDelete={handleEventDelete}
            />
          ))
        ) : (
          <div className="lg:w-[85vw]">
            <Empty className="flex flex-col items-center justify-center h-screen" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
