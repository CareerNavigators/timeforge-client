import "./style.css";
const BackgroundMotion = () => {
  const numOfCircles = 10;
  const circles = Array.from({ length: numOfCircles }, (_, index) => (
    <li key={index}></li>
  ));
  return (
    <div className="area">
      <ul className="circles">{circles}</ul>
    </div>
  );
};

export default BackgroundMotion;
