import React, { createContext } from 'react'
import  axios  from 'axios';

export let PostContext = createContext();

export default function PostContextProvider(props) {
    function getAllPosts(){
       return axios.get(`https://route-posts.routemisr.com/posts`,{
            headers: {
                token : localStorage.getItem("token"),
            }
        }).then((res)=>{
            return res.data.data.posts
            
        }).catch((err)=>{
            return err ;
            
        })
    }
  return (
    <PostContext.Provider value={{getAllPosts}}>
        {props.children}
    </PostContext.Provider>
  )
}
