import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navabr = () => {
    const links = [
        {
        title: "Home",
        link: "/",
        },
        
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];
    const isLoggedIn = useSelector((state) =>state.auth.isLoggedIn);
    const role  = useSelector((state) => state.auth.role);
    
    if (isLoggedIn === false)
        {
            links.splice(2, 3);
        }
        if(isLoggedIn == true && role === "admin")
            {
                links.splice(3, 1);
            }
            if(isLoggedIn == true && role === "user")
                {
                    links.splice(4, 1);
                }    
    const [MobileNav,setMobileNav] = useState("hidden");
    return (
        <>
        <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between" >
            <Link to="/" className="flex items-center">
                <img
                    className="h-10 me-4"
                    src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                    alt="logo"
                />
                <h1 className="text-2xl font-semibold">BookHeaven</h1>
            </Link>
            <div className="nav-links-bookheaven block md:flex gap-4 items-center">
                <div className="hidden md:flex gap-4"> 
                    {links.map((items,i)=> (
                        <Link 
                            to={items.link}
                            className="hover:text-blue-500 transition-all duration-300 rounded" 
                            key={i}
                        >
                            {items.title}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex gap-4">
                    
                {isLoggedIn === false && (
                    <>
                    <Link 
                    to="/Log-in"
                    className="px-2 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300">LogIn</Link>
                    <Link 
                    to="/Sign-up"
                    className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
                    </>
                )}
                </div>
                <button className="block md:hidden text-white text-2xl hover:text-zinc-400" onClick={()=>(MobileNav ==="hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
                    <FaGripLines />
                </button>
            </div>
        </nav>
        <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-10 flex flex-col items-center justify-center`}>
        {links.map((items,i)=> (
                        <Link 
                            to={items.link}
                            className={`${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300 rounded`} 
                            key={i}
                            onClick={()=>
                                (MobileNav ==="hidden" 
                                ? setMobileNav("block") 
                                : setMobileNav("hidden"))}
                        >
                            {items.title}
                        </Link>
                    ))}
                    
                    {isLoggedIn === false && (
                        <>
                            <Link 
                                to="/Log-in"
                                className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
                            <Link 
                                to="/Sign-up"
                                className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
                        </>
                    )}
                
        </div>
        </>
    );
    

};

export default Navabr;