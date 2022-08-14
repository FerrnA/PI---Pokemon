import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import "./RoutesNav.css";

export default function RoutesNav() {
  return (
    <div className="routesNav">
      <Header />
      <div className="component">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
