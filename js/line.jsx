import React, { useState, useEffect } from "react";
import { Mafs, Line, Coordinates, useMovablePoint } from "mafs";
import "mafs/core.css";

function MyButton({ onClick }) {
  return <button onClick={onClick}> Plus 1 </button>;
}

function App({ vector, setVector }) {
  console.log("hiii");
  console.log(vector);
  const point1 = useMovablePoint(vector);
  const point2 = useMovablePoint([2, 1]);

  // this effect looks for updates from the python side
  useEffect(() => {
    if (Math.abs(vector[0] - point1.x) > 1e-10 || Math.abs(vector[1] - point1.y) > 1e-10) {
      point1.setPoint(vector);
    }
  }, [vector]);


  // this effect looks for updates from canvas side
  useEffect(() => {
    if (Math.abs(vector[0] - point1.x) > 1e-10 || Math.abs(vector[1] - point1.y) > 1e-10) {
      setVector([point1.x, point1.y]);
    }
  }, [point1.x, point1.y]);


  const handleButtonClick = () => {
    point1.setPoint([point1.x + 1, point1.y + 1]);
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
  const [vector, setVector] = useModelState("my_vector");
  
  return <App vector={vector} setVector={setVector} />;
});
