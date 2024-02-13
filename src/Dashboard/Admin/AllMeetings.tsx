import 'ka-table/style.css';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortDirection, SortingMode } from 'ka-table/enums';
import AxiosSecure from '../../Hook/useAxios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Meeting, Column, SingleMeeting } from './AllTypes';
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import moment from 'moment';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
const AllMeetings = () => {
    const caxios = AxiosSecure()



    //for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const singleMeetings = useMutation({
        mutationFn: async (id: string) => {
            const res = await caxios.get(`/meeting?id=${id}&type=single`)
            return res.data as SingleMeeting
        }
    })
    const showModal = (id: string) => {
        singleMeetings.mutateAsync(id)
        setIsModalOpen(true);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    async function UpdateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formObject = Object.fromEntries(formData);
        console.log(formObject);
    }
    // for table 
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
            <Modal width={800} title="Meetings Modal" confirmLoading={singleMeetings.isPending} destroyOnClose={true} onCancel={handleCancel} footer={null} open={isModalOpen} >
            <form onSubmit={UpdateUser}>
                {
                    singleMeetings.isSuccess ?
                        
                            <div>
                            <p className='font-semibold'>Title</p>
                            <Input name="title" defaultValue={singleMeetings.data.title}></Input>
                            <p className='font-semibold'>Description</p>
                            <Input.TextArea name='desc'  defaultValue={singleMeetings.data.desc}/>
                            <p className='font-semibold'>Duration</p>
                            <Input name='duration'  defaultValue={singleMeetings.data.duration}/>
                            <p className='font-semibold'>Attendee</p>
                            <Input name='attendee'  defaultValue={singleMeetings.data.attendee}/>
                            <p className='font-semibold'>Event Type</p>
                            <Input name='eventType'  defaultValue={singleMeetings.data.eventType}/>
                            <p className='font-semibold'>Camera</p>
                            <Input name='camera'  defaultValue={String(singleMeetings.data.camera)}/>
                            <p className='font-semibold'>Microphone</p>
                            <Input name='mic'  defaultValue={String(singleMeetings.data.mic)}/>
                            <p className='font-semibold'>Events</p>
                            <Input.TextArea name='events'  defaultValue={JSON.stringify(singleMeetings.data.events)}/>
                            </div>
                        
                        :
                        // @ts-expect-error noidea
                        <p>{String(singleMeetings.error?.response.data.msg)}</p>
                }
                <div className='flex gap-4 justify-center'>
                    <Button className='bg-light-blue-500 text-white' htmlType='submit'>Update</Button>
                    <Button onClick={handleCancel}>Close</Button>
                </div>
                </form>
            </Modal>
        </div>
    );
};

export default AllMeetings;