import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserPosts from "../UserPosts/UserPosts";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import UploadProfilPhoto from "../UploadProfilPhoto/UploadProfilPhoto";
import Footer from "../footer/Footer";

export default function Profile() {
  function getUserData() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  let { data } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
  console.log(data);

  return (
    <div className="mb-15">
      <div className="w-[90%] mx-auto bg-slate-900 flex flex-col items-center justify-center p-4 font-bold  text-white ">
        <div className="relative">
          <img src={data?.photo} className="size-[100px]  rounded-full" alt="" />
          <span className="absolute top-16 left-19 ">
          <UploadProfilPhoto />
          </span>
        </div>

        <span>Name: {data?.name}</span>
        <span>Handle: {data?.username}</span>
        <span>Email: {data?.email}</span>
        <span>Birth Date: {data?.dateOfBirth}</span>
      </div>
      <div className="w-[90%] mx-auto bg-slate-900 flex flex-col items-center justify-center p-4 my-4 gap-3">
        <ChangePasswordModal />
      </div>

      <UserPosts id={data?.id} />
      <Footer/>

    </div>
  );
}
