import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";
import MarqueeElement from "../Components/Marquee/MarqueeElement";
import HighlightedEvents from "../Components/HighlightedEvents/HighlightedEvents";
import DemoEvent from "../Components/Demo/DemoEvent";
import Footer from "./Footer";
const Home = () => {
  return (
    <div id="take-a-look" className="max-w-full mx-auto">
      <Hero></Hero>
      <HighlightedEvents></HighlightedEvents>
      <DemoEvent></DemoEvent>
      <Schedule></Schedule>
      <MarqueeElement></MarqueeElement>
      <Footer />
    </div>
  );
};
export default Home;
