import Card from "./Card";
import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";

const Home = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-[100px] lg:mb-0">
        <Hero></Hero>
      </div>

      <Card></Card>
      <Schedule></Schedule>
    </div>
  );
};
export default Home;
