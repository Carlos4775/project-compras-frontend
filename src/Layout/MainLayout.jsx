import React from "react";
import DarkNavbar from "../Components/DarkNavbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <DarkNavbar />
      <div style={{ marginTop: "70px" }}>{children}</div>
    </div>
  );
}
