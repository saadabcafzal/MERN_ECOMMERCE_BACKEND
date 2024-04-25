import { useNavigate } from 'react-router-dom'
import axios from '../utilis/axios'
import React, { useEffect, useState } from 'react'
import Topnav from './Partials/Topnav'
import Dropdown from './Partials/Dropdown'
import Cards from './Partials/Cards'

import InfiniteScroll from 'react-infinite-scroll-component'

const Movie = () => {
    const navigate = useNavigate()
    const [movie, setmovie] = useState([])
const [category, setcategory] = useState("top_rated")
const [page, setpage] = useState(1)
const [hasmore, sethasmore] = useState(true)
  const Getmovie = async()=>{
    try {
        const {data}= await axios.get(`/movie/${category}?page=${page}`)
      
        if(data.results.length > 0){
            setmovie((prev)=>[...prev,...data.results])
            setpage((prev)=>prev+1)
        }
        else{
            sethasmore(false)
        }
    } catch (error) {
        console.log(error)
    }
  }
  const refreshHandler = ()=>{
    if(movie.length ===0){
        Getmovie();
    }
    else{
        setpage(1)
        setmovie([])
        Getmovie();
    }
  }



  useEffect(()=>{
   refreshHandler();
  },[category])

  return (
    <div className=' w-full h-full flex flex-col items-center'>
         <div className=" w-full flex items-center">
      <h1 className=" text-2xl font-bold text-zinc-400 whitespace-nowrap">
        <i
          onClick={() => navigate(-1)}
          className=" hover:text-[#6556CD] ri-arrow-left-line mr-2"
        ></i>
       Movie <span>({category})</span>
      </h1>
      <div className=" flex items-center w-[80%]">
        <Topnav />
        <Dropdown
          title="Category"  title2={movie}
          option={[ "popular","top_rated","now_playing","upcoming"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>
    </div>
      <InfiniteScroll
      dataLength={movie.length}
      hasMore= {hasmore} 
      next={Getmovie}
      loader= {<h1>loading.....</h1>}
      >
      <Cards title="movie" data={movie}/>


      </InfiniteScroll>
   
    </div>
  )
}

export default Movie