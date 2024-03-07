import "./style.css";
const BackgroundMotion = () => {
  const numOfspan = 6;
  const circles = Array.from({ length: numOfspan }, (_, index) => (
    <span key={index}></span>
  ));
  return <div className="background">{circles}</div>;
};

export default BackgroundMotion;
