// import Animefetch  from "./Hianimecontext.js/context";
import { useQuery } from '@tanstack/react-query';
import Animefetch from './context'
import React, { useState } from "react";

const Animecontext = (props) => {

  const [Source, setSource] = useState("Aniwatch");

  const movieurl = "https://api.themoviedb.org/3"
  const key = "d6f744a7597256818a0774964bea7379"


  const handlesrc = () => {
    if (Source === "Aniwatch") {
      return "http://localhost:4000/api/v2/hianime"
    }
    else if (Source === "Hianime") {
      return "http://localhost:4444/api"
    }
  }
  const url = handlesrc()
  const [keyword, setkeyword] = useState('')
  const [modalstate, setmodalstate] = useState(false)
  const [infoid, setinfoid] = useState("")
  const [isMovie, setisMovie] = useState(false);
  let AnimeList
  let Animeinfo
  let Animeeplist
  let Animestream
  let Animecategory
  let Animesearch
  let Animegenrelist
  let Aniserverli
  let Movies
  let Tvshows
  let Movieinfo
  let Tvinfo
  let search

  /*******************  Hianime ************************/
  if (Source === "Hianime") {
    AnimeList = async () => {
      const response = await fetch(url)
      const list = await response.json();
      return list
    }


    Animeinfo = async (id) => {
      const response = await fetch(`${url}/info?id=${id}`)
      const info = await response.json();
      return info
    }


    Animeeplist = async (id) => {
      const response = await fetch(`${url}/episodes/${id}`)
      const episodes = response.json();
      return episodes
    }


    Animestream = async (animeid, epid) => {
      const response = await fetch(`${url}/stream?id=${animeid}?ep=${epid}`)
      const streamlink = await response.json()
      return streamlink
    }

    Animecategory = async (category, page) => {
      const response = await fetch(`${url}/${category}?page=${page}`)
      const categorylist = await response.json();
      return categorylist;
    }

    Animesearch = async () => {
      const response = await fetch(`${url}/search?keyword=${keyword}`)
      const searchresult = await response.json()
      return searchresult;
    }

  }

  /*******************  Aniwatch ************************/

  else if (Source === "Aniwatch") {


    // AnimeList = async () => {
    //   const response = await fetch(`${url}/home`)
    //   const list = await response.json();
    //   return list
    // }

    


    Animeinfo = async (id) => {
      const response = await fetch(`${url}/anime/${id}`)
      const info = await response.json();
      return info
    }

    


    Animeeplist = async (id) => {
      const response = await fetch(`${url}/anime/${id}/episodes`)
      const episodes = response.json();
      return episodes
    }

    

    Aniserverli = async (animeid, epid) => {
      const response = await fetch(`${url}/episode/servers?animeEpisodeId=${animeid}?ep=${epid}`)
      const aniservers = await response.json();
      return aniservers;
    }
    
   

    Animestream = async (animeid, epid, ob) => {
      const { server, type } = ob
      const response = await fetch(`${url}/episode/sources?animeEpisodeId=${animeid}?ep=${epid}&server=${server}&category=${type}`)
      const streamlink = await response.json()
      return streamlink
    }

    Animecategory = async (category, page = 1) => {
      const response = await fetch(`${url}/category/${category}?page=${page}`)
      const categorylist = await response.json();
      return categorylist;
    }

    Animesearch = async (keyword, page) => {
      const response = await fetch(`${url}/search?q=${keyword}&page=${page.pageParam}`)
      const searchresult = await response.json()
      return searchresult;
    }


    Animegenrelist = async (genre,pageParam) => {
      const response = await fetch(`${url}/genre/${genre}?page=${pageParam.pageParam}`)
      const genreanime = await response.json();
      return genreanime
    }

  }


  /*******************  Tvshows/Movies ************************/


  Movies = async () => {
    const response = await fetch(`${movieurl}/discover/movie?api_key=${key}&language=eng&page=1`)   //https://vidsrc.me/embed/movie?tmdb=533535
    const movie = await response.json()
    return movie
  }

  Movieinfo = async (movieid) => {
    const response = await fetch(`${movieurl}/movie/${movieid}?api_key=${key}`)
    const info = await response.json();
    return info
  }

  Tvshows = async () => {
    const response = await fetch(`${movieurl}/discover/tv?api_key=${key}&language=eng`)
    const tv = await response.json()
    return tv
  }

  Tvinfo = async (showid, season) => {
    const response = await fetch(`${movieurl}/tv/${showid}?api_key=${key}&append_to_response=season/${season}`)
    const info = await response.json();
    return info
  }

  search = async (moviename, page) => {
    const response = await fetch(`${movieurl}/search/multi?query=${moviename}&api_key=${key}&page=${page}`) //https://api.themoviedb.org/3/search/multi?query=deadpool%27&api_key=d6f744a7597256818a0774964bea7379
    const searchresult = await response.json();
    return searchresult
  }


  return (
    <Animefetch.Provider value={{
      Source,
      setSource,
      AnimeList,     
      Animeinfo,
      Animeeplist,
      Animestream,
      Animecategory,
      Animesearch,
      keyword,
      setkeyword,
      infoid,
      setinfoid,
      modalstate,
      setmodalstate,
      Aniserverli,
      Animegenrelist,
      Movies,
      Tvshows,
      Movieinfo,
      Tvinfo,
      search,
      isMovie,
      setisMovie
    }} >
      {props.children}
    </Animefetch.Provider>
  )

}


export default Animecontext