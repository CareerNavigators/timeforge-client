import { ReactNode } from "react";

interface TitleProps {
    children: ReactNode;
  }
const Title:React.FC<TitleProps> = ({children}) => {
  return (
    <div>
      <div className="relative ps-3">
        <p className="absolute bottom-0 right-4 text-6xl lg:text-9xl -z-10 opacity-5">{children}</p>
        <h2 className="text-5xl lg:text-6xl font-bold">{children} </h2>
      </div>
    </div>
  );
};

export default Title;
