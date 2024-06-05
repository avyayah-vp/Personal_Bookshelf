import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div className="bg-slate-500 borde flex justify-between h-auto align-middle font-bold sticky top-0 z-10 shadow-neutral-200 shadow-md backdrop-filter backdrop-blur-sm bg-opacity-30">
      <Link to="/">
        <h1 className="text-2xl p-2 m-2 cursor-pointer hover:text-green-500 hover:duration-500">
          Personal Bookshelf
        </h1>
      </Link>
      <Link to={location.pathname === "/" ? "/my-bookshelf" : "/"}>
        <button className="bg-slate-700 text-white rounded-full p-2 m-3  hover:bg-green-500 hover:text-white hover:transform hover:duration-500">
          {location.pathname === "/" ? "My Bookshelf" : "Search Books"}
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
