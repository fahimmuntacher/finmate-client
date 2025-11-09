import React from "react";

const Spinner = ({ size = 60, color = "#00C896" }) => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen mx-auto"
      style={{ width: size, height: size }}
    >
      {/* Outer Ring */}
      <div
        className="absolute border-4 border-gray-300 rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      ></div>

      {/* Middle Ring */}
      <div
        className="absolute border-4 border-gray-200 rounded-full animate-spin"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          borderTopColor: color,
          animationDuration: "1s",
        }}
      ></div>

      {/* Inner Dot */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
