import CalenderImg from "/images/calender.svg";
import Logo from "/logo.png";

const Schedule = () => {
  return (
    <div className="max-w-5xl mx-auto py-20">
      <h1 className="font-bold text-center text-3xl">
        Smarter scheduling for teams <br /> who conduct meetings at scale
      </h1>
      <div className="flex items-center justify-center pt-20">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="w-1/2">
              <h2 className="font-bold text-lg">Drive more revenue</h2>
              <p>
                Book high-value meetings in seconds and turn scheduling into a
                competitive advantage.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="w-1/2">
              <h2 className="font-bold text-lg">Drive more revenue</h2>
              <p>
                Book high-value meetings in seconds and turn scheduling into a
                competitive advantage.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="w-1/2">
              <h2 className="font-bold text-lg">Drive more revenue</h2>
              <p>
                Book high-value meetings in seconds and turn scheduling into a
                competitive advantage.
              </p>
            </div>
          </div>
        </div>
        <img className="pt-10" src={CalenderImg} alt="" />
      </div>
    </div>
  );
};

export default Schedule;
