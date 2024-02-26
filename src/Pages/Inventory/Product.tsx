import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../Hook/useAxios";
import {  useEffect, useState } from "react";
// import { AuthContext } from "../../Provider/AuthContext";
import showToast from "../../Hook/swalToast";
// import Cart from "./Cart";
interface ecommerce {
  _id: string;
  title: string;
  price: number;
  img: string;
  __v: number;
}

interface CartItem {
  title: string;
  img: string;
  price: number;
  id: string;
}
const Product = () => {
  // const [sold, setSold] = useState(false);

  // const { userData } = useContext(AuthContext);

  const Caxios = AxiosSecure();

  // const addToCartMutation = useMutation({
  //   mutationFn: async (productId: string) => {
  //     const cartItem = {
  //       productId,
  //       userEmail: userData.email,
  //     };

  //     const res = await axios.post("/cart", cartItem);
  //     return res.data; // Assuming the response contains the added cart item data
  //   },
  // });

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await Caxios.get("/ecommerce");
      return res.data as ecommerce[];
    },
  });

  const [cardData, setCardData] = useState<CartItem[]>([]);

  const  handleCart = async(
    id: string,
    title: string,
    img: string,
    price: number
  ) => {
    console.log(id);
    setCardData((prevCardData) => [
      ...prevCardData,
      { title, img, price, id },
    ]);
    // await Caxios.post("/cart", cardData).then((res) => {
    //       console.log(res.data);
    //       showToast("success", "you added a cart item")
    //     }); 
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cardData));
    showToast("success", "you added a cart item");
  }, [cardData]);

  // const getLocalStorageData = () => {
  //   const storedData = localStorage.getItem("cartItem");
  //   return storedData ? JSON.parse(storedData) : [];
  // };
  // // console.log(getLocalStorageData());
  // const savedCartData = getLocalStorageData();
  // console.log(savedCartData);
  // // showToast("success", "product added successfully on the cart");

  // const handleCart = async (
  //   id: string,
  //   title: string,
  //   img: string,
  //   price: number
  // ) => {
  //   const cartItem = {
  //     productId: id,
  //     title: title,
  //     isSold: sold,
  //     img: img,
  //     price: price,
  //   };
  //   await Caxios.post("/cart", cartItem).then((res) => {
  //     console.log(res.data);
  //   });
  // // };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} </div>;
  return (
    <div className="mt-[150px] max-w-[1440px] mx-auto">
      <div className="text-center flex flex-col justify-center gap-3">
        <h1 className="text-[35px] font-bold">Our Products </h1>
        <h1 className="text-[18px] text-blue-gray-400">Explore Our Products</h1>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-[50px] ">
        {product?.map((data) => (
          <div className=" group " key={data?._id}>
            <div className="relative">
              <img
                className="w-[250px] rounded-md mx-auto px-[50px] py-[40px] bg-blue-gray-200"
                src={data?.img}
                alt=""
              />
              <div>
                {/* {sold ? (
                  <button
                  disabled
                  className=" hidden group-hover:flex justify-center items-center w-[150px] py-1 bg-deep-purple-600 text-white rounded-full absolute top-1/2 right-1/4 group-hover:backdrop-blur-md duration-200  "
                >
                  Sold Out
                </button>
                  
                ) : (
                  <button
                    onClick={() =>
                     { handleCart(data?._id, data.title, data.img, data.price)
                      setSold(!sold)}
                    }
                    className="hidden group-hover:flex justify-center items-center w-[150px] py-1 bg-deep-purple-600 text-white rounded-full absolute top-1/2 right-1/4 group-hover:backdrop-blur-md duration-200  "
                  >
                    Add to Cart
                  </button>
                )} */}
                <button
                  onClick={() => {
                    handleCart(data?._id, data.title, data.img, data.price);
                    // setSold(!sold)
                  }}
                  className="hidden group-hover:flex justify-center items-center w-[150px] py-1 bg-deep-purple-600 text-white rounded-full absolute top-1/2 right-1/4 group-hover:backdrop-blur-md duration-200  "
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className=" mt-5  gap-1">
              <h1 className="text-[20px] text-center font-bold">
                {data?.title}{" "}
              </h1>
              <h1 className="text-gray-600 text-center ">
                Price: ${data.price}{" "}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;