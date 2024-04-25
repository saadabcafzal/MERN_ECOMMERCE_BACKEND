import React, { useEffect, useState } from "react";
import Sidebar from "./Partials/Sidebar";
import Topnav from "./Partials/Topnav";
import axios from "../utilis/axios";
import Header from "./Partials/Header";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";
import Loading from "../loading";

const Home = () => {
  document.title = "SCSDB | Homepage";
  const [walpaper, setwalpaper] = useState(null)
   const [Tranding, setTranding] = useState(null)
   const [category, setcategory] = useState("all")
 
  const GetHeaderwalpaper =async ()=>{
    try {
      const {data} = await axios.get(`/trending/all/day`)
        const dataindex = data.results[(Math.random()*data.results.length).toFixed()]
          setwalpaper(dataindex);
     
    } catch (error) {
      console.log(error)
    }
  }
  const GetTranding =async ()=>{
    try {
      const {data} = await axios.get(`/trending/${category}/day`)
        setTranding(data.results);
        
     
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    GetTranding();
    !walpaper && GetHeaderwalpaper();
  },[category])

  return ( walpaper && Tranding ?
    <>
      <Sidebar />
      <div className=" w-[80%] h-full overflow-auto overflow-y-auto">
        <Topnav />
        <Header data = {walpaper}/>
        <div className=' bg-transparent mb-4 flex justify-between p-3'>
      <h1 className=' text-2xl  font-semibold text-zinc-300'> Trending </h1>
      <Dropdown title="filter" option={["tv","movie","all"]} func={(e)=>setcategory(e.target.value)}/>
      </div> 
        <HorizontalCards data={Tranding} />
      </div>
    </>:<Loading/>
  );
};

export default Home;
