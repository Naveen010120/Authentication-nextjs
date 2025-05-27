"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";



export default function SignUpPage(){
    const [user,setUser] = useState<{
        name:string,
        email:string,
        password:string
    }>({
        name:'',
        email:'',
        password:''
    });
    const router=useRouter();
    const [buttonDisable,setButtonDisable]=useState(false);
    const [loading,setLoading]=useState(false)
    const onSignUp=async()=>{
      try{
        setLoading(true);
        const res=await axios.post("/api/users/signup",user);
        console.log(res)
        toast.success('signup sucess');
        setTimeout(()=>{

          router.push('/login')
        },3000)

      } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error occurred");
  }
}
      finally{
        setLoading(false);
      }
    }
    useEffect(()=>{
      if(user.email.length>0  && user.password.length>0 && user.name.length>0){

        setButtonDisable(false);
      }else
      setButtonDisable(true);
    },[user])
 
    console.log('hi')
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
        <Toaster />
        <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
           {loading?"Processing...":'SignUp'}
          </h1>
          <hr className="mb-6 border-gray-300" />

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onSignUp}
              className="bg-orange-400 hover:bg-orange-600 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
             {buttonDisable?"No SignUp":"Signup"}
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
}