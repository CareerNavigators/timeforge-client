// import { Tilt } from "react-tilt";
// import tShirt from "../assets/clock_tshirt-preview.png";
import { useEffect } from "react";
import AOS from "aos"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import image1 from "../../assets/tshirt/white.png";
import image2 from "../../assets/tshirt/2 piece.png";
import image3 from "../../assets/tshirt/black.png";
import image4 from "../../assets/tshirt/beer.png";

import "./swiper.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Services from "./Services";
import Banner from "./Banner";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import Banner1 from "./Banner1";
import { FloatButton } from "antd";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Footer from "../../Home/Footer";
// import Slider from "react-slick";

const Shop = () => {

  useEffect(()=>{
    AOS.init()
  },[])
  const navigate = useNavigate();
  const handleShopping = () => {
    navigate("/product");
  };

  const handleCart = ()=>{
    navigate("/cart");
  }
  // const defaultOptions = {
  //   // reverse: false, // reverse the tilt direction
  //   max: 35, // max tilt rotation (degrees)
  //   // perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  //   scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  //   speed: 1000, // Speed of the enter/exit transition
  //   // transition: true, // Set a transition on enter/exit.
  //   // axis: null, // What axis should be disabled. Can be X or Y.
  //   // reset: true, // If the tilt effect has to be reset on exit.
  //   // easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  // };

  const slideData = [
    { 
      id:1,
      title: "Timeforge Essentials",
      subtitle1: "Elevate Your Style with Our Essential Wear",
      subtitle2: "Timeforge",
      img: image1,
    },
    {
      id:2,
      title: "Timeforge Fashion Forward",
      subtitle1: "Where Style Meets Functionality",
      subtitle2: "Timeforge",
      img: image2,
    },
    {
      id:3,
      title: "Timeforge Chic Collection",
      subtitle1: "Refined and Trendy for Every Occasion",
      subtitle2: "Timeforge",
      img: image3,
    },
    {
      id:4,
      title: "Timeforge Casual Couture",
      subtitle1: "Combining Comfort with Chic",
      subtitle2: "Timeforge",
      img: image4,
    },
  ];

  return (
    <div className="overflow-x-hidden   hide-scrollbar">
      {/* hero */}
      <div className="w-full ">
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <div className="">
              {slideData.map((data) => (
                <SwiperSlide>
                  <div className="flex justify-between items-center px-[200px] bg-gradient-to-r from-gray-300/80 to-gray-100 h-full  " key={data.id}>
                    <div className="flex flex-col gap-4  z-10">
                      <h1 className="text-2xl text-black font-bold">{data.title} </h1>
                      <h1 className="text-5xl text-black font-bold">{data.subtitle1} </h1>
                      <h1 className="text-white text-[150px] uppercase ">
                        {data.subtitle2}{" "}
                      </h1>
                      <button
                        onClick={handleShopping}
                        className="bg-pink-700 w-[150px]   text-white px-3 py-1 rounded-full hover:scale-105 duration-300 "
                      >
                        Shop Now
                      </button>
                    </div>
                    <img
                      className="w-[800px]  object-contain  drop-shadow-[-8px_4px_6px_rgba(0,0,0,0.4)]"
                      src={data.img}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
      <Services />
      <Banner />
      <Product />
      
      <div className="flex">
        <Banner1 />
        <div>
          <FloatButton.Group shape="circle">
            <FloatButton
              onClick={handleCart}
              // badge={{ count: 12 }}
              icon={<ShoppingCartOutlined />}
            />
            <FloatButton.BackTop visibilityHeight={0} />
          </FloatButton.Group>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Shop;
