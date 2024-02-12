import { Table } from 'ka-table';
import { DataType, EditingMode, SortDirection, SortingMode } from 'ka-table/enums';
import 'ka-table/style.css';
import AxiosSecure from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Column, Row } from './AllTypes';
import moment from 'moment';
import { Button, Select,Modal  } from 'antd';
import { useState } from 'react';

const AllUser2 = () => {
    const caxios = AxiosSecure()
    const allUser = useQuery({
        queryKey: ['alluser'],
        queryFn: async () => {
            const res = await caxios.get("/admin/users")
            return res.data
        }
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleUser,setSingleUser]=useState(null)

    const showModal = (id:string) => {
      setIsModalOpen(true);
      console.log(id);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

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
        },
        {
            key: "role",
            title: "Role",
            dataType: DataType.String,
        },
        {
            key: "totalMeeting",
            title: "Total Meeting",
            dataType: DataType.String
        },
        {
            key: "action",
            title: "Action",
            dataType: DataType.String
           
        }
    ]
    const roleData=[
        {
            value:"Admin",
            label: <span className='font-semibold text-red-500'>Admin</span>
        },
        {
            value:"User",
            label: <span className='font-semibold'>User</span>
        },
        {
            value:"Pro",
            label: <span className='font-semibold'>Pro</span>
        },
    ]
    const childComponents = {
        cell: {
            content: ({ column, rowData }:{column:Column,rowData:Row}) => {
                if (column.key=="createdAt") {
                    return moment(rowData.createdAt).format("MMM Do YY, h:mm a").toString()
                }else if(column.key=="role"){
                    return(
                        <Select options={roleData} defaultValue={rowData.role}></Select>
                    )
                }else if(column.key=="action"){
                    return(
                        <Button onClick={()=>{
                            showModal(rowData._id)
                        }}>Modal </Button>
                    )
                }
                
            }
        },
    }


    return (
        <div>
            <Table
                noData={{
                    text: "No User Found"
                }}
                loading={{
                    enabled: allUser.isLoading,
                    text: "Loading..."
                }}
                childComponents={childComponents}
                columns={columns}
                data={allUser.data}
                editingMode={EditingMode.Cell}
                rowKeyField={'_id'}
                sortingMode={SortingMode.Single}
            />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       
      </Modal>
        </div>
    );
};

export default AllUser2;