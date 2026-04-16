import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import NotificationModal from './../NotificationModal/NotificationModal';

export default function NavBar() {


  function getUserData(){
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
      headers:{
        token:localStorage.getItem("token"),
      }
    })
  }

  let {data}= useQuery({
    queryKey:['userData'],
    queryFn:getUserData,
    select:(data)=> data?.data?.data?.user
  })
  console.log(data);

  localStorage.setItem("userId",data?.id);
  
  let {userlogin, setuserlogin} = useContext(UserContext);
  function changeUi(){
    setuserlogin(null);
    localStorage.removeItem("token");
  }
  return (



<nav className="bg-slate-950 fixed w-full z-20 top-0 start-0 border-b border-default">
  <div className="w-[80%] flex flex-wrap items-center justify-between mx-auto p-4">
  <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
      <span className="self-center text-xl text-white font-semibold whitespace-nowrap">Social App</span>
  </Link>
  <span>
    <NotificationModal/>
  </span>
  <div className="flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {userlogin !== null ?<>
        <button type="button" className="flex text-sm cursor-pointer bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={data?.photo} alt="user photo"/>
      </button>
      <div className="z-50  hidden bg-slate-950 border border-default-medium rounded-base shadow-lg w-44" id="user-dropdown">
        <div className="px-4 py-3 text-sm border-b border-default">
          <span className="block text-white font-medium">{data?.name}</span>
          <span className="block text-white truncate">{data?.email}</span>
        </div>
        <ul className="p-2 text-sm text-white font-medium" aria-labelledby="user-menu-button">
          <li>
            <Link to="/profile" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profile</Link>
          </li>
          <li>
            <Link to="/login" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" onClick={()=>changeUi()}>Sign Out</Link>
          </li>
          
        </ul>
        
      </div>
      </>:<div className='flex gap-3 text-white'>
        <Link to="/register"> register </Link>
        <Link to="/login"> login </Link>
      </div>}
      

      
  </div>
  
  </div>
</nav>

  )
}
