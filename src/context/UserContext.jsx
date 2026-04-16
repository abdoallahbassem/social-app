import React, { createContext, useState } from 'react'
export let UserContext = createContext();

export default function UserContextProvider(props) {
   const [userlogin, setuserlogin] = useState(localStorage.getItem("token"))
  return (
    <UserContext.Provider value={{userlogin, setuserlogin}}>
        {props.children}
    </UserContext.Provider>
  )
}
