import React from "react";

const Button = ({ type = "button", className = "", processing = false, children, ...props }) => {
  return (
    <button
      type={type}
      className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
        processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      } ${className}`}
      disabled={processing}
      {...props}
    >
      {processing ? "Enviando..." : children}
    </button>
  );
};

export default Button;
