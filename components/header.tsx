'use client';
import {useEffect, useState} from "react";

export default  function Header() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/api/login")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setUser(data.user);
                }
            });
    }, []);

    // handle the user logout
    const handleLogout = () => {
        fetch("/api/login", {
            method: "DELETE",
        }).then((response) => {
            if (response.status === 200) {
                setUser(null);
                // redirect to the login page
                window.location.href = "/login";
            }
        });
    };

    if (!user) {
        return (
            <div className="navbar bg-base-100">
            </div>
        );
    }

    // use the props to render the page
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">Project Check</a>
                <ul className="menu menu-horizontal px-1">
                    <li><a
                        href={"/add-project"}>Add Project</a></li>

                </ul>
            </div>
            <div className="flex-none gap-2">
                <span className="text-lg text-slate-100">Welcome, {user?.name}</span>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Navbar component"
                                 src={user?.picture}/>
                        </div>
                    </div>
                    <ul tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li>
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
