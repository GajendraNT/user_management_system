import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export default function InputField({
  label,
  className = "",
  ...inputProps
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        {...inputProps}
        className={`
          w-full border rounded-lg p-3 
          focus:ring-2 focus:ring-teal-400 
          outline-none
          ${className}
        `}
      />
    </div>
  );
}
