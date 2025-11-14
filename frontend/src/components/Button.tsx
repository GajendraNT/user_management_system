import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  classname?: string;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-teal-600/80 hover:bg-teal-700/80 text-white focus:ring-teal-600/90 hover:shadow-lg",
    secondary:
      "border border-gray-300 text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
  };
  return (
    <button className={`${base} ${className} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
