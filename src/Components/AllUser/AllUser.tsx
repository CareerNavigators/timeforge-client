import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import showToast from "../../Hook/swalToast";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  });

  const handleUserDelete = (id: string) => {
    console.log("id", id);
    customAxios.delete(`/admin/users/${id}`).then((res) => {
      const data = res.data;
      console.log("deleted", data);
      showToast("success", "User Deleted");
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
      }}
      className="max-w-full rounded-md p-2 lg:m-5 overflow-auto scroll-smooth"
    >
      <div className=" my-2 text-xl font-extrabold">
        <div className="flex flex-row items-center justify-center gap-2">
          <FaUsers></FaUsers>
          <h1>
            All Users -{" "}
            <span className="text-[#7c3aed]">{allUsers?.length}</span>
          </h1>
        </div>
      </div>
      <div className="">
        {/* table area */}
        {allUsers?.length > 0 ? (
          <table className="min-w-full divide-y-2 bg-white text-sm">
            {/* table heading */}
            <thead className="font-bold bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-gray-900">Name</th>
                <th className="text-left px-4 py-2 text-gray-900">Email</th>
                <th className="text-left px-4 py-2 text-gray-900">Role</th>
                <th className="text-left px-4 py-2 text-gray-900">Remove</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className="divide-y divide-gray-200">
              {allUsers?.map((data: any) => {
                return (
                  <tr key={data?._id}>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {data?.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{data?.email}</td>
                    <td className="px-4 py-2 text-gray-700">{data?.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleUserDelete(data?._id)}
                        className="p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
                      >
                        <FaRegTrashAlt></FaRegTrashAlt>
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
