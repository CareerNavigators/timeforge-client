import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios"
import showToast from "../../Hook/swalToast";
import { EventType } from "../AllEvents/AllEvents";
import dayjs from "dayjs";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface AllParticipantsProps {
    id: string;
}

const AllParticipants: React.FC<AllParticipantsProps> = ({ id }) => {
    const customAxios = useAxios()
    dayjs.extend(customParseFormat);

    const MAX_API_CALLS = 2;

    // fetching all participants
    const { data: allParticipants = [], isLoading, refetch } = useQuery({
        queryKey: ["AllParticipants"],
        queryFn: async () => {
            const res = await customAxios.get(`attendee?id=${id}`);
            return res.data;
        },
        enabled: id != undefined ? true : false,
        retry: MAX_API_CALLS - 2
    });

    // deleting a participant
    const handleParticipantDelete = (id: string) => {
        console.log("id", id);
        customAxios.delete(`/attendee/${id}`).then((res) => {
            const data = res.data;
            console.log("deleted", data);
            showToast("success", "Attendee removed");
            refetch();
        });
    };

    // show this loader if data is loading
    if (isLoading) {
        return <div className="flex items-center justify-center my-[5%]">
            <Spin indicator={<LoadingOutlined></LoadingOutlined>} size="large"></Spin>
        </div>
    }

    return (
        <div className="max-w-full shadow-md rounded-md p-2 lg:m-5 overflow-hidden">
            <div className="text-[#7c3aed] my-2 text-xl font-extrabold">
                <div className="flex flex-row items-center justify-center gap-2">
                    <FaUsers></FaUsers>
                    <h1> Participants</h1>
                </div>
            </div>
            <div className="overflow-x-auto p-8">
                {/* table area */}
                {
                    allParticipants?.length > 0 ? <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        {/* table heading */}
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
                                    Index
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
                                    Name
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
                                    Email
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
                                    Date
                                </th>
                                <th className="text-left px-4 py-2 font-medium text-gray-900">
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
                                    <tr key={data._id}>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 font-medium text-gray-900">{data.name}</td>
                                        <td className="px-4 py-2 text-gray-700">{data.email}</td>
                                        <td className="px-4 py-2 text-gray-700">{formattedDate}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {data.slot[dateStr][0]}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleParticipantDelete(data._id)}
                                                className="p-2 text-lg rounded text-red-500 hover:bg-red-500/10 hover:transition-all hover:duration-300"
                                            >
                                                <FaRegTrashAlt></FaRegTrashAlt>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> : <p className="text-center text-sm my-5 font-medium">No Participants Yet</p>
                }
            </div>
        </div>
    );
};

export default AllParticipants;