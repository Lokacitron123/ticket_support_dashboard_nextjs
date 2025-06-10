import Link from "next/link";
import React from "react";

export const PublicFooter = () => {
  return (
    <footer className='flex flex-col justify-center p-3 gap-3 '>
      <div className='flex flex-col gap-3 '>
        <h4 className='text-xl'>Staff</h4>
        <Link href={"/login"}>Login</Link>
      </div>

      <div className='flex  justify-center items-center gap-3 '>
        <h4 className='text-xl'>
          Created By -{" "}
          <Link
            href={"https://github.com/Lokacitron123"}
            target='_blank'
            aria-label="Link goes to Johan's github profile"
          >
            Johan Lindell
          </Link>
        </h4>
        <p> {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
