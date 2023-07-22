import * as React from "react";

import "mafs/core.css";
// import "mafs/font.css";

import { Mafs, Coordinates } from "mafs";


function App() {
  return (
    <Mafs>
      <Coordinates.Cartesian />
    </Mafs>
  )
}
export default App;
