// import { Button } from "react-bootstrap";
// import React, { useEffect, useState } from "react";
import "./HomePage.css";

interface Props {
  setPage: (page: string) => void; // Define the type of setPage prop
}

function HomePage({ setPage }: Props): JSX.Element {
  return (
    <body>
      <div className="section1">
        <div className="text">LOST?</div>
      </div>
      <div className="section2">
        <div className="text">Normal</div>
      </div>
    </body>
  );
}

export default HomePage;
