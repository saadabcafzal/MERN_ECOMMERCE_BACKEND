import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" w-[20%] h-full border-r-2 border-zinc-200 p-8  whitespace-nowrap">
      <h1 className=" font-bold text-2xl">
        {" "}
        <i className=" text-[#6446CD] ri-tv-2-fill mr-1"></i>{" "}
        <span className=" text-white text-2xl">SCSDB</span>
      </h1>
      <nav className=" flex flex-col gap-3 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold tesxt-xl mt-7 mb-3">
          News Feeds
        </h1>
        <Link to="/trending" className=" hover:bg-[#6446CD] hover:text-white p-3 rounded-md duration-300">
          {" "}
          <i className="ri-fire-fill mr-1"></i>Trending
        </Link>
        <Link to="/popular" className=" hover:bg-[#6446CD] hover:text-white p-3 rounded-md duration-300">
          <i className="ri-bard-fill mr-1 "></i>Popular
        </Link>
        <Link to="/movie" className=" hover:bg-[#6446CD] hover:text-white p-3 rounded-md duration-300">
          <i className="ri-movie-2-fill  mr-1"></i>Movies
        </Link>
        <Link to="/tv" className=" hover:bg-[#6446CD] hover:text-white p-3 rounded-md duration-300">
          <i className="ri-tv-2-fill  mr-1"></i>Tv shows
        </Link>
        <Link to="/person" className=" hover:bg-[#6446CD] hover:text-white p-3 rounded-md duration-300">
          <i className="ri-group-2-fill  mr-1"></i>People
        </Link>
      </nav>

      
    </div>
  );
};

export default Sidebar;
