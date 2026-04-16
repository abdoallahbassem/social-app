import React, { createContext, useState } from 'react'
export let CounterContext = createContext();

export default function CounterContextProvider(props) {
    const [counter, setcounter] = useState(0)
    function changeCounter(){
        setcounter(Math.random());
    }

  return (
    <CounterContext.Provider value={{counter,changeCounter}}>
        {props.children}
    </CounterContext.Provider>
  )
}
