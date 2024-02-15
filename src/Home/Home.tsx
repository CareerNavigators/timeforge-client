import Card from "./Card";
import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";
import MarqueeElement from "../Components/Marquee/MarqueeElement";
import HighlightedEvents from "../Components/HighlightedEvents/HighlightedEvents";
import DemoEvent from "../Components/Demo/DemoEvent";

const Home = () => {
  return (
    <div className="max-w-full mx-auto">
      <div className="mb-[100px] lg:mb-0">
        <Hero></Hero>
      </div>

      <Card></Card>
      <DemoEvent></DemoEvent>
      <Schedule></Schedule>
      <HighlightedEvents></HighlightedEvents>
      <MarqueeElement></MarqueeElement>
    </div>
  );
};
export default Home;
