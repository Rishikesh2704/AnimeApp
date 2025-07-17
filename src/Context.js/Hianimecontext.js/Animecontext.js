// import Animefetch  from "./Hianimecontext.js/context";
import { useQuery } from '@tanstack/react-query';
import Animefetch from './context'
import React, { useState } from "react";

const Animecontext = (props) => {
  const [keyword, setkeyword] = useState('')
  const [modalstate, setmodalstate] = useState(false)
  const [infoid, setinfoid] = useState("")

  return (
    <Animefetch.Provider value={{
      keyword,
      setkeyword,
      infoid,
      setinfoid,
      modalstate,
      setmodalstate,
    }} >
      {props.children}
    </Animefetch.Provider>
  )

}


export default Animecontext