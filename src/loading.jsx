import React, { useState, useEffect } from "react";

function Loading() {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     setVisible(false);
//   }, []); // The empty dependency array ensures that the effect runs only once

  return  (
    <div className="flex items-center justify-center w-full h-full ">
      <img
        className="object-cover w-full h-full"
        src="https://i.pinimg.com/originals/97/e9/42/97e942ce7fc4e9d4ea6d844a382f251f.gif"
        alt=""
      />
    </div>
  )
}

export default Loading;
