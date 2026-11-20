"use client"
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg"
import Image from 'next/image'
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CartRes } from "../cart/typescript/cart.interface";

export default function Navbar() {
  const [isOpen,setOpen] = useState(true)
  const {data:session , status} = useSession()
  const {data} = useQuery<CartRes>({
    queryKey:['cart'],
    enabled: status==='authenticated',
    queryFn:async()=>{
      const res = await fetch('/api/cart')
      if(!res.ok) throw new Error('Failed to load cart')
      return res.json()
    }
  })
  const links = [
    { path: "/products", element: "products" },
  ];
  const auths=[
     { path: "/auth/login", element: "login" },
    { path: "/auth/register", element: "register" },
  ]
  function handleLogOut(){
    signOut({callbackUrl:'/'})
  }

  return (
    <nav className="bg-light border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap gap-5 items-center justify-between mx-auto p-4">

        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={logo} alt="freshcart_logo" />
        </Link>

        <button
          onClick={()=>setOpen(!isOpen)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`${isOpen&&'hidden'} justify-between w-full md:flex `} id="navbar-default" >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row gap-5 md:mt-0 md:border-0  dark:bg-gray-800  dark:border-gray-700">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="block py-2 px-3 text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white hover:text-green-600 transition-colors"
                  aria-current="page"
                >
                  {link.element.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  border-gray-100 rounded-lg  md:flex-row gap-5 md:mt-0 md:border-0  dark:bg-gray-800  dark:border-gray-700 items-center">
            <li><i className="fa-brands fa-facebook cursor-pointer"></i></li>
            <li><i className="fa-brands fa-twitter cursor-pointer"></i></li>
            <li><i className="fa-brands fa-google cursor-pointer"></i></li>

            {status==='unauthenticated'?
          <>
           {auths.map((auth) => (
              <li key={auth.path}>
                <Link
                  href={auth.path}
                  className="block py-2 px-3 text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white hover:text-green-600 transition-colors"
                  aria-current="page"
                >
                  {auth.element.toUpperCase()}
                </Link>
              </li>
            ))}
          </> : status==='authenticated' ? <>
            <li className="cursor-pointer hover:text-red-500 transition-colors" onClick={handleLogOut}>LOGOUT</li>
            <li>
              <Link href={'/cart'} className="flex items-center gap-2 hover:text-green-600 transition-colors">
                CART <i className="fa-solid fa-cart-shopping"></i>{data?.numOfCartItems ? <span className="text-main font-bold">({data.numOfCartItems})</span> : null}
              </Link>
            </li>
           {session?.user?.name && <li className="font-semibold">Hi {session.user.name}</li>}
             </> : null
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}