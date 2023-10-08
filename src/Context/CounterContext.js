import { createContext, useState } from "react";

export const counterContext = createContext();
export function CounterContextProvider(props) {
//   let x = 5;
  let y = 10;
const [counter,setCounter]=useState(5);

function increaseCounter(){
    setCounter(counter+1);
}
  return(
    <counterContext.Provider value={{counter,y,increaseCounter}}>
        {props.children}
    </counterContext.Provider>
  )
}
