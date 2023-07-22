import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { ModelContext } from "./hooks.js";

export function render({ model, el }) {
  let root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <ModelContext.Provider value={model}>
        <App />
      </ModelContext.Provider>
    </React.StrictMode>,
  );
  return () => root.unmount();
}
