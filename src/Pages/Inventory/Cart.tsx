import { DeleteOutlined } from "@ant-design/icons";
// import { useQuery } from "@tanstack/react-query";
// import { Space, Table} from "antd";
// import AxiosSecure from "../../Hook/useAxios";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Provider/AuthContext";

// const { Column, ColumnGroup } = Table;
import { Card, Typography, Avatar } from "@material-tailwind/react";
import { useState } from "react";
import showToast from "../../Hook/swalToast";
 
const TABLE_HEAD = ["title", "price", "Action", ""];
// interface ecommerce {
//   id:string,
//   title: string,
//   price: number,
//   img: string
// }

interface CartItem {
  title: string;
  img: string;
  price: number;
  id: string;
}


const Cart = () => {
  const [soldStatus, setSoldStatus] = useState<{ [key: string]: boolean }>({});
  
  
  const getLocalCartData = () => {
    const storedData = localStorage.getItem("cartItem");
    return storedData ? JSON.parse(storedData) : [];
  };
  
  const cartData = getLocalCartData();

  
  const [cardData, setCartData] = useState<CartItem[]>(getLocalCartData());

  const handleDelete = (id: string) => {
    const updatedCartData = cartData.filter((item:any) => item.id !== id);
    setCartData(updatedCartData);
    localStorage.setItem("cartItem", JSON.stringify(updatedCartData));
  };
  console.log(cardData);
  // const { data: cartProduct, isLoading, error } = useQuery({
  //   queryKey: ["cart"],
  //   queryFn: async () => {
  //     const res = await caxios.get(`/cart`);
  //     return res.data;
  //   },
  // })
  // if (isLoading) return <div>Loading..</div>;
  // if (error) return <div>Error: {error.message} </div>;

  // console.log(cartProduct);

  const handleBuyNow = (id: string) => {
    setSoldStatus({ ...soldStatus, [id]: true });
    showToast("success", "you successfully buy this product");
 };
  return (
    <div>
       <Card
         placeholder={undefined}
       className="h-full w-full ">
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
          {cartData?.map((data:any, index:any) => {
              const isSold = soldStatus[data.id] || false;
            const isLast = index === cartData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
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
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    
                   {/* {!buyItem ? <button onClick={handleBuyItem} className="bg-purple-500 px-2 py-1 text-white rounded-3xl">
                      Buy Now
                    </button>:
                    <button onClick={handleBuyItem} className="bg-red-500 px-2 py-1 text-white rounded-3xl">
                      Sold Out
                    </button> } */}
                      {isSold? (
                        <button disabled className="bg-red-500 px-2 py-1 text-white rounded-3xl">
                          Sold Out
                        </button>
                      ) : (
                        <button onClick={() => handleBuyNow(data.id)} className="bg-purple-500 px-2 py-1 text-white rounded-3xl">
                          Buy Now
                        </button>
                      )}
                    
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
                    <button  onClick={() => handleDelete(data.id)}>
                    <DeleteOutlined/>
                    </button>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
  );
};

export default Cart;