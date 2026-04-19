import React from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DeleteCommentModal({id,postId}) {
  let query = useQueryClient();

  function deleteComment() {
    axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("comment deleted successfully");
        query.invalidateQueries({ queryKey: "getComment" });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <button
      onClick={()=>{
        deleteComment(id,postId)
      }}
      data-modal-target="authentication-modal"
      data-modal-toggle="authentication-modal"
      className="  block  box-border border border-transparent font-bold  shadow-xs  leading-5 rounded-base cursor-pointer   focus:outline-none"
      type="button"
    >
      Delete Comment
    </button>
  );
}
