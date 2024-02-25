// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { Autoplay, EffectCube, Pagination } from "swiper/modules";
import { Card } from "antd";
import { FaCalendar, FaClock, FaUserTie } from "react-icons/fa";


const HighlightedEvents = () => {
  return (
    <div id="partners" className="pt-10 mb-48 md:mb-60">
      <h1 className="font-extrabold text-[#7c3aed] pb-52 text-center text-4xl md:text-5xl">
        Trending Events
      </h1>
      <div className="relative">
        <Swiper
          effect={"cube"}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 50,
            shadowScale: 0.5,
          }}
          pagination={true}
          modules={[Autoplay, EffectCube, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card
              className="flex flex-col justify-center text-center items-center text-white bg-gradient-to-r from-[#9181F4] to-[#5038ED]"
              hoverable
              style={{ width: 300, height: 300 }}
            >
              <img
                className="w-full border-white border-[4px] mb-1 shadow-xl rounded-lg"
                src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h1 className="py-1 text-lg font-bold">
                Machine Learning Workshop
              </h1>
              <span className="flex items-center justify-center gap-2 pb-1 text-lg font-medium">
                <FaCalendar />
                Feb 06, 2024{" "}
              </span>
              <div className="flex justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <FaClock /> 120 Minutes
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <FaUserTie /> 1231
                </span>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              className="flex flex-col justify-center text-center items-center text-white bg-gradient-to-r from-[#9181F4] to-[#5038ED]"
              hoverable
              style={{ width: 300, height: 300 }}
            >
              <img
                className="w-full border-white border-[4px] mb-1 shadow-xl rounded-lg"
                src="https://images.unsplash.com/photo-1575029644286-efb9039cac46?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h1 className="py-1 text-lg font-bold">
                Production Conference 2024
              </h1>
              <span className="flex items-center justify-center gap-2 pb-1 text-lg font-medium">
                <FaCalendar />
                Mar 10, 2024{" "}
              </span>
              <div className="flex justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <FaClock /> 60 Minutes
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <FaUserTie /> 793
                </span>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              className="flex flex-col justify-center text-center items-center text-white bg-gradient-to-r from-[#9181F4] to-[#5038ED]"
              hoverable
              style={{ width: 300, height: 300 }}
            >
              <img
                className="w-full border-white border-[4px] mb-1 shadow-xl rounded-lg"
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h1 className="py-1 text-lg font-bold">
                Corporate Business Seminar 
              </h1>
              <span className="flex items-center justify-center gap-2 pb-1 text-lg font-medium">
                <FaCalendar />
                Feb 25, 2024{" "}
              </span>
              <div className="flex justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <FaClock /> 90 Minutes
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <FaUserTie /> 571
                </span>
              </div>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HighlightedEvents;