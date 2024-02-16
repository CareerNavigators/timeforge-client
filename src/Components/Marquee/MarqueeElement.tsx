import Marquee from "react-fast-marquee";
import Conoco from "./SVGitems/conoco.svg"
import Digiclub from "./SVGitems/digiclub.svg"
import Anwb from "./SVGitems/anwb.svg"
import Worth from "./SVGitems/worth.svg"
import Waves from "./SVGitems/waves.svg"
import Blackcrows from "./SVGitems/blackcrows.svg"

const MarqueeElement = () => {
  return (
    <div className="py-10">
      <h1 className="font-extrabold text-[#7c3aed] text-center text-4xl md:text-5xl">
        Business Partners
      </h1>
      <Marquee>
        <div className="flex items-center gap-10 px-5 md:p-5 lg:px-10 justify-evenly lg:gap-20">
            <span className="w-40 md:w-60">
            <img  src={Conoco} alt="Logo" />
            </span>
            <span className="w-40 md:w-60">
            <img  src={Waves} alt="Logo" />
            </span>
            <span className="w-40 md:w-60">
            <img  src={Digiclub} alt="Logo" />
            </span>
            <span className="w-40 md:w-60">
            <img  src={Anwb} alt="Logo" />
            </span>
            <span className="w-40 md:w-60">
            <img  src={Worth} alt="Logo" />
            </span>
            <span className="w-40 md:w-60">
            <img  src={Blackcrows} alt="Logo" />
            </span>
        </div>
        
      </Marquee>
    </div>
  );
};

export default MarqueeElement;
