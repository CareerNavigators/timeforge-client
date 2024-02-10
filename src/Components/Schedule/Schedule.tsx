import CalenderImg from "/images/calender.svg";
import Logo from "/logo.png";

const Schedule = () => {
  return (
    <div className="max-w-5xl px-10 lg:px-0 mx-auto py-20">
      <h1 className="font-bold text-center text-xl lg:text-3xl">
        Smarter scheduling for teams <br /> who conduct meetings at scale
      </h1>
      <div className="flex flex-col-reverse gap-10 lg:gap-0 md:flex-row items-center justify-center pt-20">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="lg:w-1/2">
              <h2 className="font-bold text-lg">Drive more revenue</h2>
              <p>
                Book high-value meetings in seconds and turn scheduling into a
                competitive advantage.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="lg:w-1/2">
              <h2 className="font-bold text-lg">Speed up your sales cycle</h2>
              <p>
              Keep your deal momentum high and remove scheduling friction at every stage of your sales cycle.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="lg:w-1/2">
              <h2 className="font-bold text-lg">Close more deals</h2>
              <p>
              Customize reminder and follow-up workflows to move deals along, integrate with sales tools, and remove logistical tasks to focus on selling.
              </p>
            </div>
          </div>
        </div>
        <img className="lg:pt-10" src={CalenderImg} alt="calender image" />
      </div>
    </div>
  );
};

export default Schedule;
