import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  colors?: string;
  action?: () => void;
  icon?: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button = ({ text, colors, action, icon, type }: ButtonProps) => {
  return (
    <button
      type={type ? type : undefined}
      onClick={action || (() => {})}
      className={`inline-block px-6 py-3 rounded-xl shadow-md transition cursor-pointer ${
        colors ? colors : "bg-indigo-950 text-white hover:bg-indigo-900"
      }`}
    >
      <div className="flex items-center gap-x-2">
        {text}
        {icon}
      </div>
    </button>
  );
};

export default Button;
