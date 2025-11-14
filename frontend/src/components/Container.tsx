import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        w-full
        mx-auto
        px-4
        sm:px-6
        lg:px-12
        xl:px-20 
        2xl:px-32 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
