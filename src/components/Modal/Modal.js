import { useState,useContext,useEffect, useRef} from 'react'
import {json, Link} from 'react-router-dom'
import Animefetch from '../../Context.js/Hianimecontext.js/context';
import {useAnimeinfoQuery,useEplistQuery} from '../../Redux/Fetchslice';
import useFavorites from '../../Hooks/useFavorites'
import EpisodeList from './EpisodeList';
import Info from './Info';

export default function Modal(props) {
   const { id } = props
   const context = useContext(Animefetch);
   const {setmodalstate ,infoid,setinfoid,setkeyword ,Source} = context;
   const [seasons, setseasons] = useState(null);
   const [Favorite,setFavorite] = useState("regular")
   
   const modalBox = useRef(null);
   
    const { data: aniinfo, isLoading, error } = useAnimeinfoQuery(id)
    const { data: eplist, isLoading: epLoading, error: epError } = useEplistQuery(id)
    
 
   
    
   useEffect(() => {

      let body = document.getElementsByTagName('body')[0]
      body.style.setProperty('--homescroll','hidden')

      let isFavorite = localStorage.getItem('Favorites')?.includes(infoid)
       isFavorite?setFavorite("solid"):setFavorite("regular")

      return ()=>{
         body.style.setProperty('--homescroll','scroll')
      }
    },[id]);

   


    const handlemodal = (e) => {                    //Modal Show or Hide
      if (e.target.classList == "Modal-bg") {
         let animation = [
            {
               transform:"translate(0,0rem)",
               opacity:1
            },
            {
               transform:"translate(0,-16rem)",
               opacity:0.3
            },
            {
               transform:"translate(0,-30rem)",
               opacity:0.1
            }
         ]

         modalBox.current.animate(animation,{duration:200,timing:"linear"})
         setTimeout(()=>{setmodalstate(false)},190)
      }
   }

   
   return (
      <>
      <div className="Modal-bg" onClick={(e) => handlemodal(e)}>
         <div className="Modal-contentbox-main" ref={modalBox}>
            <div className="Modal-contentbox">
              
               <Info aniinfo={aniinfo} id={id} />

               <EpisodeList eplist={eplist} />

            </div> 
         </div>
      </div>
      </>
   )
}










// import React, { useState, useContext, useEffect } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import Animefetch from '../Context.js/Hianimecontext.js/context';

// export default function Modal(props) {
//    const { id } = props
//    const context = useContext(Animefetch);
//    const { Animeinfo, Animeeplist, Animestream, setmodalstate ,infoid,setinfoid,setkeyword ,Source} = context;
//    const [aniinfo, setaniinfo] = useState(null);
//    const [seasons, setseasons] = useState(null);
//    const [eplist, seteplist] = useState([])
//    const [rangeindex, setrangeindex] = useState(0)
//    const [epid, setepid] = useState('')



//    useEffect(() => {
//       Animeinfo(id).then((result) => {
        

//             Source==="Hianime"? setaniinfo(result.results.data):setaniinfo(result.data.anime)
//             Source==="Hianime"? setseasons(result.results.seasons):setseasons(result.data.seasons)
         
//       }).
//       catch((err)=>{
//          console.log(err)
//       })
//       const data = async () => {
//          try{

//             const response = await Animeeplist(id)
//             Source==="Hianime"?seteplist(response.results.episodes):seteplist(response.data.episodes)
//             Source==="Hianime"?setepid(response.results.episodes[0].id):setepid(response.data.episodes[0].episodeId)
//          }
//          catch(error){
//             console.log("Failed to fetch Episodes",error);
//          }
        
//       }
//       data();


//    }, [infoid])


//    const groupedep = (episodelist) => {
//       let epgroup = []

//       const range = 100;
//       for (let i = 0; i < episodelist.length; i += range) {
//          epgroup.push(episodelist.slice(i, i + range))
//       }
//       return epgroup
//    }

//    const changerange = (e) => {
//       const selectedrange = e.target.value.split("-")[0];
//       setrangeindex((selectedrange - 1) / 100)

//    }

//     const { poster, animeInfo ,info , moreInfo } = aniinfo || {}
//     const { Overview, tvInfo } = animeInfo || {}
//     const{stats} = info ||{}

//    const groupep = groupedep(eplist)
//    return (
//       <>
//          {aniinfo && eplist ? <div className="Modal-contentbox">
//             <div className="Info-container" >
//                <div className="Info-img">
//                   <img id="infoimg-src"src={poster||info.poster} alt=""></img>
//                   <p onClick={()=>{setkeyword(aniinfo.title||aniinfo.name); setmodalstate(false)}}>{aniinfo.title||info.name}</p>
//                   <div id="ep-info">
//                      <span id="s1">PG-13</span>
//                      <span id="s2"><i class="fa-solid fa-closed-captioning"></i>{Source==="Hianime"?tvInfo.sub:stats.episodes.sub}</span>
//                      <span id="s3"><i class="fa-solid fa-microphone"></i>  {Source==="Hianime"?tvInfo.dub:stats.episodes.dub}</span>
//                   </div>
//                   <div className="genre-info">
//                      {Source==="Hianime"?aniinfo.animeInfo.Genres.map((genre, index) =>
//                         (<p id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></p>)
//                      ):aniinfo.moreInfo.genres.map((genre, index) =>
//                         (<p id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></p>)
//                      )}
//                   </div>
//                </div>
//                <div className="Watch-desc">
//                   <Link to={`/stream/${epid}`}><button className="Watch-btn" ><i class="fa-solid fa-play"></i>  Watch Now</button></Link>
//                   <h4>Description</h4>

//                   <hr />
//                   <div className="desc">
//                      <span>{Overview||info.description}</span>
//                   </div>
//                </div>

//             </div>

//             {seasons && <div className="Seasonsli">
//                {seasons.map((season) => (
//                   <div className="season" onClick={()=>{setinfoid(season.id)}}>
//                      <img className={`season-img ${aniinfo.title===season.title?"selectedimg":""}`}src={season.season_poster||season.poster}/>
//                      <span className={`season-tag ${aniinfo.title===season.title?"selectedseas":""}`}>{season.title||season.name}</span>
//                   </div>
//                ))}
//             </div>}

//             <div className='epli'>
//                <div className='Episodetag-range'>
//                   <h4>Episodes</h4>

//                  {eplist.length>100 && <select onChange={(e) => { changerange(e) }} id="rangesselection">
//                      {groupep.map((_, index) =>
//                         (<option >{index * 100 + 1} -  {(index + 1) * 100}</option>)
//                      )}
//                   </select>}
//                </div>
//                <hr />
//                <div className="Ep-list">


//                   <div className='episodes'>

//                      <div className="Ep-grid">
//                         {console.log(groupep[rangeindex])}
//                         {groupep[rangeindex]?.map((ep) => 
//                            (
//                            <p ><Link to={`/stream/${ep.episodeId}`} id="epstream-ep" onClick={() => setmodalstate(false)}>{ep.number}</Link></p>
//                         ))}
//                      </div>

//                   </div>
//                </div>
//             </div>



//          </div> :  <h3 style={{ color: "white", marginTop: "15rem" }}>Loading...</h3>}
//       </>
//    )
// }