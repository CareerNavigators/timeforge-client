import { Button } from "@material-tailwind/react";
import { Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";

const Cancel = () => {
    const navigate = useNavigate();
    const goBack = ()=>{
      navigate(-1);
    }
  return (
    <div>
      <div className="flex justify-center items-center mx-auto">
        <Card className="w-[300px] h-[300px] mt-[150px] shadow-xl">
          <p className="text-center mx-auto text-[100px] font-bold text-pink-300 mt-3">
            <CloseOutlined />
          </p>
          <p className="mb-[20px] text-red-400 font-bold text-[18px] text-center">
            You cancel the payment.
          </p>
          <Button
            onClick={goBack}
            placeholder={undefined}
            size="sm"
            color="green"
            className="flex items-center mx-auto gap-2"
          >
            Get Back to the Shopping Page
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Cancel;
