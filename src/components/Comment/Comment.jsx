import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import CommentPopUpMenu from '../CommentPopUpMenu/CommentPopUpMenu';
import CommentLikeModal from '../CommentLikeModal/CommentLikeModal';
import CommentReplyModal from '../CommentReplyModal/CommentReplyModal';
import Replies from '../Replies/Replies';

export default function Comment({id}) {
  async function getPostComment(){
    return await axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,{
      headers:{
        token:localStorage.getItem("token")
      }
    })
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: "getComment",
    queryFn: getPostComment,
    retry: 4,
    select:(data)=> data?.data?.data?.comments
  });

  console.log(data);

  return (
    <>
    {isLoading ? (
      <>
        <div className="mx-auto text-center w-full mt-[200px]">
          <span class="loader "></span>
        </div>
      </>
    ) : (
      <>
        {data.map((comment) => (
          <div className="flex-col flex gap-2 my-2 p-3 bg-slate-700 text-white rounded-md ">
          <div className="  flex justify-between items-center text-[14px] ">
           <div className="flex items-center gap-1">
             <img
              src={comment.commentCreator.photo}
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
            <span className="w-[90%] text-[14px]  ">
              {comment.commentCreator.name}
            </span>{" "}
           </div>
           <span>{comment.createdAt}</span>
          </div>
          <span className="text-center font-bold text-2xl my-2">{comment.content}</span>
          {comment.commentCreator._id==localStorage.getItem('userId')?<>
            <div className='flex justify-between   items-center '>
            <CommentLikeModal postId={comment?.post} commentId= {comment?._id} />
            <CommentReplyModal postId={comment?.post} commentId= {comment?._id} />
           <CommentPopUpMenu postId={comment?.post} commentId= {comment?._id}/>
          </div>
          </>:<>
          <div className='flex justify-around items-center '>
            <CommentLikeModal postId={comment?.post} commentId= {comment?._id} />
            <CommentReplyModal postId={comment?.post} commentId= {comment?._id} />
          </div>
          </>}
          <Replies postId={comment?.post} commentId= {comment?._id}/>
        </div>
        ))}
      </>
    )}
  </>
  )
}
