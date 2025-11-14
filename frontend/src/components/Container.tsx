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
        px-0 
        sm:px-4 
        md:px-10 
        lg:px-[10%] 
        xl:px-[15%] 
        2xl:px-[18%] 
        flex items-center justify-center h-screen bg-linear-to-br from-teal-200 to-white
        ${className}
      `}
    >
      {children}
    </div>
  );
}
