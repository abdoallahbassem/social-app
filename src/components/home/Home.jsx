import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentModal from "../CommentModal/CommentModal";
import PopUpMenu from "../PopUpMenu/PopUpMenu";
import LikeModal from "../LikeModal/LikeModal";
import ShareModal from "../ShareModal/ShareModal";
import CommentPopUpMenu from "../CommentPopUpMenu/CommentPopUpMenu";

export default function Home() {
  // let {getAllPosts} = useContext(PostContext);
  const [sharedCount, setsharedCount] = useState(0);
  const [commentCount, setcommentCount] = useState(0);
  const [likeCount, setlikeCount] = useState(0);

  function getAllPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: "getPosts",
    queryFn: getAllPosts,
    // staleTime:20000,
    retry: 4,
    // refetchInterval:5000
    select: (data) => data?.data?.data.posts,
  });

  useEffect(() => {
    if (data) {
      let shared = 0;
      let comment = 0;
      let like = 0;
      data.forEach((post) => {
        shared += post.sharesCount;
        comment += post.commentsCount;
        like += post.likesCount;
      });
      setsharedCount(shared);
      setcommentCount(comment);
      setlikeCount(like);
    }
  },[data])

console.log(likeCount);

  if (isError) {
    return (
      <h3 className="font-bold text-red-600 text-3xl ">{error.message}</h3>
    );
  }

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
          {data.map((post) => (
            <div
              className=" w-full p-3  md:w-[80%] lg:w-[60%] bg-gray-200 rounded-lg my-2 mx-auto "
              key={post.id}
            >
              <div className="flex justify-between ps-2 pe-2 items-center bg-slate-900 rounded-md  w-full">
                <div className="px-3 py-1 flex justify-center items-center">
                  <img
                    src={post.user.photo}
                    className="w-[50px] h-[50px] rounded-full "
                    alt=""
                  />
                  <span className="font-bold text-white">{post.user.name}</span>
                </div>
                <span className="p-3 text-white text-[14px]">
                  {post.createdAt}
                </span>
                <span>
                  <PopUpMenu id={post.id} />
                </span>
              </div>
              <Link to={`/postDetails/${post.id}`}>
                <h1 className="text-center font-bold text-2xl my-4 text-slate-900">
                  {post.body}
                </h1>
                <div className="flex flex-column align-items-center justify-content-center">
                  <img src={post.image} className="mx-auto w-full" alt="" />
                </div>
                <div>
                </div>
              </Link>
              {post?.sharedPost !== null ? (
                <div className="w-[90%] mx-auto p-3 bg-slate-300 rounded-md">
                  <div className="flex justify-between ps-2 pe-2 items-center bg-slate-900 rounded-md  w-full">
                    <div className="px-3 py-2 flex justify-center items-center">
                      <img
                        src={post.sharedPost.user.photo}
                        className="w-[30px] h-[30px] rounded-full "
                        alt=""
                        />
                      <span className="font-bold text-[12px] ms-2 text-white">
                        {post.sharedPost.user.name}
                      </span>
                    </div>
                    <span className="p-3 text-white text-[12px]">
                      {post.sharedPost.createdAt}
                    </span>
                    <span>
                      <PopUpMenu id={post.sharedPost.id} />
                    </span>
                  </div>
                  <Link to={`/postDetails/${post.sharedPost.id}`}>
                    <h1 className="text-center font-bold text-xl my-4 text-slate-900">
                      {post.sharedPost.body}
                    </h1>
                    <div className="flex flex-column align-items-center justify-content-center">
                      <img
                        src={post.sharedPost.image}
                        className="mx-auto w-full"
                        alt=""
                        />
                    </div>
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div className="flex items-center  my-3 pt-3 pb-1 rounded-md justify-around  ">
                <div className="flex flex-col items-center">
                  <LikeModal id={post.id} />
                </div>
                <div className="flex flex-col items-center">
                  <CommentModal id={post.id} />
                </div>
                <div className="flex flex-col items-center">
                  <span>
                    <ShareModal id={post.id} />
                  </span>
                </div>
              </div>
              {post.topComment !== null ? (
                <>
                  <div className="flex-col flex gap-2 my-2 p-3 bg-slate-700 text-white rounded-md ">
                    <div className="  flex justify-between items-center text-[14px] ">
                      <div className="flex items-center gap-1">
                        <img
                          src={post.topComment.commentCreator.photo}
                          className="w-[40px] h-[40px] rounded-full"
                          alt=""
                        />
                        <span className="w-[90%] text-[14px]  ">
                          {post.topComment.commentCreator.name}
                        </span>{" "}
                      </div>
                      <span>{post.topComment.createdAt}</span>
                      <CommentPopUpMenu
                        postId={post?.id}
                        commentId={post?.topComment._id}
                      />
                    </div>
                    <span className="text-center">
                    <Link to={`/postDetails/${post.id}`}>
                      {post.topComment.content}
                    </Link>
                    </span>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}
