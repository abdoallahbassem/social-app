import React, { useState } from "react";
import style from "./CreatePost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  let form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  let { register, handleSubmit } = form;
  let query = useQueryClient();

  function handlePost(values) {
    let myData = new FormData();
    myData.append("body", values.body);
    myData.append("image", values.image[0]);
    axios
      .post(`https://route-posts.routemisr.com/posts`, myData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setisShow(false);
        query.invalidateQueries({ queryKey: ["userPosts"] });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
  }
  const [isShow, setisShow] = useState(false);
  function changeToggle() {
    setisShow(!isShow);
  }
  return (
    <>
      <button
        onClick={changeToggle}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="  block  box-border border border-transparent  mx-auto  focus:ring-brand-medium shadow-xs font-medium my-2 rounded-base text-sm focus:outline-none"
        type="button"
      >
        {isShow == false ? (
          <>
            {" "}
            <div className="h-[60px] w-[60px] bg-blue-600 p-6 rounded-full flex items-center justify-center">

            <i className="fa-solid fa-plus mx-auto    text-center  cursor-pointer text-slate-900 text-2xl hover:text-slate-700 duration-200"></i>{" "}
            </div>
          </>
        ) : (
          ""
        )}
      </button>

      {isShow && (
        <>
          <button
            onClick={changeToggle}
            type="button"
            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <form
            className="pt-4 md:pt-6 w-full  mx-auto mb-7 bg-slate-300 p-3 rounded-md "
            onSubmit={handleSubmit(handlePost)}
          >
            <div className="mb-4">
              <label
                htmlFor="post"
                className="block mb-4  text-md  font-bold text-slate-900"
              >
                Create post
              </label>

              <input
                type="text"
                {...register("body")}
                id="post"
                className="bg-neutral-secondary-medium border shadow-md shadow-black border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="What Are You Thinking About..."
                required
              />
              <div className="w-full bg-slate-300 shadow-md shadow-black  rounded-lg my-3">
                <label
                  htmlFor="image"
                  className="block w-25 mb-2.5 text-sm font-medium text-center w-full text-heading mx-auto "
                >
                  <i className="fas fa-image text-3xl my-2  "></i>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  id="image"
                  className="bg-neutral-secondary-medium hidden border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white cursor-pointer shadow-md shadow-black  bg-slate-900 box-border border border-transparent hover:bg-slate-800 duration-200 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
            >
              Create Post
            </button>
          </form>
        </>
      )}
    </>
  );
}
