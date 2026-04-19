import React from "react";
import style from "./DeleltePostModal.module.css";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function DeleltePostModal({ id }) {
  let query = useQueryClient();
  function deletePost(id) {
    axios
      .delete(`https://route-posts.routemisr.com/posts/${id}`, {
        headers: {
          Token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(`post deleted successfully`);
        query.invalidateQueries({ queryKey: ["userPosts"] });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <li>
      <span
        onClick={() => deletePost(id)}
        class="flex items-center p-4 text-base font-semibold text-heading rounded-base border border-default-medium hover:border-brand-subtle bg-neutral-secondary-medium hover:bg-brand-softer hover:text-fg-brand"
      >
        <span class="flex-1 cursor-pointer ms-2 whitespace-nowrap border-s border-default-medium ps-2">
          delete post
        </span>
      </span>
    </li>
  );
}
