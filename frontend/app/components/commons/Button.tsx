"use client";
import React from "react";
import { IconType } from "react-icons";
import { cn } from "../../lib/utils";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  className?: string;
  isLoading?: boolean;
  small?: boolean;
  type?: "submit" | "button" | undefined;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  label,
  disabled,
  outlined,
  className,
  isLoading,
  small,
  icon: Icon,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "btn",
        !outlined && "outline-none",
        small && "btn-sm",
        className && className,
      )}
    >
      {Icon && <Icon size={18} />}
      {isLoading && <span className="loading loading-ring loading-md"></span>}
      {label}
    </button>
  );
}

export default Button;
