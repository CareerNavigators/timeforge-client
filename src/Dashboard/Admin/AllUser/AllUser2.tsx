import { Table } from 'ka-table';
import { DataType, EditingMode, SortDirection, SortingMode } from 'ka-table/enums';
// import "./responsive.css"
import 'ka-table/style.css';
import AxiosSecure from '../../../Hook/useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Column, Row, User } from '../AllTypes';
import moment from 'moment';
import { Button, Modal, Spin, Input, Image, Select } from 'antd';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
const AllUser2 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState("User")
    const caxios = AxiosSecure()
    // for modal
    const singleUser = useMutation({
        mutationFn: async (id: string) => {
            const res = await caxios.get(`/user?id=${id}`)
            setRole(res.data.role)
            return res.data as User
        },
        retry:2,

    })
    const showModal = (id: string) => {
        setIsModalOpen(true);
        singleUser.mutateAsync(id)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // below part is for ka-table
    const allUser = useQuery({
        queryKey: ['alluser'],
        queryFn: async () => {
            const res = await caxios.get("/admin/users")
            return res.data
        },
        retry:2,

    })

    const columns = [
        {
            key: "name",
            title: "Name",
            dataType: DataType.String,
            sortDirection: SortDirection.Descend,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "email",
            title: "Email",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "createdAt",
            title: "Created At",
            dataType: DataType.String,
            isEditable: false,
        },
        {
            key: "role",
            title: "Role",
            dataType: DataType.String,
            isEditable: false,
        },
        {
            key: "totalMeeting",
            title: "Total Meeting",
            dataType: DataType.Number,
            isEditable: false,

        },
        {
            key: "action",
            title: "Action",
            dataType: DataType.String,
            isEditable: false,

        }
    ]
    const childComponents = {
        cell: {

            content: ({ column, rowData }: { column: Column, rowData: Row }) => {
                if (column.key == "createdAt") {
                    return moment(rowData.createdAt).format("MMM Do YY, h:mm a").toString()
                } else if (column.key == "role") {
                    return (
                        <p className={`${rowData.role == "Admin" && "text-red-500"} ${rowData.role == "Pro" && "text-green-400"} font-semibold`}>{rowData.role}</p>
                    )
                } else if (column.key == "action") {
                    return (
                        <Button className='bg-[#1677ff] text-white' onClick={() => {
                            showModal(rowData._id)
                        }}>See More </Button>
                    )
                } else if (column.key == "totalMeeting") {
                    return (
                        parseInt(rowData.totalMeeting)
                    )
                }

            }
        },
    }

    //This below part is for modal select.
    const roleData = [
        {
            value: "Admin",
            label: <span className='text-red-500 font-semibold'>Admin</span>
        },
        {
            value: "User",
            label: <span className=' font-semibold'>User</span>
        },
        {
            value: "Pro",
            label: <span className='text-green-700 font-semibold'>Pro</span>
        },
    ]
    // for update user from modal
    const updateSingleUser = useMutation({
        mutationFn: async (data: object) => {
            const res = await caxios.patch(`/user/${singleUser.data?._id}`, data)
            return res.data
        },
        onSuccess: () => {
            handleCancel();
            allUser.refetch()

        },
        retry:2,

    })
    async function UpdateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("role", role)
        const formObject = Object.fromEntries(formData);
        await updateSingleUser.mutateAsync(formObject)
    }
    const responsive =
        `
    td {
        word-break: break-all;
    }
    
    @media screen and (max-width:1174px) {
    
        th,
        td,
        tr {
            width: 100%;
        }
    
        th:nth-child(3),
        td:nth-child(3) {
            display: none;
        }
    
    
    }
    
    @media screen and (max-width:769px) {
    
        th:nth-child(5),
        td:nth-child(5) {
            display: none;
        }
    
    
    }
    
    @media screen and (max-width:426px) {
    
        table {
            width: 100%;
        }
    
        table,
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
        }
    
        thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }
    
        tr {
            border: 1px solid #ccc;
        }
    
        td {
            border: none;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 50%;
        }
        tr>td:nth-child(1)>div::before{
            content: "Name: ";
            font-weight: 700;
        }
        tr>td:nth-child(2)>div::before{
            content: "Email: ";
            font-weight: 700;
        }
        tr>td:nth-child(4)>p::before{
            content: "Role: ";
        }
        
        td:before {
            position: absolute;
            top: 6px;
            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            content: attr(data-column);
            color: #000;
            font-weight: bold;
        }
    }
    
    `
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await caxios.delete(`/user/${singleUser.data?.email}`)
            return res.data
        },
        onSuccess: () => {
            allUser.refetch()
            handleCancel()
        },
        retry:2,

    })
    function deleteUser() {
        Swal.fire({
            title: "Delete Confirmation",
            text: `Do you want to Delete ${singleUser.data?.name}`,
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutateAsync()
            }
        })
    }
    return (
        <div className='p-2'>
            <style>{responsive}</style>
            <Table
                noData={{
                    text: "No User Found"
                }}
                loading={{
                    enabled: allUser.isLoading || allUser.isRefetching,
                    text: "Loading..."
                }}
                // @ts-expect-error noidea

                childComponents={childComponents}

                columns={columns}
                data={allUser.data}
                editingMode={EditingMode.Cell}
                rowKeyField={'_id'}
                sortingMode={SortingMode.Single}
            />
            <Modal width={800} title="User Modal" destroyOnClose={true} onCancel={handleCancel} footer={null} open={isModalOpen} >
                {

                    singleUser.isPending ? <div className='flex justify-center'>
                        <Spin size="large"></Spin>
                    </div> : singleUser.isSuccess ? <>
                        <form onSubmit={UpdateUser}>
                            <p className='italic'>{moment(singleUser.data.createdAt).format("MMM Do YY, h:mm a").toString()}</p>
                            <div className='relative rounded'>
                                <Image
                                    width={"100%"}
                                    height={310}
                                    src={singleUser.data.img_cover}
                                    className='rounded-xl object-cover'
                                    fallback="data:image/png;base64,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"
                                />
                            </div>

                            <div className='relative flex justify-center -top-24 rounded'>
                                <Image
                                    width={200}
                                    height={200}
                                    src={singleUser.data.img_profile}
                                    className='rounded-xl object-cover'
                                    fallback="data:image/png;base64,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"
                                />
                            </div>
                            <div className=' flex gap-1 flex-col' >
                                <p className='font-semibold'>Name</p>
                                <Input name="name" defaultValue={singleUser.data.name}></Input>
                                <p className='font-semibold'>Email</p>
                                <Input defaultValue={singleUser.data.email} readOnly></Input>
                                <p className='font-semibold'>Total Meetings</p>
                                <Input defaultValue={singleUser.data.totalMeeting} readOnly></Input>
                                <p className='font-semibold'>Location</p>
                                <Input name="location" defaultValue={singleUser.data.location} ></Input>
                                <p className='font-semibold'>TimeZone</p>
                                <Input name="timeZone" defaultValue={singleUser.data.timeZone} ></Input>
                                <p className='font-semibold'>Role</p>
                                <Select onChange={v => setRole(v)} options={roleData} defaultValue={role}></Select>
                            </div>
                            <div className='flex gap-4 justify-center mt-2'>
                                {
                                    deleteMutation.isPending ? <div className='flex justify-center'>
                                        <Spin size="large"></Spin> </div> : <>
                                        <Button className='bg-light-blue-500 text-white' htmlType='submit'>Update</Button>
                                        <Button className='bg-red-600 text-white' onClick={deleteUser} >Delete</Button>
                                        <Button onClick={handleCancel}>Close</Button>
                                    </>
                                }

                            </div>

                        </form>
                    </> : // @ts-expect-error noidea
                        <p>{String(singleUser.error?.response.data.msg)}</p>
                }
            </Modal>
        </div>
    );
};

export default AllUser2;