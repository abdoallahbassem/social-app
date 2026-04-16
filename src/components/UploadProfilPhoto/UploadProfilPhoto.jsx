import React, { useState } from 'react'
import style from "./UploadProfilPhoto.module.css"
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UploadProfilPhoto() {

  const [isUploaded, setisUploaded] = useState(false)

  const [isShow, setisShow] = useState(false);
  function changeToggle() {
    setisShow(!isShow);
  }

  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });
  let { register, handleSubmit } = form;

   function UpdateProfilePicture(values){
    let formData = new FormData();
    formData.append('photo',values.photo[0])
    axios.put(`https://route-posts.routemisr.com/users/upload-photo`,formData,{
    headers:{
      token : localStorage.getItem("token")
    }
   }).then((res)=>{
    console.log(res);
    if (res.data.message==="photo uploaded successfully") {
      toast.success(res.data.message)
      setisUploaded(true)
    }
    
   }).catch((err)=>{
    console.log(err);
    
   })
    
  }
  

  return (
    <>
      <button
        onClick={changeToggle}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="text-white border border-transparent rounded-full size-1 duration-200 hover:bg-slate-800 cursor-pointer bg-slate-600 text-center p-4   focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 flex items-center justify-center text-sm  focus:outline-none"
        type="button"
      >
        <i className='fas fa-pen  '> </i>
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
                  Update Picture
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
              <form onSubmit={handleSubmit(UpdateProfilePicture)} className="pt-4 md:pt-6">
                <div className="mb-4">
                  <label
                    htmlFor="Password"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Your picture
                  </label>
                  <input
                  {...register("photo")}
                    type="file"
                    id="Password"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Write your Password..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="text-white cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
                >
                Confirm Update Picture
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


