import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../Hook/useAxios";
import { useEffect, useState } from "react";
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
  const Caxios = AxiosSecure();

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

  // Initialize cartData state with data from localStorage
  const [cardData, setCardData] = useState<CartItem[]>(() => {
    const storedData = localStorage.getItem("cartItem");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleCart = async (
    id: string,
    title: string,
    img: string,
    price: number,
    // quantity: number,
  ) => {
    setCardData((prevCardData) => [...prevCardData, { title, img, price, id }]);
    showToast("success", "you added a cart item");
  };

  useEffect(() => {
    // Synchronize state with localStorage
    localStorage.setItem("cartItem", JSON.stringify(cardData));
  }, [cardData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} </div>;
  return (
    <div className="mt-[150px] max-w-[1440px] mx-auto">
      <div className="text-center flex flex-col justify-center gap-3">
        <h1 className="text-[35px] font-bold">Our Products </h1>
        <h1 className="text-[18px] text-blue-gray-400">Explore Our Products</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4  gap-6 mt-[50px] px-6 lg:px-0 ">
        {product?.map((data) => (
          <div className=" group " key={data?._id}>
            <div className="relative">
              <img
                className="w-[250px] rounded-md mx-auto px-[50px] py-[40px] bg-blue-gray-200"
                src={data?.img}
                alt=""
              />
              <div>
                <button
                  onClick={() => {
                    handleCart(data?._id, data.title, data.img, data.price);
                    // setSold(!sold)
                  }}
                  className="hidden group-hover:flex justify-center items-center w-[100px] lg:w-[150px] py-1 bg-deep-purple-600 text-white rounded-full absolute top-1/2 right-1/4 group-hover:backdrop-blur-md duration-200  "
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
