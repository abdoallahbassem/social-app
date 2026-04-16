import React, { useState } from "react";
import style from "./Register.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver }  from "@hookform/resolvers/zod"
import {useNavigate} from "react-router-dom"

export default function Register() {
  const [loading, setloading] = useState(false)
  const [apiError, setapiError] = useState("")
  const navigate = useNavigate();
   const schema = z.object({
    name: z
      .string()
      .min(1, "min length is 1 char")
      .max(10, "max length is 10 chars"),
    email: z.email("invalid email"),
    password: z.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must include one capital char and 0-9 small chars and an special char and a number , min length is 8"
    ),
    rePassword:z.string(),
    dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date)=>{let userDate = new Date(date);
      const now = new Date();
      now.setHours(0,0,0,0);
      return userDate<=now ;
     },"invalid date "),
    gender:z.enum(["male","female"],"gender must be chosen"),
  }).refine((obj)=>{
    return obj.rePassword===obj.password;
  },{
    error:"password and rePassword not matched !",
    path:["rePassword"],
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },resolver:zodResolver(schema),
  },
);
  let { register, handleSubmit , formState } = form;
  function handleRegister(values) {
    setloading(true)
    console.log(values);
    axios.post(`https://route-posts.routemisr.com/users/signup`,values).then((res)=>{
      console.log(res);
      setloading(false);
      console.log("hello");
      
      navigate('/login')
    }).catch((err)=>{
      setapiError(err.response);
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
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            enter your name
          </label>
          {formState.errors.name && formState.touchedFields.name? <p className=" text-red-600 text-center font-semibold my-2">
            {formState.errors.name.message}
          </p>:""}
        </div>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            enter your rePassword
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
            
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            enter your date of birth
          </label>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center mb-4">
            <input
              id="male"
              type="radio"
              {...register("gender")}
              value="male"
              className="w-4 h-4 text-neutral-primary border-slate-900 bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="male"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              male
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="female"
              type="radio"
              {...register("gender")}
              value="female"
              className="w-4 h-4 text-neutral-primary border-slate-900 bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border  appearance-none"
            />
            <label
              htmlFor="female"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              female
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {loading == true? <i className="fas fa-spinner fa-spin text-white "></i>:"Submit"}
        </button>
      </form>
    </>
  );
}
