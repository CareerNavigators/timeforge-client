import Accordion from "./Collapse";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const FaqSection = () => {
  useEffect(() => {
    Aos.init();
}, [])

  return (
    <div className="max-w-7xl mx-5 my-20 lg:mx-auto">
      <h1 className="font-extrabold text-[#7c3aed] pb-10 md:py-20 text-center text-4xl md:text-5xl">
        Frequently Asked Questions
      </h1>
      <section
        data-aos="fade-up"
        data-aos-easing="ease-in"
        data-aos-duration="1000"
      >
        <Accordion />
      </section>
    </div>
  );
};

export default FaqSection;
