"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                const res = await axios.post("/api/users/verifyemail", { token });
                console.log(res);
                setVerified(true);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(true);
                    console.log(error.message);
                } else {
                    console.log("Unknown error occurred");
                }
            }
        };

        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

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
