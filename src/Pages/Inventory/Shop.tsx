
import { useEffect } from "react";
import AOS from "aos"
// import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from 'antd';
import image1 from "../../assets/tshirt/white.png";
import image2 from "../../assets/tshirt/2 piece.png";
import image3 from "../../assets/tshirt/black.png";
import image4 from "../../assets/tshirt/beer.png";

import "./swiper.css";

// import required modules
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


  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    
  };

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
    <div className="overflow-x-hidden   hide-scrollbar relative">
      {/* hero */}
      <div className="w-full ">
        <div>
        <Carousel autoplay>
            
              {slideData.map((data) => (
               
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between items-center px-0 lg:px-[200px] bg-gradient-to-r  from-gray-300/80 to-gray-100 h-full lg:gap-[100px]  " style={contentStyle} >
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between items-center px-0 lg:px-[200px] bg-gradient-to-r  from-gray-300/80 to-gray-100 h-full lg:gap-[100px]  ">
                    <div className="flex flex-col gap-4  z-10 p-[50px] lg:p-0">
                      <h1 className="text-2xl text-black font-bold">{data.title} </h1>
                      <h1 className="lg:text-5xl text-black font-bold">{data.subtitle1} </h1>
                      <h1 className="text-white lg:text-[150px] uppercase ">
                        {data.subtitle2}{" "}
                      </h1>
                      <button
                        onClick={handleShopping}
                        className="bg-pink-700 w-[150px] mb-[20px]  text-white px-3 py-1 rounded-full hover:scale-105 duration-300 "
                      >
                        Shop Now
                      </button>
                    </div>
                    <img
                      className="w-[400px] lg:w-[800px] pb-[50px] lg:pb-0 object-contain  drop-shadow-[-8px_4px_6px_rgba(0,0,0,0.4)]"
                      src={data.img}
                      alt=""
                    />
                    </div>
                  </div>
                  
              ))}
            
            </Carousel>
        </div>
      </div>
      <Services />
      <Banner />
      <Product />
      
      <div className="flex ">
        <Banner1 />
        <div>
          <FloatButton.Group shape="circle" className="fixed bottom-[180px]">
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
