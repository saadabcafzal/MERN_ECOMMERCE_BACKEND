import React, { useEffect, useState} from 'react'
import axios from "../utilis/axios"
import Topnav from './Partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Cards from './Partials/Cards';

const People = () => {
const navigate= useNavigate();
const [people, setpeople] = useState([])
const [page, setpage] = useState(1)
const [hasmore, sethasmore] = useState(true)
 
  const Getpeople = async()=>{
   try {
    const {data} = await axios.get(`/person/popular?page=${page}`)
    if(data.results.length >0){
      setpeople((prev)=>[...prev,...data.results])
      setpage(prev=>prev+1)
    }else{
      hasmore(false)
    }
    
   } catch (error) {
    console.log(error)
   }
  }

  const refreshhandler = ()=>{
    if(people.length===0){
   Getpeople();
    }
    else{
      setpage(1)
      // setpeople([])
      Getpeople();
    }
  }


  useEffect(()=>{
   refreshhandler();
  },[])
  return (
<div className=" w-full h-full flex flex-col items-center">
      <div className=" w-full flex items-center justify-between">
        <h1 className=" text-2xl font-bold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
          ></i>
          People
        </h1>
        <div className=" flex items-center w-[75%]">
          <Topnav />
      </div>
  </div>
      <InfiniteScroll
       dataLength={people.length}
       hasMore={hasmore}
       next={Getpeople}
       loader={<h1>loading.....</h1>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  )
}

export default People