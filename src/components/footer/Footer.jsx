import React from "react";
import CreatePost from "./CreatePost/CreatePost";

export default function Footer() {
  return (
    <div className="w-full left-0 right-0 bg-slate-900 p-7 flex justify-center  fixed bottom-0  ">
      <div className="bottom-0 fixed w-full  rounded-full p-3 flex justify-center items-center  ">
        <span className="w-[80%]">
          <CreatePost />
        </span>
      </div>
    </div>
  );
}
