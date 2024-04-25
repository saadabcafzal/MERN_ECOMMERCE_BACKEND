import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "./Notfound";

const Trailer = () => {
    const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tvshow";
  const ytvideo = useSelector((store) => store[category]?.info?.videos);
// 
  return (
    <div className=" bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center">
    <Link
            onClick={() => navigate(-1)}
            className=" text-3xl text-white  absolute right-[3%] top-[5%] hover:text-[#6556CD] ri-close-fill mr-2"
          ></Link>
   {ytvideo ?  <ReactPlayer
     height={680}
     width={1200}
     url={`https://www.youtube.com/watch?v=${ytvideo.key}`} /> :<Notfound/>}
    </div>
  );
};

export default Trailer;
