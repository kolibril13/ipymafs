import * as React from "react";
import { Mafs, Coordinates } from "mafs";
import { createRender, useModelState } from "@anywidget/react";
import "mafs/core.css";

export const render = createRender(() => {
  const [content] = useModelState("content");
    return (
    <Mafs>
      <Coordinates.Cartesian />
    </Mafs>
  );
});





