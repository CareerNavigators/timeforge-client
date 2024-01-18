import Card from "./Card";
import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";

const Home = () => {
  return (
      <div className="max-w-[1400px] mx-auto ">
        <Hero></Hero>
        <Card></Card>
        <h1 className="text-3xl text-center">Home/TimeForge</h1>
        <Schedule></Schedule>
        
        
      </div>
  )
};
export default Home;
