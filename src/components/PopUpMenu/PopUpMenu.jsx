import React, { useState } from "react";
import style from "./PopUpMenu.module.css";
import axios from "axios";
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function PopUpMenu({ id }) {
  const [isShow, setisShow] = useState(false);
  function changeToggle() {
    setisShow(!isShow);
  }
  let query = useQueryClient();

  console.log(id);
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
        setisShow(false)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

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
        setisShow(false)

      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <>
      <button
        onClick={changeToggle}
        type="button"
        data-modal-target="crypto-modal"
        data-modal-toggle="crypto-modal"
        class="inline-flex items-center text-white duration-200  border-default-medium  hover:text-gray-500 focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2.5 focus:outline-none"
      >
        <i class="fa-solid fa-ellipsis-vertical text-xl"></i>
      </button>
      {isShow && (
        <>
          <div
            id="crypto-modal"
            tabindex="-1"
            aria-hidden="true"
            class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                  <h3 class="text-lg font-medium text-heading">post options</h3>
                  <button
                    onClick={changeToggle}
                    type="button"
                    class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="crypto-modal"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="pt-4 md:pt-6">
                  <ul class="my-4 space-y-3">
                    <li>
                      <span class="flex items-center p-4 text-base font-semibold text-heading rounded-base border border-default-medium hover:border-brand-subtle bg-neutral-secondary-medium hover:bg-brand-softer hover:text-fg-brand">
                        <span class="flex-1 ms-2 whitespace-nowrap border-s border-default-medium ps-2">
                          <UpdatePostModal id={id} />
                        </span>
                      </span>
                    </li>
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
                    <li>
                      <span
                        onClick={() => bookMarkPost(id)}
                        class="flex items-center p-4 text-base font-semibold text-heading rounded-base border border-default-medium hover:border-brand-subtle bg-neutral-secondary-medium hover:bg-brand-softer hover:text-fg-brand"
                      >
                        <span class="flex-1 ms-2 whitespace-nowrap border-s border-default-medium ps-2">
                          book mark post
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
