import axios from "../../utilis/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import { Img_Url } from "../../utilis/constant";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [Searches, setSearches] = useState(null);
  const Getsearch = async () => {
    try {
      const d = await axios.get(`/search/multi?query=${query}`);
    
      setSearches(d.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Getsearch();
  }, [query]);
  return (
    <div className=" w-full h-[10vh] relative flex justify-start items-center pl-[15%]">
      <i className="ri-search-2-line text-2xl text-zinc-300"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className=" w-[60%] mx-10 p-3 rounded-md border-none bg-transparent text-xl outline-none text-zinc-300"
        type="text"
        placeholder="Search"
      />
      {query.length > 0 && (
        <>
          {" "}
          <i
            onClick={() => setquery("")}
            className="ri-close-fill text-2xl text-zinc-300"
          ></i>{" "}
        </>
      )}
      <div className=" w-[60%] max-h-[50vh] mx-10  bg-zinc-100 absolute z-[999] top-[90%] left-[calc(10 + 5%)] rounded-md overflow-hidden overflow-y-scroll">
        {Searches &&
          Searches.map((s, i) => (
            <Link to={`/${s.media_type || title }/details/${s.id}`}
              key={i}
              className=" font-semibold hover:text-zinc-900 hover:bg-zinc-400 duration-300 w-full text-zinc-700 p-8 flex items-center justify-start border-2 border-zinc-200"
            >
              <img
                className=" w-[10vh] h-[10vh] rounded-md object-cover object-center mr-3 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path || s.poster_path
                    ?  Img_Url + (s.backdrop_path || s.profile_path || s.poster_path)
                    : noimage
                }
                alt=""
              />
              <span>
                {s.original_title || s.original_name || s.name || s.title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topnav;
