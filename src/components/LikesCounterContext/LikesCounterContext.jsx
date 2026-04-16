import React from 'react'


import React, { createContext, useState } from 'react'
export let LikesCounterContext = createContext();


export default function LikesCounterContextProvider(props) {
    const [counter, setcounter] = useState(0)
    function changeCounter(id){
      axios.put(`https://route-posts.routemisr.com/posts/${id}/like`,{},{
        headers:{
          token:localStorage.getItem("token")
        }
      }).then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        console.log(err.response);
        
      })
    }

  return (
    <LikesCounterContext.Provider value={{counter,changeCounter}}>
        {props.children}
    </LikesCounterContext.Provider>
  )
}
