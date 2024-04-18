'use client';

import {getRedirectResult, signInWithRedirect} from "firebase/auth";
import {auth, provider} from "@/lib/firebase-config";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const router = useRouter();

    useEffect(() => {
        getRedirectResult(auth).then(async (userCred) => {
            if (!userCred) {
                return;
            }

            fetch("/api/login", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${await userCred.user.getIdToken()}`,
                },
            }).then((response) => {
                if (response.status === 200) {

                    console.log(response.body);

                    router.push("/");
                }
            });
        });
    }, []);

    function signIn() {
        signInWithRedirect(auth, provider);
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                         className="max-w-sm rounded-lg shadow-2xl" alt=""/>
                    <div>
                        <h1 className="text-5xl font-bold">Welcome to our platform</h1>
                        <p className="py-6">We are a platform that allows user like you to manage your tasks and
                            projects in a simple way.</p>

                        <button className="btn btn-primary" onClick={() => signIn()}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
