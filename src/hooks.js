import * as React from "react";

/** @type {React.Context<import("@anywidget/types").AnyModel>} */
export let ModelContext = React.createContext();

/** @param {string} name */
export function useModelState(name) {
  let model = React.useContext(ModelContext);
  if (!model) {
    throw new Error("ModelContext not found");
  }
  let [state, setState] = React.useState(model.get(name));
  React.useEffect(() => {
    let callback = () => setState(model.get(name));
    model.on(`change:${name}`, callback);
    return () => model.off(`change:${name}`, callback);
  }, []);
  return [state, (value) => {
    model.set(name, value);
    model.save_changes();
  }];
}
