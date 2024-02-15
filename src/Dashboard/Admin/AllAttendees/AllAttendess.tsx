import { Table } from 'ka-table';
import 'ka-table/style.css';
import { DataType, SortingMode } from 'ka-table/enums';
import AxiosSecure from '../../../Hook/useAxios';
import { useQuery, useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { Attendess } from '../AllTypes';
import { Column } from 'ka-table/models';
import { Button, Input, Modal, Spin, Tooltip } from 'antd';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FormatFunc } from 'ka-table/types';
import "./AllAttendees.css"
const AllAttendess = () => {
    const caxios = AxiosSecure()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleAttendee, setSingleAttendee] = useState<Attendess>()
    //modal
    const updateAttendee = useMutation({
        mutationFn: async (data) => {
            const result = await caxios.patch(`/attendee/${singleAttendee?._id}`, data)
            return result.data
        },
        onSuccess: () => {
            allAttendes.refetch()
            setIsModalOpen(false);
        },
        retry:2,
    })
    const showModal = (id: string) => {
        const t_attendee = allAttendes.data?.filter(x => x._id == id)
        if (t_attendee && t_attendee?.length != 0) {
            setSingleAttendee(t_attendee[0])
            setIsModalOpen(true);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //table
    const allAttendes = useQuery({
        queryKey: ['allAttendes'],
        queryFn: async () => {
            const res = await caxios.get("/admin/attendee")
            return res.data as Attendess[]
        },
        retry:2,
    })
    const column = [
        {
            key: "name",
            title: "Name",
            dataType: DataType.String,
        },
        {
            key: "email",
            title: "Email",
            dataType: DataType.String,
        },
        {
            key: "event",
            title: "Event",
        },
        {
            key: "createdAt",
            title: "Created At",
            dataType: DataType.String,

        },
        {
            key: "action",
            title: "Action",
        }
    ]
    const format: FormatFunc = ({ column, rowData }) => {
        if (column.key == "createdAt") {
            return moment(rowData.createdAt).format("MMM Do YY, h:mm a")
        } else if (column.key == "event") {
            if (rowData.event != null && rowData.event.title) {
                return (
                    <Tooltip title={rowData.event?._id} trigger="click" arrow={true}>
                    <span>{rowData.event?.title}</span>
                </Tooltip>
                )
                return 
            }
        } else if (column.key == "action") {
            return (
                <Button className='bg-[#1677ff] text-white' onClick={() => {
                    showModal(rowData._id)
                }}>See More </Button>
            )
        }
    }
    // form
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await caxios.delete(`/attendee/${singleAttendee?._id}`)
            return res.data
        },
        onSuccess: () => {
            allAttendes.refetch()
            handleCancel()
        },
        retry:2,
    })
    function updateFormAttendee(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const formObject = Object(Object.fromEntries(formData));
        updateAttendee.mutateAsync(formObject)
    }
    function deleteAttendee() {
        Swal.fire({
            title: "Delete Confirmation",
            text: `Do you want to Delete ${singleAttendee?.name}`,
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutateAsync()
            }
        })
    }
    const childComponent= {
        headCell: {//th
            elementAttributes: ({ column }: { column: Column }) => {
                if (column.key=="createdAt") {
                    return {className:"createdAt"}
                }else if(column.key=="event"){
                    return {className:"event"}
                }else{
                    return {className:`${column.key}`}
                }
            }
        },
        cell: { //td
            elementAttributes: ({ field }: { field: string }) => {
                if (field=="createdAt") {
                    return {className:"createdAt"}
                }else if(field=="event"){
                    return {className:"event"}
                }else{
                    return {className:`${field}`}
                }
            }
        }
    }
    return (
        <div className='p-2'>
            <Table
                noData={{
                    text: "No Attendees Found"
                }}
                loading={{
                    enabled: allAttendes.isLoading || allAttendes.isRefetching || allAttendes.isFetching,
                    text: "Loading..."
                }}
                columns={column}
                data={allAttendes.data}
                format={format}
                rowKeyField={'_id'}
                childComponents={childComponent}
                sortingMode={SortingMode.Single}
            />
            <div>
                <Modal width={1200} title="Attendee Modal" confirmLoading={allAttendes.isPending || deleteMutation.isPending} destroyOnClose={true} onCancel={handleCancel} footer={null} open={isModalOpen} >
                    <form onSubmit={updateFormAttendee}>
                        {
                            singleAttendee && <>
                                <p className='italic'>{moment(singleAttendee.createdAt).format("MMM Do YY, h:mm a").toString()}</p>
                                <div className='flex flex-col gap-2'>
                                    <p className='font-semibold'>Name</p>
                                    <Input name="name" defaultValue={singleAttendee.name}></Input>
                                    <p className='font-semibold'>Email</p>
                                    <Input name="email" defaultValue={singleAttendee.email}></Input>
                                    <p className='font-semibold'>Event</p>
                                    <Input defaultValue={singleAttendee.event?.title} readOnly></Input>
                                </div>
                            </>
                        }
                        <div className='flex gap-4 justify-center mt-2'>
                            {
                                deleteMutation.isPending ? <div className='flex justify-center'>
                                <Spin size="large"></Spin> </div>:<>
                                <Button className='bg-light-blue-500 text-white' htmlType='submit'>Update</Button>
                            <Button className='bg-red-600 text-white' onClick={deleteAttendee}>Delete</Button>
                            <Button onClick={handleCancel}>Close</Button></>
                            }
                            
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default AllAttendess;