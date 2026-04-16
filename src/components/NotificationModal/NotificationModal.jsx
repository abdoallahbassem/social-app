import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function NotificationModal() {
  const [unReadCount, setunReadCount] = useState(0);

  const [oldCount, setOldCount] = useState(
    Number(localStorage.getItem("unReadCount")) || 0
  );

  function getNotification() {
    return axios.get(
      `https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getNotification"],
    queryFn: getNotification,
    retry: 4,
    select: (data) => data?.data?.data?.notifications,
  });

  function getNotificationCount() {
    axios
      .get(`https://route-posts.routemisr.com/notifications/unread-count`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const newCount = res?.data?.data?.unreadCount;
        setunReadCount(newCount-oldCount);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getNotificationCount();
  }, []);

  const [isShow, setisShow] = useState(false);

  function changeToggle() {
    setisShow(!isShow);
  }

  return (
    <>
      <button
        onClick={() => {
          changeToggle();

          setOldCount(unReadCount);
          localStorage.setItem("unReadCount", unReadCount);
        }}
        className="block cursor-pointer"
        type="button"
      >
        <i className="fa-solid text-white text-2xl fa-bell relative">
          {unReadCount > 0 && unReadCount !== oldCount && (
            <span className="bg-red-500 p-1 text-[10px] rounded-full absolute top-3 text-center">
              {unReadCount}
            </span>
          )}
        </i>
      </button>

      {isShow && (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
          <div className="relative p-4 mx-auto w-full md:w-[75%]">
            <div className="relative bg-neutral-primary-soft border rounded-base shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-medium">Notifications</h3>

                <button
                  onClick={changeToggle}
                  type="button"
                  className="text-body hover:bg-gray-200 rounded text-sm w-9 h-9 flex justify-center items-center"
                >
                  ✕
                </button>
              </div>

              <div>
                {data?.map((notification) => (
                  <Link
                    key={notification?._id}
                    to={`/postDetails/${notification?.entity.id}`}
                  >
                    <div className="flex justify-around items-center m-3 bg-slate-900 rounded-md w-full p-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={notification?.actor?.photo}
                          className="w-[50px] h-[50px] rounded-full"
                          alt=""
                        />
                        <span className="font-bold text-white text-[11px]">
                          {notification?.actor?.name}
                        </span>
                      </div>

                      <span className="text-white text-sm">
                        {notification?.type === "like_post"
                          ? "liked your post"
                          : notification?.type === "comment_post"
                          ? "commented on your post"
                          : "shared your post"}
                      </span>

                      <span className="text-white text-[11px]">
                        {notification?.createdAt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
