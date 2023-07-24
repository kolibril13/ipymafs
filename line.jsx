import React, { useState, useEffect } from "react";
import { Mafs, Line, Coordinates, useMovablePoint } from "mafs";
import "mafs/core.css";

function MyButton({ onClick }) {
  return <button onClick={onClick}> Plus 1 </button>;
}

function App({ content, setContent }) {
  console.log(content);
  const point1 = useMovablePoint([-1, -1]);
  const point2 = useMovablePoint([2, 1]);

  // this effect looks for updates from the python side
  useEffect(() => {
    if (Math.abs(content - point1.x) > 1e-10) {
      point1.setPoint([content, point1.y]);
    }
  }, [content]);

  useEffect(() => {
    if (Math.abs(content - point1.x) > 1e-10) {
      setContent(point1.x);
    }
  }, [point1.x]);


  const handleButtonClick = () => {
    point1.setPoint([point1.x + 1, point1.y]);
  };

  return (
    <>
      <Mafs viewBox={{ x: [-2, 2], y: [-1, 1] }}>
        <Coordinates.Cartesian />
        <Line.Segment point1={point1.point} point2={point2.point} />
        {point1.element}
        {point2.element}
      </Mafs>
      <MyButton onClick={handleButtonClick} />
    </>
  );
}

import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [content, setContent] = useModelState("content");
  return <App content={content} setContent={setContent} />;
});
