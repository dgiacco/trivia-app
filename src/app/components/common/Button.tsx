import { ButtonHTMLAttributes, FormEventHandler } from "react";
import { FaEye } from "react-icons/fa";

import { buttonClass } from "@/app/styles/button-style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void | FormEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "icon";
}

const Button = ({ onClick, children, disabled, variant = "primary" }: ButtonProps) => {
  let buttonStyle = buttonClass;

  if (disabled) {
    buttonStyle += " opacity-50 cursor-not-allowed";
  }
  switch (variant) {
    case "primary":
      buttonStyle += " bg-teal-600 hover:bg-teal-400";
      break
    case "secondary":
      buttonStyle += " flex items-center bg-cyan-600 hover:bg-cyan-400";
      break
    case "icon":
      buttonStyle += " flex items-center bg-cyan-600 hover:bg-cyan-400";
      break
  }

  console.log(buttonStyle)
  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>
      {children} {variant === "secondary" && <FaEye className="ml-2" />}
    </button>
  );
};

export default Button;
