import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import profilePic from "../../public/imgs/profilePic.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="max-w-[1280px] bg-[#1E1E2F] py-[15px] px-[30px] m-auto flex justify-between items-center rounded-br-[25px] rounded-bl-[25px] relative">
      <span>
        <Link to="/" className="color-kumushrang text-[28px]">
          HadyaLand
        </Link>
      </span>

      {/* Desktop menu */}
      <ul className="hidden md:flex justify-between items-center gap-[30px]">
        <li>
          <Link
            to={"/"}
            className="color-kulrang hover:text-[#9f7aea] text-[18px]">
            Sovg`alar
          </Link>
        </li>
        <li>
          <Link
            to={"/about"}
            className="color-kulrang hover:text-[#9f7aea] text-[18px]">
            Qanday ishlaydi?
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="color-kulrang hover:text-[#9f7aea] text-[18px]">
            Bog`lanish
          </Link>
        </li>
        <li className="color-ochpushti-bg px-[12px] flex items-center gap-[5px] py-[10px] rounded-[15px]">
          <img src={profilePic} className="w-[40px]" alt="" />
          <span className="text-[16px] text-white">@barkamol</span>
        </li>
      </ul>

      {/* Mobile button */}
      <button
        className="md:hidden text-white text-[32px]"
        onClick={() => setOpen(!open)}>
        {open ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile menu — simple slide animation */}
      <ul
        className={`
          md:hidden absolute top-[70px] left-0 w-full bg-[#1E1E2F]
          flex flex-col gap-[20px] px-[30px] py-[20px] rounded-b-[25px]
          transition-all duration-500 ease-in-out overflow-hidden
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}>
        <li>
          <Link className="color-kulrang hover:text-[#9f7aea] text-[18px]">
            Sovg`alar
          </Link>
        </li>
        <li>
          <Link className="color-kulrang hover:text-[#9f7aea] text-[18px]">
            Qanday ishlaydi?
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="color-kulrang hover:text-[#9f7aea] text-[18px]">
            Bog`lanish
          </Link>
        </li>

        <li className="color-ochpushti-bg px-[12px] flex items-center gap-[5px] py-[10px] rounded-[15px]">
          <img src={profilePic} className="w-[40px]" alt="" />
          <span className="text-[16px] text-white">@barkamol</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
