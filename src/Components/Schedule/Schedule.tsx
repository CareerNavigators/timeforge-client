import Logo from "/logo.png";
import ScheduleCalendar from "./ScheduleCalendar";

const Schedule = () => {
  return (
    <div className="max-w-5xl px-10 lg:px-0 mx-auto py-20">
      <h1 className="font-bold text-[#7c3aed] text-center text-2xl md:text-4xl">
        Smarter scheduling for teams <br /> who conduct meetings at scale
      </h1>
      <div className="flex flex-col-reverse gap-10 lg:gap-0 md:flex-row items-center justify-center pt-20">
        <div className="flex flex-col justify-start  gap-10">
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="lg:w-1/2">
              <h2 className="font-bold text-lg">Tailored Events, Mastery Made Simple</h2>
              <p className="text-sm tracking-wide">
              Create, manage, and categorize events effortlessly. Tailor your scheduling experience and take control of your time with TimeForge.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="lg:w-1/2">
              <h2 className="font-bold text-lg">Seamless Scheduling for Every Moment</h2>
              <p className="text-sm tracking-wide">
              Effortless event creation, categorization, and efficient scheduling. From professional meetings to gaming sessions, time management has never been this smooth.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img className="h-10" src={Logo} alt="logo" />
            <div className="lg:w-1/2">
              <h2 className="font-bold text-lg">Ultimate Event Freedom, Your Way</h2>
              <p className="text-sm tracking-wide">
              Empowering users with feature-rich scheduling. From managing participants to event customization, enjoy dark/light modes and personalized profiles.
              </p>
            </div>
          </div>
        </div>
        <section>
          <ScheduleCalendar />
        </section>
      </div>
    </div>
  );
};

export default Schedule;
