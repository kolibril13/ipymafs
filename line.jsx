import React, { useState, useEffect } from "react";
import { Mafs, Line, Coordinates, useMovablePoint } from "mafs";
import "mafs/core.css";

function MyButton({ onClick }) {
  return <button onClick={onClick}> Plus 1 </button>;
}

function App({ mycoord, setMyCoord }) {
  console.log(mycoord);
  const point1 = useMovablePoint([ mycoord, -1]);
  const point2 = useMovablePoint([2, 1]);

  // this effect looks for updates from the python side
  useEffect(() => {
    if (Math.abs(mycoord - point1.x) > 1e-10) {
      point1.setPoint([mycoord, point1.y]);
    }
  }, [mycoord]);


  // this effect looks for updates from canvas side
  useEffect(() => {
    if (Math.abs(mycoord - point1.x) > 1e-10) {
      setMyCoord(point1.x);
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
  const [mycoord, setMyCoord] = useModelState("my_x_coord");
  return <App mycoord={mycoord} setMyCoord={setMyCoord} />;
});
