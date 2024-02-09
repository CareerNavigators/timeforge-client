import { useQuery } from "@tanstack/react-query";
import SingleEvent from "./SingleEvent";
import useAxios from "../../Hook/useAxios";
import { Spin } from "antd";
import showToast from "../../Hook/swalToast";

export interface EventType {
  _id: string;
  title: string;
  duration: string;
  eventType: string;
  attendee: string;
  camera: boolean;
  mic: boolean;
  desc: string;
  events: object;
  name: string;
  email: string;
  slot: keyof object;
}

const AllEvents: React.FC = () => {
  const customAxios = useAxios();

  // fetching all events
  const {
    data: allEvents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllEvents"],
    queryFn: async () => {
      const res = await customAxios.get(
        "/meeting?id=65afa0d20cd675ad26b7669a&type=all"
      );
      return res.data;
    },
  });

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
      <div className="flex items-center mx-auto">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {allEvents && allEvents.length > 0 ? (
        allEvents.map((item: EventType) => (
          <>
            <h1 className="text-center bg-gradient-to-r from-green-300 to-[#5038ED] my-5 bg-clip-text text-3xl font-extrabold text-transparent">
              All Events Are Displayed Below
            </h1>
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
