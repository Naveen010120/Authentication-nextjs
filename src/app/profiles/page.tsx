
"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router=useRouter();
  const [data,setData]=useState('nothing');
  const logout=async()=>{
    try{
     const res=await axios.get('/api/users/logout');
     toast.success(res.data.message);
     router.push('/login')
    }
    catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error occurred");
  }
}
  }
  const getUserDetails=async()=>{
    try{
      const res=await axios.get('/api/users/me');
     console.log(res.data);
     setData(res.data.data._id)
    }
catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error occurred");
  }
}
  }
  return (
    <div>
      <Toaster />
      <p>Profile</p>
      <h1 className="text-xl font-extrabold  text-gray-300 bg-amber-600">{data=='nothing'?"Nothing":<Link href={`profiles/${data}`} >{data}</Link>}</h1>
      <button onClick={logout} className="p-2 rounded-lg bg-red-400 hover:bg-red-600 text-xl font-bold text-white">Logout</button>
      <button onClick={getUserDetails} className="p-2 rounded-lg bg-green-400 hover:bg-green-600 text-xl font-bold text-white">GetUser Details</button>
    </div>
  )
}