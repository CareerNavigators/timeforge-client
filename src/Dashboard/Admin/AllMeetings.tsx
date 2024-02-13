import 'ka-table/style.css';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortDirection, SortingMode } from 'ka-table/enums';
import AxiosSecure from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Meeting, Column } from './AllTypes';
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import moment from 'moment';
import { Button, Modal } from 'antd';
import { useState } from 'react';
const AllMeetings = () => {
    const caxios = AxiosSecure()
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = (id: string) => {
        console.log(id);
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const allMeetings = useQuery({
        queryKey: ['allevents'],
        queryFn: async () => {
            const res = await caxios.get("/admin/meetings")
            return res.data as Meeting[]
        }
    })
    const columns = [
        {
            key: "title",
            title: "Title",
            dataType: DataType.String,
            sortDirection: SortDirection.Descend,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "duration",
            title: "Duration",
            dataType: DataType.String,
            isEditable: false,
        },
        {
            key: "createdBy",
            title: "Created By",
            isEditable: false,
        },
        {
            key: "eventType",
            title: "Event Type",
            dataType: DataType.String,
            isEditable: false,
        },
        {
            key: "camera",
            title: "Camera",
            dataType: DataType.Boolean,
            isEditable: false,
        },
        {
            key: "mic",
            title: "Microphone",
            dataType: DataType.Boolean,
            isEditable: false,
        },
        {
            key: "attendee",
            title: "Attendee",
            dataType: DataType.Number,
            isEditable: false,
        },
        {
            key: "createdAt",
            title: "Created At",
            dataType: DataType.String,
            isEditable: false,
        },
        {
            key: "action",
            title: "Action",
            dataType: DataType.String,
            isEditable: false,

        }

    ]
    const format = ({ column, rowData }: { column: Column, rowData: Meeting }) => {
        if (column.key == "createdAt") {
            return moment(rowData.createdAt).format("MMM Do YY, h:mm a").toString()
        } else if (column.key == "mic") {
            if (rowData.mic) {
                return <AudioOutlined />
            } else {
                return <AudioMutedOutlined />
            }
        } else if (column.key == "camera") {
            if (rowData.camera) {
                return <FaVideo />
            } else {
                return <FaVideoSlash />
            }
        } else if (column.key == "action") {
            return <Button className='bg-[#1677ff] text-white' onClick={() => {
                showModal(rowData._id)
            }}>See More </Button>
        } else if (column.key == "createdBy") {
            // you have the user _id. you can implement 
            return rowData.createdBy?.name
        }
    }
    return (
        <div>
            <Table
                noData={{
                    text: "No Meetings Found"
                }}
                loading={{
                    enabled: allMeetings.isLoading || allMeetings.isRefetching,
                    text: "Loading..."
                }}
                // @ts-expect-error noidea
                format={format}
                columns={columns}
                data={allMeetings.data}
                editingMode={EditingMode.Cell}
                rowKeyField={'_id'}
                sortingMode={SortingMode.Single}
            />
            <Modal width={800} title="Meetings Modal" confirmLoading={allMeetings.isPending} destroyOnClose={true} onCancel={handleCancel} footer={null} open={isModalOpen} >
                <div className='flex gap-4 justify-center'>
                    <Button className='bg-light-blue-500 text-white' htmlType='submit'>Update</Button>
                    <Button onClick={handleCancel}>Close</Button>
                </div>

            </Modal>
        </div>
    );
};

export default AllMeetings;