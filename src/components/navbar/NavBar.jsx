import React, { useContext, useState, useEffect } from 'react'
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

  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data?.id) {
      localStorage.setItem("userId", data.id);
    }
  }, [data]);

  let {userlogin, setuserlogin} = useContext(UserContext);

  function changeUi(){
    setuserlogin(null);
    localStorage.removeItem("token");
  }

  return (
    <nav className="bg-slate-950 fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="w-[80%] flex flex-wrap items-center justify-between mx-auto p-4">

        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
            Social App
          </span>
        </Link>

        <span>
          <NotificationModal/>
        </span>

        <div className="flex gap-4 items-center md:order-2">

          {userlogin !== null ? <>
          
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex text-sm cursor-pointer bg-neutral-primary rounded-full"
            >
              <img className="w-8 h-8 rounded-full" src={data?.photo} alt="user"/>
            </button>

            <div className={`absolute right-10 top-16 z-50 ${isOpen ? 'block' : 'hidden'} bg-slate-950 border border-default-medium rounded-base shadow-lg w-44`}>
              
              <div className="px-4 py-3 text-sm border-b border-default">
                <span className="block text-white font-medium">{data?.name}</span>
                <span className="block text-white truncate">{data?.email}</span>
              </div>

              <ul className="p-2 text-sm text-white font-medium">
                <li>
                  <Link
                    to="/profile"
                    className="inline-flex items-center w-full p-2 hover:text-black hover:bg-neutral-tertiary-medium rounded"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    onClick={changeUi}
                    className="inline-flex items-center w-full p-2 hover:text-black hover:bg-neutral-tertiary-medium rounded"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>

            </div>

          </> : (
            <div className='flex gap-3 text-white'>
              <Link to="/register">register</Link>
              <Link to="/login">login</Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}