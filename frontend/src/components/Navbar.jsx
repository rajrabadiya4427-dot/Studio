import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, LogOut } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthstore";

gsap.registerPlugin(ScrollTrigger);


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuref = useRef(null);
  const { logout,authUser } = useAuthStore();


  const toggleMenu = () => {
    if (!isMenuOpen) {
      gsap.to(menuref.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(menuref.current, {
        x: "120%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }

    setIsMenuOpen(!isMenuOpen);
  };


  useGSAP(() => {
    gsap.to(".navbar", {
      backgroundColor: "black",
      duration: 1,
      scrollTrigger: {
        trigger: ".navbar",
        scroller: "body",
        start: "top 0",
        scrub: 1,
        // markers: true,
      }
    })
  })


  const handleAudioToggle = () => {
    if (!audioRef.current) return;

    if (isAudioOn) {
      audioRef.current.pause();
      setisAudioOn(false);
    } else {
      audioRef.current.play();
      setisAudioOn(true);
    }
  };

  return (
    <div className={`w-full px-2 md:px-10 navbar py-5 flex bg-transparent fixed items-center justify-between z-[9999] `}>

      <div className="logo font-extrabold text-xl">Studio</div>

      <div className={`links flex font-semibold mg:text-sm lg:text-lg lg:gap-7 md:gap-5 md:flex hidden`}>
        <Link to="/">
          Home
        </Link>
        <Link to="/games">
          Games
        </Link>
        <Link to="/manga">
          Manga
        </Link>
        <Link to="/story">
          Story
        </Link>
        <Link to="/contact">
          Contact
        </Link>
        {authUser && (
          <Link to="/my-products">
            My Products
          </Link>
        )}
      </div>

      <div className="relative gap-4 flex items-center justify-center ">

        {authUser && (
          <Link to="/profile" className="flex items-center gap-2 hover:scale-105 transition-all" title="View Profile">
            {authUser.profilePic ? (
              <img 
                src={authUser.profilePic.startsWith("http") ? authUser.profilePic : `http://localhost:8000/${authUser.profilePic}`} 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400"
                onError={(e) => {
                  e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=" + authUser.name;
                }}
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold border-2 border-emerald-400">
                {authUser.name ? authUser.name[0].toUpperCase() : "U"}
              </div>
            )}
          </Link>
        )}

        <div className="menus md:hidden" onClick={toggleMenu}>
          <Menu />
        </div>

        <div 
          onClick={logout} 
          className="user cursor-pointer hover:text-red-400 hover:scale-110 transition-all md:flex hidden"
          title="Logout"
        >
          <LogOut size={24} />
        </div>

    

      </div>

      <div style={{ transform: "translateX(120%)", }} ref={menuref} className={`links absolute top-15 right-2 bg-white text-black w-70 px-5 rounded-xl py-5 flex flex-col font-semibold text-lg gap-2 md:hidden z-[99999] shadow-2xl`}>
        <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/">
          Home
        </Link>
        <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/games">
          Games
        </Link>
        <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/manga">
          Manga
        </Link>
        <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/story">
          Story
        </Link>
        <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/contact">
          Contact
        </Link>
        {authUser && (
          <>
            <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/profile">
              Profile
            </Link>
            <Link onClick={toggleMenu} className="bg-gray-200 pr-10 pl-5 py-2 rounded-lg" to="/my-products">
              My Products
            </Link>
          </>
        )}
        <button 
          onClick={() => { toggleMenu(); logout(); }} 
          className="bg-red-100 text-red-600 hover:bg-red-200 text-left pr-10 pl-5 py-2 rounded-lg font-semibold w-full cursor-pointer transition-colors"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Navbar;
