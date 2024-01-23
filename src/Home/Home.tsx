import Card from "./Card";
import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";

const Home = () => {
  return (
    <div className="max-w-[1400px] mx-auto ">
      <Hero></Hero>
      <Card></Card>
      <Schedule></Schedule>
    </div>
  );
};
export default Home;
