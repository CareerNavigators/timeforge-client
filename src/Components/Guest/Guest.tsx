import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Avatar, Card, Input, Select, Skeleton, Spin } from "antd";
import { ChangeEvent } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import AxiosSecure from "../../Hook/useAxios";
const Guest = () => {
    const caxios=AxiosSecure()
    const serchGuest=useMutation({
        mutationFn:async (text:string)=>{
            const res= await caxios.get(`/guest?${text}`)
            return res.data
        }
    })
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.currentTarget.value);
  }
  return (
    <div className="px-5">
      <div>
        <Input onChange={onChange} />

        <Card
          style={{ width: 220 }}
          cover={
            <img
              src="http://via.placeholder.com/240x240"
              className="h-[150px] object-cover"
            />
          }
          actions={[
            <MdOutlinePersonAddAlt
              className="text-center w-full text-xl"
              key="add"
            />,
          ]}
        >
          <Card.Meta
            title="Md. Huzaifa"
            description="saadhuzaifa2497@gmail.com"
          />
          <Skeleton loading={true} active>
            <Card.Meta
              title="Md. Huzaifa"
              description="saadhuzaifa2497@gmail.com"
            />
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default Guest;
