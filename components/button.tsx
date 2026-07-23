import { FC, ReactElement } from 'react';

interface ButtonProps {
  children: ReactElement | string;
}

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <div className="group relative inline-block transition-all hover:scale-105">
      <div
        className="bg-(--surface-4) absolute left-0 top-full -mt-1 scale-100 rounded-full opacity-0 blur-md transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
        style={{
          width: '100%',
          height: '1.2rem',
          transformOrigin: 'center top',
          pointerEvents: 'none',
        }}
      ></div>
      <div className="bg-content-text text-text pointer-events-auto relative z-10 rounded-full px-8 py-4 font-semibold transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Button;
