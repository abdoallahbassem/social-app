import React from 'react'
import NavBar from './../navbar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './../footer/Footer';


export default function LayOut() {
  return (
    <>
    <NavBar/>
    <div className=" mx-auto p-3 mt-16 ">
      <Outlet/>
    </div>
    </>
    
  )
}
