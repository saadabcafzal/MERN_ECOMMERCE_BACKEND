import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "../utilis/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addmovie } from "../utilis/movieslice";
import { Usemoviedetails } from "../Hooks/Usemoviedetails";
import { Img_Url } from "../utilis/constant";
import Loading from "../loading";
import HorizontialCard from "../Components/Partials/HorizontalCards";
import { Usepersondetails } from "../Hooks/Usepersondetails";
import noimage from "../../public/noimage.jpg";
import Dropdown from "./Partials/Dropdown";

const Persondetails = () => {
  const [catgory, setcatgory] = useState("movie");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((store) => store?.person);
  Usepersondetails();
  return info ? (
    <div className=" w-full h-fit flex flex-col px-[5%] bg-[#1f1e24]">
      {/* part1 */}
      <nav className=" w-full text-zinc-300  flex gap-8 h-[10vh] text-xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
        ></Link>
        <a target="blank" href={info?.detail?.homepage}>
          <i class="  hover:text-[#6556CD] ri-external-link-fill"></i>
        </a>
        <a
          target="blank"
          href={`https://twitter.com/${info?.external_ids?.twitter_id}/`}
        >
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
      <div className="w-full flex gap-8">
        {/* part2 poster and details */}
        <div className=" w-[28%]">
          <img
            className="h-[60vh] w-full bg-cover bg-center rounded-md shadow-md object-cover mt-4"
            src={
              info.detail.poster_path ||
              info.detail.backdrop_path ||
              info.detail.profile_path
                ? Img_Url +
                  (info.detail.poster_path ||
                    info.detail.backdrop_path ||
                    info.detail.profile_path)
                : noimage
            }
            alt=""
          />

          <hr className=" my-4 bg-zinc-200 h-[1.5px] " />
          {/* icon for social */}
          <div className=" text-2xl flex gap-2">
            <a
              target="blank"
              href={`https://www.wikidata.org/wiki/${info?.external_ids?.wikidata_id}`}
            >
              <i class="  hover:text-[#6556CD] ri-earth-fill"></i>
            </a>
            <a
              target="blank"
              href={`https://www.facebook.com/${info?.external_ids?.facebook_id}`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="blank"
              href={`https://www.instagram.com/${info?.external_ids?.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              target="blank"
              href={`https://www.tiktok.com/${info?.external_ids?.tiktok_id}`}
            >
              <i class="ri-tiktok-line"></i>
            </a>

            <a
              target="blank"
              href={`https://www.twitter.com/${info?.external_ids?.twitter_id}`}
            >
              <i class="ri-twitter-x-line"></i>
            </a>
          </div>
          {/* personal information */}
          <h1 className=" text-3xl text-zinc-400 font-semibold my -5">
            Person info
          </h1>
          <h1 className=" text- lg text-zinc-400 font-semibold mt -3">
            known For
          </h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">
            {" "}
            {info.detail.known_for_department}
          </h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">
            {" "}
            {info.detail.gender === 2 ? "male" : "Female"}
          </h1>
          <h1 className="mt-2 text-lg text-zinc-400 font-semibold">Birth</h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">
            {" "}
            {info.detail.birthday ? info.detail.birthday : "Not Available"}
          </h1>
          <h1 className="mt-2 text-lg text-zinc-400 font-semibold">Death:</h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">
            {" "}
            {info.detail.deathday ? info.deatail.deathday : "Still alive"}
          </h1>
          <h1 className="mt-2 text-xl text-zinc-400 font-semibold">
            Placeobirth:
          </h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">
            {info.detail.place_of_birth
              ? info.detail.place_of_birth
              : "Not Available"}
          </h1>
          <h1 className="mt-2 text-xl text-zinc-400 font-semibold">
            Also known as:
          </h1>
          <h1 className=" text-lg text-zinc-400 font-semibold">
            {info.detail.also_known_as
              ? info.detail.also_known_as.join(", ")
              : "Not Available"}
          </h1>
        </div>
        {/* part3 right details and information */}
        <div className=" w-[70%] mb-5">
          <h1 className=" text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className=" text-xl text-zinc-400 font-semibold mt -3">
            Biography:
          </h1>
          <p className=" text-zinc-300 text-xl leading-6">
            {info.detail.biography}
          </p>
          <h1 className="mt-5 text-lg text-zinc-400 font-semibold">
            Known For
          </h1>
          <HorizontialCard data={info.combined_credits.cast} />
          <div className=" w-full flex justify-between items-center">
            <h1 className="text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="catgory"
              option={["tv", "movie"]}
              func={(e) => setcatgory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 mt-5 w-full h-[50vh] overflow-hidden overflow-y-auto shadow-2xl shadow-zinc-500 border-2 border-zinc-600 p-5">
            {info[catgory + "_credits"].cast.map((c,i) => (
              <li key={i} className=" hover:text-white p-5 hover:bg-[#19191d] duration-300 cursor-pointer ">
                <Link to={`/${catgory}/details/${c.id}`}  className="">
                  <span >
                    {c.original_title || c.original_name || c.name || c.title}
                  </span>
                {c.character &&   <span className="block ml-5">Character: {c. character}</span>}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <loading />
  );
};

export default Persondetails;
