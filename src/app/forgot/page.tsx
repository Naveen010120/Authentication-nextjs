"use client";

import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter an email address");

        try {
            const res = await axios.post("/api/users/forgot", { email });
           console.log(res)
            toast.success("check the mail to reset password. ");

        } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error occurred");
  }
}
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Send Reset Link
                </button>
            </form>
        </>
    );
}
