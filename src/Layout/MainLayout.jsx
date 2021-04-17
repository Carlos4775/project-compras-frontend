import React from "react";
import Navbar from "../Components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "70px", paddingBottom: "140px" }}>
        {children}
      </div>
      <div className="absolute bottom-0 inset-x-0 p-10 text-xs text-white bg-gray-800 z-0">
        2021 Carlos Torres. All rights reserved
      </div>
    </div>
  );
}
