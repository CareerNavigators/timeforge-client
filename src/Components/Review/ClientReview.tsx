import { Card, Rate } from "antd";
import Avatar from "antd/es/avatar/avatar";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const ClientReview = () => {
    
    useEffect(() => {
        Aos.init();
    }, [])

  return (
    <div className="max-w-7xl mx-5 my-20 overflow-hidden lg:mx-auto">
      <h1 className="font-extrabold text-[#7c3aed] pb-10 md:py-20 text-center text-4xl md:text-5xl">
        Client Testimonials
      </h1>
      <section >
          <div data-aos="fade-left" data-aos-easing="ease-in" data-aos-duration="1000" className="flex flex-col lg:flex-row gap-7 lg:gap-3 items-center justify-between">
            <Card  className="md:w-3/4 lg:w-1/3 lg:h-[300px] bg-gradient-to-b from-[#9181F4] to-[#5038ED] text-white  text-center  hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
            <p className="italic text-center font-medium text-sm pb-3">
                "TimeForge has revolutionized the way I manage appointments and
                meetings for my business. The user-friendly interface and
                efficient scheduling tools have saved me countless hours. It's a
                game-changer for anyone looking to organize their time
                effortlessly."
              </p>
              <Rate disabled defaultValue={5} />
              <div className="py-3"><Avatar size={50} src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
              <h3 className="font-bold text-lg tracking-wider">Sarah Jackson</h3>
              <h3 className="  tracking-wider"> Business Owner</h3>
              
             
            </Card>
            <Card  className="md:w-3/4 lg:w-1/3 lg:h-[300px] bg-gradient-to-b from-[#9181F4] to-[#5038ED] text-white text-center hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
              <p className="italic text-center font-medium text-sm pb-3">
              "TimeForge has simplified event planning for me. The option to
              categorize events and manage participants seamlessly is fantastic.
              The calendar integration ensure smooth coordination across
              different schedules. It's a must-have for anyone in the event
              management industry."
              </p>
              <Rate disabled defaultValue={5} />
              <div className="py-3"><Avatar size={50} src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
              <h3 className="font-bold text-lg  tracking-wider">Emily Shane</h3>
              <h3 className=" tracking-wider"> Event Coordinator</h3>
            </Card>
            <Card className="md:w-3/4 lg:w-1/3 lg:h-[300px] bg-gradient-to-b from-[#9181F4] to-[#5038ED] text-white text-center hover:shadow-md hover:shadow-violet-400 transition-all ease-in-out">
              <p className="italic text-center font-medium text-sm pb-3">
              "As a freelancer juggling multiple projects, TimeForge has become
              my go-to scheduling companion. I can categorize my meetings,
              manage participants, and even customize my profile. The
              time-saving features make it
              an invaluable tool for my workflow."
              </p>
              <Rate disabled defaultValue={5} />
              <div className="py-3"><Avatar size={50} src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
              <h3 className="font-bold text-lg tracking-wider">Alex Madison</h3>
              <h3 className="tracking-wider">Freelancer</h3>
            </Card>
          </div>
      </section>
    </div>
  );
};

export default ClientReview;
