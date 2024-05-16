import { ButtonHTMLAttributes, FormEventHandler } from 'react';

import { buttonClass } from "@/app/styles/button-style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void | FormEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  const buttonStyle = disabled ? `${buttonClass} opacity-50 cursor-not-allowed` : buttonClass;

  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>{children}</button>
  )
};

export default Button;
