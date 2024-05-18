import { ButtonHTMLAttributes, FormEventHandler } from 'react';
import { FaEye } from "react-icons/fa";

import { buttonClass } from "@/app/styles/button-style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void | FormEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  isReview?: boolean;
  isArrow?: boolean;
}

const Button = ({ onClick, children, disabled, isReview, isArrow }: ButtonProps) => {
  const buttonStyle = (disabled && !isArrow) ? `${buttonClass} bg-teal-600 opacity-50 cursor-not-allowed` : (disabled && isArrow) ? `${buttonClass} bg-cyan-600 opacity-50 cursor-not-allowed` : (isReview || isArrow)? `${buttonClass}  flex items-center bg-cyan-600 hover:bg-cyan-400` : `${buttonClass} bg-teal-600 hover:bg-teal-400`;

  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>{children} {isReview && <FaEye className='ml-2'/>}</button>
  )
};

export default Button;
