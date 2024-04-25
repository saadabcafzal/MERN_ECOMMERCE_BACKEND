import React from "react";
import { Link } from "react-router-dom";
import { Img_Url } from "../../utilis/constant";

const Header = ({ data }) => {
 
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,.9)),url(${Img_Url}${
            data.backdrop_path || data.profile_path || data.poster_path
          })`,
          backgroundPosition:'top',
          backgroundSize: 'cover',}}
      className=" w-full h-[60vh]  flex flex-col justify-end items-start p-[3%] text-white "
    >
    <h1 className="  w-[50%]  text-3xl font-black text-white">  {data.original_title || data.original_name || data.name || data.title}</h1>
    <p className=" w-[50%] mt-3">{data.overview.slice(0,200)}...<Link to={`/${data.media_type}/details/${data.id}`} className=" text-blue-500">more</Link></p>
    <p className="my-3 text-white text-xl flex items-center gap-2">
    <i className="text-yellow-300  ri-megaphone-fill"></i> {data.release_date || "No information"}
   <i className="text-yellow-300  ri-album-fill"></i>{data.media_type.toUpperCase() || "No information"}
    </p>
    <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-4 mt-1 bg-[#6446cd] rounded-md text-white font-semibold ">Watch Tailer</Link>

    
    
    </div>
  );
};

export default Header;
