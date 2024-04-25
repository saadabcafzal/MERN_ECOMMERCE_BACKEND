import React, { useEffect, useState } from 'react'
import axios from "../../utilis/axios"
import Topnav from './Topnav'
import Dropdown from './Dropdown'
import InfiniteScroll from 'react-infinite-scroll-component'
import Cards from './Cards'
import { useNavigate } from 'react-router-dom'

const Tvshow = () => {
  const navigate = useNavigate()
    const [category, setcategory] = useState("on_the_air")
const [page, setpage] = useState(1)
const [Tvshow, setTvshow] = useState([])
const [hasmore, sethasmore] = useState(true)

const GetTvshow = async ()=>{
 try {
    const {data}= await axios.get(`/tv/${category}?page=${page}`)
   if(data.results.length >0){
    setTvshow((prev)=>[...prev,...data.results])
    setpage((prev)=>prev+1)
   }else{
    hasmore(false)

   }
 } catch (error) {
    console.log(error)
 }
}
const refreshhandler = ()=>{
    if(Tvshow.length=== 0){
        GetTvshow();
    }
    else{
        setpage(1)
        setTvshow([])
        GetTvshow();
    }
}



useEffect(()=>{
  refreshhandler();
},[category])

  return ( 
  <div className=" w-full h-full flex flex-col items-center">
  <div className=" w-full flex items-center justify-between">
    <h1 className=" text-2xl font-bold text-zinc-400">
      <i
        onClick={() => navigate(-1)}
        className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
      ></i>
      Tv show <span>({category})</span>
    </h1>
    <div className=" flex items-center w-[75%]">
      <Topnav />
      <Dropdown
        title="Category"
        option={["airing_today", "popular","top_rated", "on_the_air"]}
        func={(e) => setcategory(e.target.value)}
      />
    </div>
  </div>
  <InfiniteScroll
   dataLength={Tvshow.length}
   hasMore={hasmore}
   next={GetTvshow}
   loader={<h1>loading.....</h1>}
  >
    <Cards title="tv" data={Tvshow} />
  </InfiniteScroll>
</div>
);
}

export default Tvshow