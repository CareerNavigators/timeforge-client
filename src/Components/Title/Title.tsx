import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}
const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-[450px] mx-auto">
      <div className="relative text-center ps-3">
        <p className="absolute bottom-0 text-6xl right-4 lg:text-9xl -z-10 opacity-5">
          {children}
        </p>
        <h2 className="text-5xl font-bold lg:text-6xl">{children}</h2>
      </div>
    </div>
  );
};

export default Title;
