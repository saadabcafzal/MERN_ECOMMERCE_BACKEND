import React from 'react'
import { Link } from 'react-router-dom'
import { Img_Url } from '../../utilis/constant'
import noimage from "/noimage.jpg"

const Cards = ({title,title2,data}) => {
  return (<>
        {/* <h1 className='ml-6 text-2xl text-zinc-200 font-semibold'>{title.toUpperCase()}</h1> */}
    <div className='w-full flex flex-wrap pl-6 mt-8 bg-[#1f1e24] max-w-full '>
        {data && data.map((c,i)=>(
        <Link  to={`/${c.media_type || title }/details/${c.id}`} className='relative w-[15vw] mr-[4%] mb-[2.5%]' key={i}>
          <img className=' w-full h-[45vh] bg-cover rounded-md' src={
           c.poster_path || c.backdrop_path || c.profile_path  ?  Img_Url +(c.poster_path || c.backdrop_path || c.profile_path ) : noimage} alt="" />
          <h1 className=' text-2xl my-2 text-zinc-200 font-semibold h-fit w-fit '>{c.original_title || c.original_name || c.name || c.title}</h1>
{c.vote_average &&        <div className='absolute top-[55%] -right-6  text-white text-xl w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center'>{(c.vote_average*10).toFixed()}<sup>%</sup></div>}       
  
       
        </Link>))}
    </div>
    </>)
}

export default Cards