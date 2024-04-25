
import notfound from "/404.gif"
const Notfound = ()=>{
  return  (
    <div className="flex items-center justify-center w-full h-full ">
      <img
        className="object-cover w-full h-full"
        src={notfound}
        alt=""
      />
    </div>
  )
}

export default Notfound;
