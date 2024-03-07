import Accordion from "./Collapse";

const FaqSection = () => {
  return (
    <div className="max-w-7xl mx-5 my-20 lg:mx-auto">
      <h1 className="font-extrabold text-[#7c3aed] pb-10 md:py-20 text-center text-4xl md:text-5xl">
        Frequently Asked Questions
      </h1>
      <Accordion />
    </div>
  );
};

export default FaqSection;
