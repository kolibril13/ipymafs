import React, { useState, useEffect } from "react";
import {
  Coordinates,
  Plot,
  Line,
  Mafs,
  Point,
  Theme,
  useMovablePoint,
  useStopwatch,
  vec,
} from "mafs"
import { easeInOutCubic } from "js-easing-functions";

import "mafs/core.css";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [mycoord, setMyCoord] = useModelState("my_x_coord");
  return <App mycoord={mycoord} setMyCoord={setMyCoord} />;
});



function xyFromBernsteinPolynomial(
  p1,
  c1,
  c2,
  p2,
  t
) {
  return [
    vec.scale(p1, -(t ** 3) + 3 * t ** 2 - 3 * t + 1),
    vec.scale(c1, 3 * t ** 3 - 6 * t ** 2 + 3 * t),
    vec.scale(c2, -3 * t ** 3 + 3 * t ** 2),
    vec.scale(p2, t ** 3),
  ].reduce(vec.add, [0, 0]);
}

function inPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    pairs.push([arr[i], arr[i + 1]]);
  }

  return pairs;
}

function App({mycoord, setMyCoord}) {
  console.log("hiii");
  console.log(mycoord);

  const [t, setT] = React.useState(0.5);
  const opacity = 1 - (2 * t - 1) ** 6;

  const p1 = useMovablePoint([mycoord, 2]);


  // this effect looks for updates from the python side
  useEffect(() => {
    if (Math.abs(mycoord - p1.x) > 1e-10) {
      p1.setPoint([mycoord, p1.y]);
    }
  }, [mycoord]);


  // this effect looks for updates from canvas side
  useEffect(() => {
    if (Math.abs(mycoord - p1.x) > 1e-10) {
      setMyCoord(p1.x);
    }
  }, [p1.x]);


  const p2 = useMovablePoint([5, -2]);

  const c1 = useMovablePoint([-2, -3]);
  const c2 = useMovablePoint([2, 3]);

  const lerp1 = vec.lerp(p1.point, c1.point, t);
  const lerp2 = vec.lerp(c1.point, c2.point, t);
  const lerp3 = vec.lerp(c2.point, p2.point, t);

  const lerp12 = vec.lerp(lerp1, lerp2, t);
  const lerp23 = vec.lerp(lerp2, lerp3, t);

  const lerpBezier = vec.lerp(lerp12, lerp23, t);

  const duration = 2;
  const { time, start } = useStopwatch({
    endTime: duration,
  });
  React.useEffect(() => {
    setTimeout(() => start(), 500);
  }, [start]);
  React.useEffect(() => {
    setT(easeInOutCubic(time, 0, 1, duration));
  }, [time]);

  function drawLineSegments(
    pointPath,
    color,
    customOpacity = opacity * 0.5
  ) {
    return inPairs(pointPath).map(([p1, p2], index) => (
      <Line.Segment
        key={index}
        point1={p1}
        point2={p2}
        opacity={customOpacity}
        color={color}
      />
    ));
  }

  function drawPoints(points, color) {
    return points.map((point, index) => (
      <Point
        key={index}
        x={point[0]}
        y={point[1]}
        color={color}
        opacity={opacity}
      />
    ));
  }

  return (
    <>
      <Mafs viewBox={{ x: [-5, 5], y: [-4, 4] }}>
        <Coordinates.Cartesian
          xAxis={{ labels: false, axis: false }}
          yAxis={{ labels: false, axis: false }}
        />

        {drawLineSegments(
          [p1.point, c1.point, c2.point, p2.point],
          Theme.pink,
          0.5
        )}

        {drawLineSegments([lerp1, lerp2, lerp3], Theme.red)}
        {drawPoints([lerp1, lerp2, lerp3], Theme.red)}

        {drawLineSegments([lerp12, lerp23], Theme.yellow)}
        {drawPoints([lerp12, lerp23], Theme.yellow)}

        <Plot.Parametric
          t={[0, t]}
          weight={3}
          xy={(t) =>
            xyFromBernsteinPolynomial(p1.point, c1.point, c2.point, p2.point, t)
          }
        />
        
        <Plot.Parametric
          t={[1, t]}
          weight={3}
          opacity={0.5}
          style="dashed"
          xy={(t) =>
            xyFromBernsteinPolynomial(p1.point, c1.point, c2.point, p2.point, t)
          }
        />

        {drawPoints([lerpBezier], Theme.foreground)}

        {p1.element}
        {p2.element}
        {c1.element}
        {c2.element}
      </Mafs>

      <div className="p-4 border-gray-700 border-t bg-black text-white">
        <span className="font-display">t =</span>{" "}
        <input
          type="range"
          min={0}
          max={1}
          step={0.005}
          value={t}
          onChange={(event) => setT(+event.target.value)}
        />
      </div>
    </>
  );
}

