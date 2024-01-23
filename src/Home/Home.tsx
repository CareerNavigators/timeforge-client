import Card from "./Card";
import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";
import EventSlot from "../Components/EventSlot/EventSlot";

const Home = () => {
  return (
    <div className="max-w-[1400px] mx-auto ">
      <Hero></Hero>
      <Card></Card>
      <Schedule></Schedule>
      <EventSlot></EventSlot>
    </div>
  );
};
export default Home;
