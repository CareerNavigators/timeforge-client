import { Link } from "react-router-dom";
import hoddie from "../../assets/tshirt/hoddie.png";

const Banner = () => {
  const banner = {
    discount: "30% off",
    title: "Timeforge Fashion Forward",
    date: "22 Feb to 29 Feb",
    image: hoddie,
    title2: "White Timeforge Hoddie",
    title3: "Winter Sale",
    des: "This winter sale is a limited-time offer, so act fast! Grab your favorite hoodie at an incredible discount and enjoy the warmth and style it offers",
    bgColor: "#402085" ,
  };
  return (
    <div
      className="min-h-auto lg:min-h-[550px] flex flex-col lg:flex-row justify-center items-center lg:w-[1400px] mx-auto mt-[170px] mb-[50px] rounded-3xl"
      style={{ background: banner.bgColor }}
    >
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 items-center text-white rounded-3xl px-[30px] py-5 lg:py-0">
        <div className="flex flex-col gap-[20px]" >
          <p>{banner.discount}</p>
          <h1 className="uppercase text-2xl lg:text-7xl font-bold ">{banner.title} </h1>
          <h1>{banner.date} </h1>
        </div>
        <div className="lg:h-full flex items-center " >
          <img
           
            className="h-[300px] lg:h-[100%] lg:scale-125 drop-shadow-2xl object-cover"
            src={banner.image}
            alt="hoddie"
          />
        </div>
        <div className="flex flex-col gap-[20px]" >
          <h1>{banner.title2} </h1>
          <h1 className="uppercase lg:text-7xl font-bold ">{banner.title3} </h1>
          <h1>{banner.des} </h1>
          <div>
            <Link to="/product">
            <button
              style={{ color: banner.bgColor }}
              className="px-[10px] bg-white py-1 rounded-full"
            >
              Add to Cart
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
