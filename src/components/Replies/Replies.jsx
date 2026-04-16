import React, { useState } from 'react'
import style from "./Replies.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

export default function Replies({postId, commentId}) {

  function getReplies(){
   return axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,{
      headers:{
        token : localStorage.getItem('token')
      }
    })
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getReplies", commentId],
    queryFn: getReplies,
    retry: 4,
    select:(data)=> data?.data?.data?.replies
    
    
  });

  console.log(data);

  const [isShow, setisShow] = useState(false)

  function changeToggle(){
    setisShow(!isShow)
  } 
  return (

<>
  <div
    className="indent-2 cursor-pointer underline"
    onClick={changeToggle}
  >
    Replies...
  </div>

  {isShow && (
    <>
      {data
        ?.filter((reply) => reply.parentComment === commentId)
        .map((reply) => (
          <div
            key={reply._id}
            className="flex flex-col gap-2 my-2 p-3 bg-slate-500 w-[90%] mx-auto text-white rounded-md"
          >
            <div className="flex justify-between items-center text-[14px]">
              
              <div className="flex items-center gap-2">
                <img
                  src={reply.commentCreator?.photo}
                  className="w-[40px] h-[40px] rounded-full"
                  alt=""
                />
                <span className="text-[14px]">
                  {reply.commentCreator?.name}
                </span>
              </div>

              <span className="text-xs">
                {new Date(reply.createdAt).toLocaleString()}
              </span>
            </div>

            {/* محتوى الكومنت */}
            <p>{reply.content}</p>
          </div>
        ))}
    </>
  )}
</>

    // <>
    // <div className='indent-2 cursor-pointer underline ' onClick={changeToggle}>Replies...</div>
    // {isShow==true && (
    //   <>
    //   {data.map((reply)=>(
    //     <>
    //     <div key={reply._id} className="flex-col flex gap-2 my-2 p-3 bg-slate-500 w-[90%] mx-auto text-white rounded-md ">
    //       <div className="  flex justify-between items-center text-[14px] ">
    //        <div className="flex items-center gap-1">
    //          <img
    //           src={reply.commentCreator.photo}
    //           className="w-[40px] h-[40px] rounded-full"
    //           alt=""
    //         />
    //         <span className="w-[90%] text-[14px]  ">
    //           {reply.commentCreator.name}
    //         </span>{" "}
    //        </div>
    //        <span>{reply.createdAt}</span>
    //       </div>
    //       <span className="text-center font-bold text-2xl my-2">{reply.content}</span>
          
    //     </div>
    //     </>
    //   ))}
    //   </>
    // )}
    // </>
  )
}
