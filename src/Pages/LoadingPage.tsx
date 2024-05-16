import React from "react";
import "./LoadingPage.css";

interface Props {
    setPage: (page: string) => void; // Define the type of setPage prop
}

function LoadingPage(props: Props): JSX.Element {
  return (
    <div className="LoadingBackground">
      <div className="Gif"></div>
    </div>
  );
}

export default LoadingPage;
