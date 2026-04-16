import style from "./Login.module.css"
import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver }  from "@hookform/resolvers/zod"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../../context/UserContext";
export default function Login() {
  let {userlogin, setuserlogin} = useContext(UserContext);
  const [loading, setloading] = useState(false)
  const [apiError, setapiError] = useState("")
  const navigate = useNavigate();
   const schema = z.object({
    email: z.email("invalid email"),
    password: z.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must include one capital char and 0-9 small chars and an special char and a number , min length is 8"
    ),
  })

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },resolver:zodResolver(schema),
  },
);
  let { register, handleSubmit , formState } = form;
  function handleRegister(values) {
    setloading(true)
    console.log(values);
    axios.post(`https://route-posts.routemisr.com/users/signin`,values).then((res)=>{
      console.log(res);
      setloading(false);
      navigate('/');
      localStorage.setItem("token",res.data.data.token);
      setuserlogin(res.data.data.token);
    }).catch((err)=>{
      setapiError(err.response.data.error);
      setloading(false);
    })
  }

 
  return (
    <>{apiError &&(<h1 className="text-red-600 font-bold my-3 text-center text-2xl ">
      {apiError}
    </h1>)}
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-md mx-auto"
      >
        
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            enter your email
          </label>
          {formState.errors.email && formState.touchedFields.email? <p className=" text-red-600 text-center font-semibold my-2">
            {formState.errors.email.message}
          </p>:""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            enter your password
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
        >
          {loading == true? <i className="fas fa-spinner fa-spin text-white  disabled  "></i>:"Submit"}
        </button>
      </form>
    </>
  );
}
