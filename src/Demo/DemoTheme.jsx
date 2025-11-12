import React from "react";

const DemoTheme = () => {
  return (
    <div>
      <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center">
        
        <div className="card w-96 bg-base-100 shadow-xl p-5 mt-10">
          <h2 className="card-title">Theme Demo</h2>
          <p className="mt-3">
            Click the theme toggle in the navbar to switch between light 🌞 and
            forest 🌲
          </p>
          <button className="btn btn-primary mt-5">Primary Button</button>
        </div>
      </div>
    </div>
  );
};

export default DemoTheme;
