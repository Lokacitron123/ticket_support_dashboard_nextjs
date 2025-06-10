import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { BiLogInCircle } from "react-icons/bi";

export const metadata = {
  title: "Login",
};

export default function SignInPage() {
  return (
    <div>
      <BiLogInCircle className='mx-auto mb-4 text-red-600' size={60} />
      <h1 className='text-4xl md:text-5xl font-bold mb-4 text-blue-600'>
        Welcome to Quick Ticket
      </h1>
      <p className='text-lg text-gray-600 mb-8'>
        Sign in and start handling your tickets
      </p>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col md:flex-row gap-4 justify-center animate-slide opacity-0'>
          <LoginLink className='px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition w-fit'>
            Sign In
          </LoginLink>
        </div>
        <div className='flex flex-col gap-4 justify-center items-center animate-slide opacity-0 mt-10'>
          <p>Not yet registered? Register here.</p>
          <RegisterLink className='bg-blue-100 text-gray-700 px-6 py-3 rounded shadow hover:bg-blue-200 transition w-fit'>
            Register
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}
