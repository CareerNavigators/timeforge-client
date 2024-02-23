import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { Divider, Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import Timeline, { TimelineData } from "./Timeline";
import "./Timeline.css";

const AllTimeline = () => {
  const customAxios = useAxios();
  const { userData } = useContext(AuthContext);

  console.log(userData?._id);

  const MAX_API_CALLS = 2;

  let apiURL: string;
  if (userData != null) {
    apiURL = `/timeline?id=${userData?._id}&type=all`;
  }

  const { data: allTimelines = [], isLoading } = useQuery({
    queryKey: ["allTimelines"],
    queryFn: async () => {
      const res = await customAxios.get(apiURL);
      return res.data;
    },
    enabled: userData != null ? true : false,
    retry: MAX_API_CALLS - 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed left-[45%] top-[50%]">
        <Spin indicator={<LoadingOutlined />} size="large"></Spin>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h3 className="text-3xl font-bold text-center font-inter my-5">
        <span className="text-[#7c3aed]">{userData?.name}'s</span> Timeline
      </h3>
      <Divider></Divider>
      <div className="flex justify-center gap-4">
        {allTimelines && allTimelines?.length > 0 ? (
          allTimelines?.map((item: TimelineData) => (
            <Timeline key={item._id} item={item} />
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

export default AllTimeline;
