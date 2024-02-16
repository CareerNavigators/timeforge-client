
import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";
import MarqueeElement from "../Components/Marquee/MarqueeElement";
import HighlightedEvents from "../Components/HighlightedEvents/HighlightedEvents";
import DemoEvent from "../Components/Demo/DemoEvent";

const Home = () => {
  return (
    <div id="take-a-look" className="max-w-full mx-auto">
      <div className="mb-[100px] lg:mb-0">
        <Hero></Hero>
      </div>

      <HighlightedEvents></HighlightedEvents>
      <DemoEvent></DemoEvent>
      <Schedule></Schedule>
      
      <MarqueeElement></MarqueeElement>
    </div>
  );
};
export default Home;
