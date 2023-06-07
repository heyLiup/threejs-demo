import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Cube from "./component/Cube";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="top"></div>
      <div className="content">
        <div className="left"></div>
        <div className="middle">
          <Cube />
        </div>
      </div>
    </div>
  );
}

export default App;
