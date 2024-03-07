import { DeleteOutlined } from "@ant-design/icons";
import { Card, Typography, Avatar } from "@material-tailwind/react";
import { useState } from "react";
// import showToast from "../../Hook/swalToast";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAttachEmail, MdOutlinePriceChange, MdPayments } from "react-icons/md";
import { Timeline } from 'antd';
import { BsInfoCircleFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import AxiosSecure from "../../Hook/useAxios";
const TABLE_HEAD = ["title", "price", "Action", ""];
import {loadStripe} from '@stripe/stripe-js';
import { IoReturnDownBack } from "react-icons/io5";

// interface ecommerce {
//   id:string,
//   title: string,
//   price: number,
//   img: string
// }

import { Input } from "@material-tailwind/react";


interface CartItem {
  title: string;
  img: string;
  price: number;
  id: string;
}

const Cart = () => {
  const cAxios = AxiosSecure();
  const navigate = useNavigate();
  // const [soldStatus, setSoldStatus] = useState<{ [key: string]: boolean }>({});
  const [cardData, setCartData] = useState<CartItem[]>(() => {
    const storedData = localStorage.getItem("cartItem");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleDelete = (id: string) => {
    const updatedCartData = cardData.filter((item) => item.id !== id);
    setCartData(updatedCartData);
    // Synchronize state with localStorage
    localStorage.setItem("cartItem", JSON.stringify(updatedCartData));
  };

  const handleBack = ()=>{
    navigate("/merch")
  }

  const [email, setEmail] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setEmail(event.target.value);
  };
  

  //  const handleBuyNow = (id: string) => {
  //   setSoldStatus({ ...soldStatus, [id]: true });
  //   showToast("success", "you successfully buy this product");
  //  };

  // count total price of the product
  const totalPrice = cardData.reduce((acc, item) => acc + item.price, 0);

    const handleStripe = async () => {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const body = {
         email:email,
         products: cardData
      };
      const headers = {
         "Content-Type": "application/json"
      };
     
      try {
         // Correctly using axios.post with data and headers
         const response = await cAxios.post("/create-checkout-session", body, {
           headers: headers
         });
     
         const session = response.data;
         const result = stripe?.redirectToCheckout({
           sessionId: session.id,
         });
         console.log(result);
      } catch (error) {
         console.error("Error creating checkout session:", error);
      }
     };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-700 to-deep-purple-900">
      <div className="flex flex-col lg:flex-row gap-[50px] justify-center items-center mt-[0px]">
        <Card
          placeholder={undefined}
          className="h-full lg:w-[1000px] lg:ml-[100px] mt-[35px] "
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cardData?.map((data: any, index: any) => {
                // const isSold = soldStatus[data.id] || false;
                const isLast = index === cardData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={data?.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          placeholder={undefined}
                          src={data?.img}
                          alt={data?.title}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          placeholder={undefined}
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {data?.title}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={undefined}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ${data?.price}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        placeholder={undefined}
                        as="a"
                        href="#"
                        // variant="large"
                        color="red"
                        className="font-bold text-[20px]"
                      >
                        <button onClick={() => handleDelete(data.id)}>
                          <DeleteOutlined />
                        </button>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="w-[300px] h-[340px] border-[1px] mt-8 border-black rounded-xl shadow-2xl bg-white p-[20px]">

         
          <Timeline
          className=""
    items={[
      {
        dot: <MdOutlinePriceChange className="text-[20px]" />,
        children: <h1 className="font-bold">Total Price: ${totalPrice.toFixed(2)}</h1>,
        
      },
      
      {
        dot: <BsInfoCircleFill className="text-[16px]" />,
        color: 'red',
        children: <h1 className="text-red-300 italic">Before you buy a item, you must have a stripe account or any global currency card to pay the required amount.</h1>,
      },
      {
        dot: <MdOutlineAttachEmail className="text-[16px]" />,
        color: 'purple',
        children:  

        <div className="relative flex w-full max-w-[24rem]">
        <Input
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              value={email}
              onChange={onChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }} crossOrigin={undefined}        />
        <Button
          placeholder={undefined}
          size="sm"
          color={email ? "gray" : "blue-gray"}
          disabled={!email}
          className="!absolute right-1 top-1 rounded"
        >
          Invite
        </Button>
      </div>
      },
      {
         dot: <RiSecurePaymentFill className="text-[20px]" />,
         color: "teal",
         children: <Button onClick={handleStripe}
         disabled={!email}
         placeholder={undefined} color={email? "light-green":"brown"} className="flex items-center gap-2"><MdPayments  /> Click Here to Pay </Button>,
      },
    ]}
  />
        </div>
      </div>
      
      <Button 
      onClick={handleBack}
      className="ml-[100px] lg:ml-[250px] flex justify-center items-center   mt-8"
      size="lg"
      placeholder={undefined}
      color="teal"><IoReturnDownBack className="text-[20px] font-bold"/>
      Back to Product Page</Button>
      
    </div>
  );
};

export default Cart;
