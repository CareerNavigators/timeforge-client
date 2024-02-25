import { FaCarSide } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";


const Services = () => {

    const serviceData = [
        {
          id:1,
          title:"Free Shipping",
          desc:"Free Shipping on All Orders",
          icon:<FaCarSide />
        },
        {
          id:2,
          title:"Safe Money",
          desc:"30 Days Money Back",
          icon:<FaCheckCircle />
        },
        {
          id:3,
          title:"Secure Payment",
          desc:"All Payment Secure",
          icon:<FaWallet />
        },
        {
          id:4,
          title:"Online Support 24/7",
          desc:"Technical Support 24/7",
          icon:<FaHeadphonesAlt />
        },
    ]
    return (
        <div className="flex gap-[50px] justify-center mt-[50px] overflow-hidden">
            {
              serviceData.map(data=>(
                 <div key={data.id} className="flex items-center gap-3">
                    <div className="text-[40px] text-pink-600">
                        {data.icon}
                    </div>
                    <div>
                        <h1 className="text-[20px] font-bold">{data.title} </h1>
                        <h1 className="text-blue-gray-500">{data.desc} </h1>
                    </div>
                 </div>
                ))
            }
        </div>
    );
};

export default Services;
