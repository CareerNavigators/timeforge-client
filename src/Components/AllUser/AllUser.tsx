import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import showToast from "../../Hook/swalToast";
import { FaUsers } from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import "./AllUser.css";

const AllUser = () => {
  const customAxios = useAxios();
  const MAX_API_CALLS = 2;
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllParticipants"],
    queryFn: async () => {
      const res = await customAxios.get("/admin/users");
      return res.data;
    },
    retry: MAX_API_CALLS - 2,
    refetchOnWindowFocus:false,
  });

  const handleUserUpdate = (id: string) => {
    console.log("id", id);
    customAxios.patch(`/user/${id}`).then((res) => {
      const data = res.data;
      console.log("updated", data);
      showToast("success", "User Updated");
      refetch();
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-[5%]">
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
        margin: "0 auto",
        marginTop: "10px",
      }}
      className="w-full px-10 rounded-md p-2 lg:m-5 overflow-auto scroll-smooth"
    >
      <div className="my-2 text-xl font-extrabold">
        <div className="flex flex-row items-center justify-center gap-2">
          <FaUsers></FaUsers>
          <h1>
            All Users :{" "}
            <span className="text-[#7c3aed]">{allUsers?.length}</span>
          </h1>
        </div>
      </div>
      <div className="w-full">
        {/* table area */}
        {allUsers?.length > 0 ? (
          <table className="min-w-full divide-y-2 bg-white text-sm shadow-md border-2">
            {/* table heading */}
            <thead className="font-bold bg-[#ede3ff] text-center">
              <tr className="text-center">
                <th className="px-4 py-2 text-gray-900">Name</th>
                <th className="px-4 py-2 text-gray-900">Email</th>
                <th className="px-4 py-2 text-gray-900">Total Meetings</th>
                <th className="px-4 py-2 text-gray-900">Role</th>
                <th className="px-4 py-2 text-gray-900">Update</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className="divide-y divide-gray-200">
              {allUsers?.map((data: any) => {
                return (
                  <tr key={data?._id} className="text-center">
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {data?.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{data?.email}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {data?.totalMeeting}
                    </td>
                    {data.role === "Admin" ? (
                      <td className="px-4 py-2 text-gray-700">
                        <span className="text-white bg-[#7c3aed] px-2 py-1 rounded">
                          {data?.role}
                        </span>
                      </td>
                    ) : (
                      <td className="px-4 py-2 text-gray-700">
                        <span className="text-white bg-[#5FBDFF] px-2 py-1 rounded">
                          {data?.role}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleUserUpdate(data?._id)}
                        className="p-2 text-lg text-[#7c3aed] hover:text-xl hover:transition-all"
                      >
                        <PlusCircleOutlined />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-sm my-5 font-medium">No Users Yet</p>
        )}
      </div>
    </div>
  );
};

export default AllUser;
