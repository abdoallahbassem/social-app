import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdatePostModal({id}) {
  const [isShow, setisShow] = useState(false);
  function changeToggle() {
    setisShow(!isShow);
  }

  let query = useQueryClient()

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  let { register, handleSubmit } = form;

  async function addComment(values) {
    const formData = new FormData();
    formData.append("body", values.body);
    
    if (values.image[0]) {
      formData.append("image", values.image[0]);
    }
    
    try {
      let res = await axios.put(
        `https://route-posts.routemisr.com/posts/${id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      toast.success("post updated successfully !")
      query.invalidateQueries({queryKey:['userPosts']})
      setisShow(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <button
        onClick={changeToggle}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="  block  box-border border border-transparent  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base   focus:outline-none"
        type="button"
      >
        Update Post
      </button>

      {isShow && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                  Update Post
                </h3>
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
              </div>
              <form onSubmit={handleSubmit(addComment)} className="pt-4 md:pt-6">
                <div className="mb-4">
                  <label
                    htmlFor="content"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    post content
                  </label>
                  <input
                    {...register("body")}
                    type="text"
                    id="content"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Write your Post Body..."
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Image (optional)
                  </label>
                  <input
                    {...register("image")}
                    type="file"
                    id="image"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
                >
                  Update Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}