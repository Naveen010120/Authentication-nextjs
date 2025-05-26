"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post("/api/users/verifyemail", { token });
            console.log(res);
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error("Verification error:", error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);
    console.log()
    return (
        <div>
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-white">
                {token ? token : "No token"}
            </h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-white p-2">
                        Verification failed. Please check your link or try again.
                    </h2>
                </div>
            )}
        </div>
    );
}
