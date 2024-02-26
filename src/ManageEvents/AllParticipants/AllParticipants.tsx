import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios"
import showToast from "../../Hook/swalToast";
import { EventType } from "../AllEvents/AllEvents";
import dayjs from "dayjs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FaUserGroup } from "react-icons/fa6";
import Swal from "sweetalert2";


interface AllParticipantsProps {
    id: string | undefined;
}

const AllParticipants: React.FC<AllParticipantsProps> = ({ id }) => {
    const customAxios = useAxios();
    dayjs.extend(customParseFormat);

    const MAX_API_CALLS = 2;

    // fetching all participants
    const { data: allParticipants = [], isLoading, refetch } = useQuery({
        queryKey: ["AllParticipants", id],
        queryFn: async () => {
            const res = await customAxios.get(`attendee?id=${id}`);
            return res.data;
        },
        enabled: id != undefined ? true : false,
        retry: MAX_API_CALLS - 1
    });

    // deleting a participant
    const handleParticipantDelete = (id: string) => {
        console.log("id", id);
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
                customAxios.delete(`/attendee/${id}`).then((res) => {
                    const data = res.data;
                    refetch();
                    console.log("deleted", data);
                    showToast("success", "Attendee removed");
                });
            }
        });
    };

    // show this loader if data is loading
    if (isLoading) {
        return <div className="flex items-center justify-center my-[5%]">
            <Spin indicator={<LoadingOutlined></LoadingOutlined>} size="large"></Spin>
        </div>
    }

    return (
        <div className="max-w-full shadow-md rounded-md mx-1 sm:p-2 my-5 lg:m-5 overflow-hidden border border-[#d6d1ff]">
            <div className="text-[#5038ED] text-xl font-extrabold">
                <div className="flex flex-row items-center justify-center gap-2 mt-5">
                    <FaUserGroup></FaUserGroup>
                    <h1> Participants</h1>
                </div>
            </div>
            <div className="overflow-x-auto sm:px-8 sm:py-4 pb-5">
                {/* table area */}
                {
                    allParticipants?.length > 0 ? <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        {/* table heading */}
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                                    Index
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                                    Name
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
                                    Email
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900 hidden md:table-cell">
                                    Date
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900 hidden md:table-cell">
                                    Time
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
                                    Remove
                                </th>
                            </tr>
                        </thead>

                        {/* table body */}
                        <tbody className="divide-y divide-gray-200">
                            {allParticipants?.map((data: EventType, index: number) => {
                                const dateStr = Object.keys(data.slot).toString();
                                const date = dayjs(dateStr, "DDMMYY");
                                const formattedDate = date.format("DD/MM/YYYY");
                                return (
                                    <tr key={data?._id}>
                                        <td className="px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 font-medium text-gray-900 hidden lg:table-cell">{data?.name}</td>
                                        <td className="px-4 py-2 text-gray-700">{data?.email}</td>
                                        <td className="px-4 py-2 text-gray-700 hidden md:table-cell">{formattedDate}</td>
                                        <td className="px-4 py-2 text-gray-700 hidden md:table-cell">
                                            {data?.slot[dateStr][0]}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleParticipantDelete(data?._id)}
                                                className="p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
                                            >
                                                <FaRegTrashAlt></FaRegTrashAlt>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> : <p className="text-center text-sm my-2 font-medium">No Participants Yet</p>
                }
            </div>
        </div>
    );
};

export default AllParticipants;