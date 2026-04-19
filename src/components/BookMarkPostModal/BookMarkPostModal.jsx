import React from "react";
import style from "./BookMarkPostModal.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { set } from 'react-hook-form';

export default function BookMarkPostModal({id,setisShow}) {
  let query = useQueryClient()

  function bookMarkPost(id) {
    axios
      .put(
        `https://route-posts.routemisr.com/posts/${id}/bookmark`,
        {},
        {
          headers: {
            Token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("post booked successfully ");
        query.invalidateQueries({ queryKey: ["userPosts"] });
        setisShow(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <li>
      <span
        onClick={() => bookMarkPost(id)}
        class="flex items-center p-4 text-base font-semibold cursor-pointer text-heading rounded-base border border-default-medium hover:border-brand-subtle bg-neutral-secondary-medium hover:bg-brand-softer hover:text-fg-brand"
      >
        <span class="flex-1 ms-2 whitespace-nowrap border-s border-default-medium ps-2">
          book mark post
        </span>
      </span>
    </li>
  );
}
