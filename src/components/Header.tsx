import { getAuthStatus } from "@/lib/auth";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import React from "react";
import { BiUser } from "react-icons/bi";

export const Header = async () => {
  const { isAuthed, email } = await getAuthStatus();

  return (
    <header className='w-full h-16 p-10 bg-slate-700 flex items-center justify-between'>
      <div>
        <Link href={"#"}>Logo</Link>
      </div>

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
