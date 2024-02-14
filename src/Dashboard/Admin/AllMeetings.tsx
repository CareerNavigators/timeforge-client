
import { Table } from 'ka-table';
import 'ka-table/style.css';
import { DataType, EditingMode, SortDirection, SortingMode } from 'ka-table/enums';
import AxiosSecure from '../../Hook/useAxios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Meeting, Column, SingleMeeting } from './AllTypes';
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import moment from 'moment';
import { Badge, Button, Input, Modal, TimePicker } from 'antd';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
dayjs.extend(customParseFormat);
const AllMeetings = () => {
    const caxios = AxiosSecure()
    const [value, setValue] = useState('');
    //for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const singleMeetings = useMutation({
        mutationFn: async (id: string) => {
            const res = await caxios.get(`/meeting?id=${id}&type=single`)
            setValue(res.data.desc)
            return res.data as SingleMeeting
        }
    })
    const showModal = (id: string) => {
        singleMeetings.mutateAsync(id)
        setIsModalOpen(true);

    };
    const handleCancel = () => {
        setSelectedTimes([])
        setIsModalOpen(false);
    };
    async function UpdateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formObject = Object.fromEntries(formData);
        console.log("~ formObject user", formObject)
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
    //react quill
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
        ]
    };

    //calendar section
    const [selectedTimes, setSelectedTimes] = useState<Dayjs[]>([])
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>()

    const onSelect = (value: Dayjs,selectInfo:SelectInfo) => {
        if (selectInfo.source=="date") {
            setSelectedTimes([])
        const data = singleMeetings.data?.events
            ? singleMeetings.data.events[value.format("DDMMYY")] || []
            : [];
        if (data.length != 0) {
            setSelectedTimes(data.map(x => {
                return dayjs(x, "hh:mm A")
            }))
        }
        }
        
    };
    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        const data = singleMeetings.data?.events
            ? singleMeetings.data.events[current.format("DDMMYY")] || []
            : [];
        if (data.length != 0 && info.type == "date") {
            return (
                <Badge status="success" text={""} />
            );
        } else if (info.type == "month") {
            if (singleMeetings.data?.events) {
                for (const key of Object.keys(singleMeetings.data.events)) {
                    if (current.format("MM") == key.substring(2, 4)) {
                        return (
                            <Badge status="success" text={""} />
                        );
                    }
                }
            }

        }


    };
    function addTime() {
        const timeInput = document.getElementById("time")
        if (timeInput != null && timeInput.getAttribute("value") != "") {
            setSelectedTimes([...selectedTimes, dayjs(timeInput.getAttribute("value"), "hh:mm A")])
        }
        setSelectedTime(null)
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
            <Modal width={1200} title="Meetings Modal" confirmLoading={singleMeetings.isPending} destroyOnClose={true} onCancel={handleCancel} footer={null} open={isModalOpen} >
                <form onSubmit={UpdateUser}>
                    {
                        singleMeetings.isSuccess ?
                            <div>
                                <p className='font-semibold'>Title</p>
                                <Input name="title" defaultValue={singleMeetings.data.title}></Input>
                                <p className='font-semibold'>Description</p>
                                <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />
                                <p className='font-semibold'>Duration</p>
                                <Input name='duration' defaultValue={singleMeetings.data.duration} />
                                <p className='font-semibold'>Attendee</p>
                                <Input name='attendee' defaultValue={singleMeetings.data.attendee} />
                                <p className='font-semibold'>Event Type</p>
                                <Input name='eventType' defaultValue={singleMeetings.data.eventType} />
                                <p className='font-semibold'>Camera</p>
                                <Input name='camera' defaultValue={String(singleMeetings.data.camera)} />
                                <p className='font-semibold'>Microphone</p>
                                <Input name='mic' defaultValue={String(singleMeetings.data.mic)} />
                                <p className='font-semibold'>Events</p>
                                {/* <Input.TextArea name='events' defaultValue={JSON.stringify(singleMeetings.data.events)} /> */}
                                <div className='flex '>
                                    <Calendar className='flex-1' cellRender={cellRender} onSelect={onSelect} fullscreen={false} />
                                    <div className='flex-1 pt-12 flex flex-col gap-2'>
                                        {
                                            // @ts-expect-error noidea
                                            <TimePicker use12Hours={true} multiple value={selectedTimes} format={"hh:mm A"} open={false} allowClear={false}></TimePicker>
                                        }
                                        <TimePicker id="time" needConfirm={false} value={selectedTime} use12Hours={true} format={"hh:mm A"} />
                                        <Button onClick={addTime}  >Add</Button>


                                    </div>
                                </div>
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