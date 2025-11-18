import React from "react";
import { Link } from "react-router-dom";
import profilePic from "../../public/imgs/profilePic.png";
function Header() {
  return (
    <>
      <header className="flex max-w-[1280px] bg-[#1E1E2F] py-[15px] px-[30px] m-auto justify-between items-center rounded-br-[25px] rounded-bl-[25px]">
        <span>
          <Link to={"/"} className="color-kumushrang text-[28px]">
            HadyaLand
          </Link>
        </span>
        <ul className="flex justify-between items-center gap-[30px]">
          <li>
            <Link className="color-kulrang color-binafsha-hover text-[18px]">
              Sovg`alar
            </Link>
          </li>
          <li>
            <Link className="color-kulrang color-binafsha-hover text-[18px]">
              Qanday ishlaydi?
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="color-kulrang color-binafsha-hover text-[18px]">
              Bog`lanish
            </Link>
          </li>
          <li className="color-ochpushti-bg cursor-pointer px-[12px] flex items-center gap-[5px] py-[10px] rounded-[15px]">
            <img src={profilePic} className="w-[40px]" alt="" />
            <span className="text-[16px] text-[#ffffff]">@barkamol</span>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
