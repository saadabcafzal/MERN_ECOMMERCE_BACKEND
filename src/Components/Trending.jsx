import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import axios from "../utilis/axios";
import Cards from "./Partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title ="SCSDB Trending"
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // settrending(data.results);
     
      if(data.results.length>0){
          settrending((prev) => [...prev, ...data.results]);
          setpage((prev) => prev + 1);

      }else{
        sethasMore(false);

      }
    } catch (error) {
      console.log(error);
    }
  };
 const refreshHandler =()=>{
    if(trending.length === 0){
        GetTrending();
    }else{
        setpage(1)
        settrending([]);
        GetTrending();

    }
}
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);
  return (
    <div className=" w-full h-full flex flex-col items-center">
      <div className=" w-full flex items-center justify-between">
        <h1 className=" text-2xl font-bold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
          ></i>
          Trending <span>({category})</span>
        </h1>
        <div className=" flex items-center w-[75%]">
          <Topnav />
          <Dropdown
            title="Category"
            title2= {duration}
            option={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className=" w-[2%]"></div>
          <Dropdown
            title="Durations"
            option={["day", "week"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
       dataLength={trending.length}
       hasMore={hasMore}
       next={GetTrending}
       loader={<h1>loading.....</h1>}
      >
        <Cards title={category} title2={duration} data={trending} />
      </InfiniteScroll>
    </div>
  );
};

export default Trending;
