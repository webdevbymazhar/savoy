"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {
    const [admindata, setadmindata] = useState({
        email : '',
        password : ''
    });
    const [error, setError] = useState(null);
    let router = useRouter()

    const handleData = (e) => {
        setadmindata({ ...admindata, [e.target.name]: e.target.value });
       
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
              if (!admindata.email || !admindata.password) {
        toast.error("Email and password are required");
        return;
    }
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(admindata),
            });
            const finalres = await response.json();
            if (response.ok) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", finalres.token);
                }
                router.push('/admin/dashboard')
                toast.success("Welcome to Dashboard !")
                
            } else {
                setError(finalres.error);
                toast.error(finalres.error)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
            setError("An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center mt-8 px-6 py-12 lg:px-8">
                <img src="/logo.png" className="w-32 block m-auto" alt="Logo" />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={admindata.email}
                                    required
                                    onChange={handleData}
                                    autoComplete="email"
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm"></div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={admindata.password}
                                    onChange={handleData}
                                    autoComplete="current-password"
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={(e)=>handleSubmit(e)}
                                className="flex w-full justify-center rounded-md bg-[#262626] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}