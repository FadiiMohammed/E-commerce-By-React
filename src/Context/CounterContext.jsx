import { createContext, useState } from "react";

export let counterContext = createContext();
export function CounterContextProdvider(props) {
  let [counter, setCounter] = useState(0);
  function increaseCounter() {
    setCounter(Math.random());
  }
  return (
    <counterContext.Provider value={{ counter, increaseCounter }}>
      {props.children}
    </counterContext.Provider>
  );
}
