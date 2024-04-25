import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import { Img_Url } from '../../utilis/constant'
import noimage from "../../../public/noimage.jpg"

const HorizontalCards = ({data}) => {
  return ( 
      <div className='w-full h-fit flex overflow-hidden overflow-x-auto p-4'>
        {data.length>0 ?data.map((d,i)=>(
        <Link to={`/${d.media_type ||"tv"}/details/${d.id}`} key={i} className=' rounded-md overflow-hidden min-w-[25%] h-[55vh]  mr-5 bg-zinc-900'>
            <img className=' w-full h-[55%] object-cover object-top' src={
    (d.backdrop_path || d.profile_path || d.poster_path)
      ? `${Img_Url}${d.backdrop_path || d.profile_path || d.poster_path }`
      : noimage} alt="" />
     
      <h1 className="text-xl font-black text-white h-10 ">  {d.original_title || d.original_name || d.name || d.title}</h1>
        <p className=" text-white font-sm mt-4 leading-none">{d.overview.slice(0,100)}...<Link className=" text-blue-500">more</Link></p>
        
     
      
      </Link>)):<h1 className=' text-white text-xl'>No thing to show</h1>}
      </div>
  )
}

export default HorizontalCards