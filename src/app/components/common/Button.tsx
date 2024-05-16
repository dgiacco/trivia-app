import { ButtonHTMLAttributes, FormEventHandler } from 'react';

import { buttonClass } from "@/app/styles/button-style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void | FormEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className={buttonClass} onClick={onClick}>{children}</button>
  )
};

export default Button;
