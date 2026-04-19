import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { data } from "react-router-dom";

export default function LikeModal({ id }) {
  const [isLiked, setisLiked] = useState(false);
  let query = useQueryClient()

  function likePost(id) {
    axios
      .put(
        `https://route-posts.routemisr.com/posts/${id}/like`,
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
          toast.success("post liked successfully!");
          query.invalidateQueries({queryKey:'getPosts'})
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
    
      {isLiked == true  ? (
        <i
          onClick={() => {
            likePost(id);
          }}
          class="fa-solid cursor-pointer fa-heart text-3xl text-red-600  hover:text-slate-700 duration-200"
        ></i>
      ) : (
        <i
          onClick={() => {
            likePost(id);
          }}
          class="fa-solid cursor-pointer fa-heart text-3xl text-slate-900 hover:text-red-400 duration-200"
        ></i>
      )}
    </>
  );
}
