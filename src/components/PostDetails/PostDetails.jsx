import React, { useEffect } from "react";
import style from "./PostDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comment from "../Comment/Comment";
import ShareModal from "../ShareModal/ShareModal";
import CommentModal from "../CommentModal/CommentModal";
import LikeModal from "../LikeModal/LikeModal";
import PopUpMenu from "../PopUpMenu/PopUpMenu";

export default function PostDetails() {
  let { id } = useParams();
  console.log(id);

  function getPost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts",id],
    queryFn: getPost,
    // staleTime:20000,
    retry: 4,
    // refetchInterval:5000
    select: (data) => data?.data?.data.post,
  });
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
if (isError) return <p>{error.message}</p>;
  

  return (
  <>
  <div
              className=" w-full p-3  md:w-[60%] lg:w-[50%] bg-gray-200 rounded-md mb-15 my-5 mx-auto "
              key={data.id}
            >
              <div className="flex justify-between ps-2 pe-2 items-center bg-slate-900 rounded-md  w-full">
                <div className="px-3 py-1 flex justify-center items-center">
                  <img
                    src={data.user.photo}
                    className="w-[50px] h-[50px] rounded-full "
                    alt=""
                  />
                  <span className="font-bold text-white">{data.user.name}</span>
                </div>
                <span className="p-3 text-white text-[14px]">{data.createdAt}</span>
              </div>
              <h1 className="text-center font-bold text-2xl my-4 text-slate-900">
                {data.body}
              </h1>
              <div className="flex flex-column align-items-center justify-content-center">
                <img src={data.image} className="mx-auto w-full" alt="" />
              </div>
              <div>
              

              {data?.sharedPost !== null ? (
                <div className="w-[90%] mx-auto p-3 bg-slate-300 rounded-md">
                  <div className="flex justify-between ps-2 pe-2 items-center bg-slate-900 rounded-md  w-full">
                    <div className="px-3 py-2 flex justify-center items-center">
                      <img
                        src={data.sharedPost.user.photo}
                        className="w-[30px] h-[30px] rounded-full "
                        alt=""
                        />
                      <span className="font-bold text-[12px] ms-2 text-white">
                        {data.sharedPost.user.name}
                      </span>
                    </div>
                    <span className="p-3 text-white text-[12px]">
                      {data.sharedPost.createdAt}
                    </span>
                    <span>
                      <PopUpMenu id={data.sharedPost.id} />
                    </span>
                  </div>
                  <Link to={`/postDetails/${data.sharedPost.id}`}>
                    <h1 className="text-center font-bold text-xl my-4 text-slate-900">
                      {data.sharedPost.body}
                    </h1>
                    <div className="flex flex-column align-items-center justify-content-center">
                      <img
                        src={data.sharedPost.image}
                        className="mx-auto w-full"
                        alt=""
                        />
                    </div>
                  </Link>
                </div>
              ) : (
                ""
              )}


              </div>
              <div className="flex items-center  my-2 pt-3 pb-1 rounded-md justify-around  ">
                <div className="flex flex-col items-center">
                <LikeModal id={data.id} />
                </div>
                <div className="flex flex-col items-center">
                <CommentModal id={data.id} />
                </div>
                <div className="flex flex-col items-center">
                <span>
                  <ShareModal id={data.id}/>
                </span>
                
                </div>
              </div>
            <Comment id={data.id} />
            </div>
  </>
  )
}
