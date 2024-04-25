import axios from '../utilis/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cards from './Partials/Cards';
import Dropdown from './Partials/Dropdown';
import Topnav from './Partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  document.title ="SCSDB popular|" + category.toLocaleUpperCase() + "S"
  const Getpopular=async()=>{
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      // setpopular(data.results)
  
      if(data.results.length>0){
          setpopular((prev) => [...prev, ...data.results]);
          setpage((prev) => prev + 1);

      }else{
        sethasMore(false);

      }
     
    } catch (error) {
      console.log(error);
    }
  };
 const refreshHandler =()=>{
    if(popular.length === 0){
        Getpopular();
    }else{
        setpage(1)
        setpopular([]);
        Getpopular();

    }
}
  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    <div className=" w-full h-full flex flex-col items-center">
    <div className=" w-full flex items-center justify-between ">
      <h1 className=" text-2xl font-bold text-zinc-400">
        <i
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
        ></i>
        Popular <span>({category})</span>
      </h1>
      <div className=" flex items-center w-[75%]">
        <Topnav />
        <Dropdown
          title="Category" 
        
          option={["tv", "movie"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>
    </div>
   
        <InfiniteScroll
          dataLength={popular.length}
          hasMore={hasMore}
          next={Getpopular}
          loader={<h1>loading.....</h1>}
        >
          <Cards title={category} data={popular} />
        </InfiniteScroll>
  </div>)
}

export default Popular