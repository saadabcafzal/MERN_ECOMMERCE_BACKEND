import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../utilis/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addmovie } from "../utilis/movieslice";
import { Usemoviedetails } from "../Hooks/Usemoviedetails";
import { Img_Url } from "../utilis/constant";
import Loading from "../loading";
import HorizontialCard from "../Components/Partials/HorizontalCards";

const Moviedetails = () => {
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((store) => store?.movie);
    Usemoviedetails();
 
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,.9))`,
        backgroundImage: `url(${Img_Url}${info?.detail?.backdrop_path})`,

        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" w-full h-fit px-[6%] relative"
    >
      <div>
        <nav className=" w-full text-zinc-300  flex gap-8 h-[10vh] text-xl items-center">
          <Link
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
          ></Link>
          <a target="blank" href={info?.detail?.homepage}>
            <i class="  hover:text-[#6556CD] ri-external-link-fill"></i>
          </a>
          <a target="blank" href={`https://twitter.com/${info?.external_ids?.twitter_id}/`}>
          <i class="ri-chat-2-line"></i>
          </a>
          <a
            target="blank"
            href={`https://www.wikidata.org/wiki/${info?.external_ids?.wikidata_id}`}
          >
            <i class="  hover:text-[#6556CD] ri-earth-fill"></i>
          </a>
          <a
            target="blank"
            href={`https://www.imdb.com/title/${info?.external_ids?.imdb_id}`}
          >
            imdb
          </a>
        </nav>
        {/* part1 poster and details */}
        <div className=" w-full flex gap-7">
          <img
            className="h-[60vh] bg-cover rounded-md shadow-md object-cover mt-4 ml-[8%]"
            src={
              info.detail.poster_path || info.detail.backdrop_path
                ? Img_Url +
                  (info.detail.poster_path ||
                    info.detail.backdrop_path ||
                    info.detail.profile_path)
                : noimage
            }
            alt=""
          />
          {/* part2 of containt */}
          <div className="containt text-zinc-400">
            <span>
              <h1 className=" text-4xl font-black ">
                {info.detail.original_title ||
                  info.detail.original_name ||
                  info.detail.name ||
                  info.detail.title}
                <span className=" ml-3 text-4xl font-bold">
                  ({info.detail.release_date.split("-")[0]})
                </span>
              </h1>
            </span>
            {/* part of user score */}
            <div className="my-3 flex items-center  gap-x-4 ">
              {info.detail.vote_average && (
                <div className="  text-xl w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
                  {(info.detail.vote_average * 10).toFixed()}
                  <sup>%</sup>
                </div>
              )}
              <h1 className=" w-[70px] text-2xl font-semibold leading-5">
                User Score
              </h1>
              <h1>{info?.detail?.release_date}</h1>
              <h1> {info?.detail?.genres.map((g, i) => g.name).join(",")}</h1>
              <h1>{info?.detail?.runtime}min</h1>
            </div>
            {/* tagline detail */}
            <h1 className=" text-lg font-semibold ">
              {info.detail.tagline}
            </h1>
            {/* overview of image */}
            <h1 className=" mt-2 text-2xl font-semibold ">
              Overview
            </h1>
            <p className=" text-base font-medium  ">
              {info.detail.overview}
            </p>
            {/* translation in image */}
            <h1 className=" mt-3 text-2xl font-semibold ">
              Translation
            </h1>
            <p className=" mb-4 text-base font-medium  ">
              {info?.translations?.data?.translations
                .map((t) => t.english_name)
                .join(",  ")}
            </p>

            <Link
              className=" bg-blue-400 p-2 rounded-md "
              to={`${pathname}/trailer`}
            >
              Play Trailer
            </Link>
          </div>
        </div>

        {/* part3 available platform */}
        <div className=" w-[80%]">
          {info.wastchproviders && info.wastchproviders.flatrate && (
            <div className=" flex justify-start items-center gap-x-10  text-zinc-100 text-xl">
              <h1>Available on</h1>
              {info.wastchproviders &&
                info.wastchproviders.flatrate &&
                info.wastchproviders.flatrate.map((w) => (
                  <img
                    title={w.provider_name}
                    className=" rounded-md mt-5 w-[5vh] object-cover h-[5vh]"
                    src={Img_Url + w.logo_path}
                    alt=""
                  />
                ))}
            </div>
          )}
        </div>
        {/* part4 recommidation and similarity */}
        <hr className=" mt-8 bg-zinc-400 h-1"/>
        <h2 className=" text-3xl font-bold text-white mt-4">
       
          
          Recommendation && Similar</h2>
         <HorizontialCard   data={info.recommendations.length >0 ? info.recommendations : info.similar}/>
      <Outlet/>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
