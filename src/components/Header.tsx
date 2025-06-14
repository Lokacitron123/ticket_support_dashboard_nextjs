import { getAuthStatus } from "@/lib/auth";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import React from "react";
import { BiUser } from "react-icons/bi";
import { FaTicketAlt } from "react-icons/fa";

export const Header = async () => {
  const { isAuthed, email, admin } = await getAuthStatus();

  return (
    <header className='fixed top-10 left-10 right-10 z-50 bg-slate-700 rounded-full h-16 px-10 flex items-center justify-between shadow-lg'>
      <div className='flex items-center gap-1.5 text-2xl '>
        <FaTicketAlt className=' text-red-600' size={40} />
        <Link href={"/"}>Quick Ticket</Link>
      </div>

      <nav>
        <ul className='flex items-center gap-3'>
          <Link
            href={"/"}
            className='inline-block border-b-2 border-transparent hover:border-current transition-all duration-100 ease-in'
          >
            Home
          </Link>
          <Link
            href={"/tickets"}
            className='inline-block border-b-2 border-transparent hover:border-current transition-all duration-100 ease-in'
          >
            Tickets
          </Link>
          {admin === true && <Link href={"/dashboard"}>Dashboard</Link>}
        </ul>
      </nav>

      <div>
        {isAuthed ? (
          <div className='flex items-center justify-center gap-4'>
            <span className='flex items-center gap-2'>
              <BiUser />
              {email}
            </span>

            <div className='w-px h-5 bg-gray-300' />

            <LogoutLink>Logout</LogoutLink>
          </div>
        ) : (
          <LoginLink>Login</LoginLink>
        )}
      </div>
    </header>
  );
};
