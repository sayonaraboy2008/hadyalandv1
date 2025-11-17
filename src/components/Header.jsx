import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <span>HadyaLand</span>
        <ul>
          <li>
            <Link>Sovg`alar</Link>
          </li>
          <li>
            <Link>Qanday ishlaydi?</Link>
          </li>
          <li>
            <Link>Bog`lanish</Link>
          </li>
          <li>
            <span>@barkamol</span>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
