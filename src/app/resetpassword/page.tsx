"use client";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
export default function PasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [token,setToken]=useState('');   

  const [password,setPassword]=useState({
    createPassword:'',
    confirmPassword:''
})
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name,value}=e.target;
  setPassword(prev=>({
    ...prev,[name]:value
  }))
  }
  const handleSubmit=async()=>{
    if(password.confirmPassword!=password.createPassword)
        return toast.error('Password doesnot match, please check again')
    try {
        const res=await axios.post('/api/users/resetpassword',{token,confirmPassword:password.confirmPassword});
        toast.success(res.data.message)
        
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
  }
   
      useEffect(() => {
            const urlToken = window.location.search.split("=")[1];
            if (urlToken) {
                setToken(urlToken);
            }
        }, []);
    
    
  console.log(password);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <Toaster />
      <div className="w-full max-w-sm space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Create Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password" value={password.createPassword}
            className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            name="createPassword"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
        
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={password.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={handleSubmit}>
          Generate
        </button>
      <Link href={'/login' } className="underline text-blue-300">Back to Login</Link>
      </div>
    </div>
  );
}
