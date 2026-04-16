import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentLikeModal({commentId , postId}) {
  const [isLiked, setisLiked] = useState(false);
  let query = useQueryClient()

  function likeComment() {
    axios
      .put(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.data.liked == true) {
          setisLiked(true);
          query.invalidateQueries({queryKey:['userPosts']})
          toast.success("comment liked successfully!");
        } else {
          setisLiked(false);
          toast.success("post unliked successfully!");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <>
      {isLiked == true ? (
        <i
          onClick={() => {
            likeComment();
          }}
          class="fa-solid cursor-pointer fa-heart text-2xl text-red-600  hover:text-slate-700 duration-200"
        ></i>
      ) : (
        <i
          onClick={() => {
            likeComment();
          }}
          class="fa-solid cursor-pointer fa-heart text-2xl text-slate-900 hover:text-red-400 duration-200"
        ></i>
      )}
    </>
  );
}
