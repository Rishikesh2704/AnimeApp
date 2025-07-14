import {useState} from 'react'
import { useParams,useSearchParams,useNavigate } from "react-router-dom"
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import AnimeInfo from './AnimeInfo'
import Servers from './Servers'
import EpisodeList from './EpisodeList'
import VideoPlayer from './VideoPlayer';


export default function Epstream() {
  const [currep, setcurrep] = useState({})
  const [currserv, setcurrserv] = useState({server:"HD-1",type:"sub"})
  const [nextep, setnextep] = useState({})
  const [prevep, setprevep] = useState({})
  
 

  const [animeid, setanimeid] = useSearchParams()
  const { id } = useParams();


  let epid = animeid.get('ep');
  let navigate = useNavigate();
  
 
  // useEffect(() => {
  //   let newep = currep.number + 1
  //   let newprevep = currep.number - 1
  //   setnextep(eplist.find(epno => {
  //     return epno.number === newep
  //   }))
  //   setprevep(eplist.find(epno => {
  //     return epno.number === newprevep
  //   }))
  // }, [currep, eplist])



  const handleprev = () => {
    if (prevep) { navigate(`/Stream/${prevep.episodeId}`) }
  }

  const handlenext = () => {
    if (nextep) { navigate(`/Stream/${nextep.episodeId}`) }
  }

  return (
    <>
      <div className="Container">

        <div className="Stream-container">
          <div className="Video-container">

            {<div className="Ep-stream" >
               <VideoPlayer id={id} epid={epid} currserv={currserv}/>
     
              <div className='Ep-btns'>
                <button className="prev" onClick={handleprev}>Prev Ep</button>
                <button className="next" onClick={handlenext}>Next Ep</button>
              </div>
            </div>
            }
              
              <EpisodeList id={id} epid={epid} setcurrep={setcurrep}/>

              <Servers currserv={currserv} setcurrserv={setcurrserv} currep={currep} epid={epid} id={id}/>

            </div>

            <AnimeInfo id={id}/>

        </div>
      </div>
    </>
  )
}










/************************************** With Tanstack Query **************************************/



// import React, { useContext, useEffect, useState, useRef} from 'react'
// import ReactPlayer from 'react-player'
// // import Hls, { ContentSteeringController } from 'hls.js'
// import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom"
// import Animefetch from '../Context.js/Hianimecontext.js/context'
// import { useQuery } from '@tanstack/react-query'
// import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/video.css';
// import { ChapterTitle, MediaPlayer, MediaProvider,Track} from '@vidstack/react';
// import {
//   DefaultAudioLayout,
//   defaultLayoutIcons,
//   DefaultVideoLayout,
// } from '@vidstack/react/player/layouts/default';
// import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
// import '@vidstack/react/player/styles/base.css';
// import '@vidstack/react/player/styles/plyr/theme.css';


// export default function Epstream() {
//   const [url, seturl] = useState([])
//   const [eplist, seteplist] = useState([])
//   const [subtitlesrc, setsubtitlesrc] = useState("")
//   const [Loading, setLoading] = useState(true)
//   const [currep, setcurrep] = useState({})
//   const [rangeindex, setrangeindex] = useState(0)
//   const [serverli, setserverli] = useState()
//   const [currserv, setcurrserv] = useState({server:"hd-1",type:"sub"})
//   const [nextep, setnextep] = useState({})
//   const [prevep, setprevep] = useState({})
//   const [aniinfo, setaniinfo] = useState(null);
//   const [seasons, setseasons] = useState(null);
//   const [quality, setquality] = useState("");
  
 
//   const context = useContext(Animefetch);
//   const { Animestream, Animeeplist, Aniserverli, Animeinfo, infoid, setinfoid, Source, setkeyword } = context

//   const [animeid, setanimeid] = useSearchParams()
//   const [server, setserver] = useState('')
//   const { id } = useParams();


//   let epid = animeid.get('ep');
//   let navigate = useNavigate();
  
//   const player = useRef();
  
//   const {data:qinfo, isLoading ,error} =  useQuery({ queryKey:['Animeinfo',id],queryFn: ()=> Animeinfo(id) })
//   const {data:qEpli, isLoading:epliLoading , error: epliError} =  useQuery({ queryKey:['Eplist',id],queryFn: ()=> Animeeplist(infoid||id) })
//   const {data:serverlist,isLoading:servloading,error:servError} = useQuery({queryKey:['Serverlist',epid],queryFn:()=>Aniserverli(id,epid)})
//   const {data:eplink ,isLoading: epLoading , error: epError} = useQuery({queryKey:["Eplink",epid,currserv],queryFn:()=>Animestream(id,epid,currserv)})
  
//   useEffect(()=>{
//     console.log(epid,typeof(epid))
//     if(!servloading&&!epLoading){
//       if (eplink?.data?.sources && eplink?.data?.sources.length > 0) {
//         seturl(eplink?.data?.sources[0]); // Set the video URL from the response
//         setserverli(serverlist?.data); // Set the server list
//         let subtitle = eplink?.data?.tracks.find((track) => track.label === "English");
//         setsubtitlesrc(subtitle?.file); // Set subtitle source
//         console.log(eplink?.data?.tracks)
//         setLoading(false); // Update loading state to false
//       }
    
//     }  
//     return () => {
//       seturl([])
//     }
//   },[epid,id,eplink,currserv.server,currserv.type])

//   useEffect(() => {
    
//     if(!isLoading&&!epliLoading){   
//         setaniinfo(qinfo?.data?.anime)
//         setseasons(qinfo?.data?.seasons)
//         seteplist(qEpli?.data.episodes)
//         if (epid) {
//           setcurrep(qEpli?.data?.episodes.find(epno => {
//             return String(epno.episodeId.split("=")[1]) === String(epid)
//           }))}
//     }
//     return () => {
//       seteplist([])
//     }
//   }, [epid, id, isLoading, epliLoading])

 
//   useEffect(() => {
//     let newep = currep.number + 1
//     let newprevep = currep.number - 1
//     setnextep(eplist.find(epno => {
//       return epno.number === newep
//     }))
//     setprevep(eplist.find(epno => {
//       return epno.number === newprevep
//     }))
//   }, [currep, eplist])


   
//   // useEffect(() => {
//   //   if (url) {
//   //     setserver(url[0]?.type === "sub" ? url[0]?.link.file : url[2]?.link.file)
//   //     setserver( url[0]?.link.file)
//   //     setsubtitlesrc(url[0]?.tracks[0]?.file)

//   //   }

//   // }, [url])

//   let level;

//   const handleprev = () => {
//     if (prevep) { navigate(`/Stream/${prevep.episodeId}`) }
//   }

//   const handlenext = () => {
//     if (nextep) { navigate(`/Stream/${nextep.episodeId}`) }
//   }

//   const handleselect = (e) => {

//     let styleep = document.getElementsByClassName('style')[0]
//     if (styleep) {
//       styleep.classList.remove("style")
//     }

//     e.target.parentElement.classList.add("style")
//   }


//   const groupedep = (episodelist) => {
//     let epgroup = []
//     const range = 100;
//     for (let i = 0; i < episodelist.length; i += range) {
//       epgroup.push(episodelist.slice(i, i + range))
//     }
//     return epgroup
//   }

//   const changerange = (e) => {
//     const selectedrange = e.target.value.split("-")[0];
//     setrangeindex((selectedrange - 1) / 100)

//   }


//   const changeServer = (newserver, type, e) => {

//     let disabled = document.getElementsByClassName('btndisable');
//     if (disabled.length !== 0) { disabled[0].classList.remove("btndisable") }


//     let select = e.target;
//     select.classList.add('btndisable')
//     setcurrserv({ server: newserver, type: type })
//     // setserver(newserver)
//     // setsubtitlesrc(argsubtitle.file)

//   }


//   // const getresolution = ()=>{
//   //   let hls = player.current.getInternalPlayer("hls")
//   //   setquality("true")
//   //   // console.log("onplay : ",hls.levelController.currentLevel)
   
//   // }


//   // const changeQuality = (e)=>{
//   //   let hls = player.current.getInternalPlayer("hls")
//   //   // console.log("before selecting : ",hls.levelController.currentLevel)

//   //    hls.levelController.currentLevelIndex = e.target.value
//   //    hls.levelController.setLevel = e.target.value
//   //   //  console.log("after selecting : ",hls.levelController.currentLevel)
//   // }

//   const { poster, animeInfo, info, moreInfo } = aniinfo || {}
//   const { Overview, tvInfo } = animeInfo || {}
//   const { stats } = info || {}

//   if (Loading) {
//     <div><h3>Loading...</h3></div>
//   }

//   const groupep = groupedep(eplist)
//   return (
//     <>
//       <div className="Container">

//         <div className="Stream-container">
//           <div className="Video-container">

//             <div className="Other-src">
//               {currep !== "" && <div id="currep"><h4>{`Episode ${currep.number}`}</h4></div>}
//               <div className="Sub">
//                 <h4>Sub</h4><hr />

//                 {serverli && serverli.sub.map((epsrc, index) => {
//                   // console.log("sub:",epsrc)

//                   return (<button className={`sub-ep ${currserv.server === epsrc.serverName && currserv.type == "sub" ? 'btndisable' : ''}`} onClick={(e) => changeServer(epsrc.serverName, "sub", e)}>{epsrc.serverName}</button>)
//                 }
//                 )}
//               </div>

//               <div className='Dub'>
//                 <h4>Dub</h4><hr />
//                 {serverli && serverli.dub.map((epsrc) => {
//                   // console.log("dub:",epsrc)

//                   return (<button className={`dub-ep  ${currserv.server === epsrc.serverName && currserv.type == "dub" ? 'btndisable' : ''}`} onClick={(e) => changeServer(epsrc.serverName, "dub", e)}>{epsrc.serverName}</button>)
//                 })
//                 }

//               </div>
//             </div>

//             {<div className="Ep-stream" style={{ height: "25.3125rem", width:" 45rem" , backgroundColor:"black", marginLeft: "1.2rem"}}>
//             {!Loading &&(currserv.type==="sub"?subtitlesrc:url)&&url&&url?.url &&   
//             <>
           
//               <MediaPlayer className="player" title="One-piece" aspectRatio="16/9"src={url?.url}  load="visible" preload='auto' >
//                 <MediaProvider >

//                 <Track  label="English"
//               kind="captions"
//               src={subtitlesrc}
//               default
//               key={subtitlesrc} />
//                 </MediaProvider>
//                 <PlyrLayout icons={plyrLayoutIcons} />
//               </MediaPlayer>
           
//               </>}
//             </div>}


//             {eplist && <div className="Epstream-list">

//               <div className='Episodetag-range'>
//                 <h4 id="Epstreamlist-tag">Episodes</h4>
//                 {eplist.length > 100 && <select onChange={(e) => { changerange(e) }} id="Epstream-rangesselection">
//                   {groupep.map((_, index) =>
//                     (<option >{index * 100 + 1} -  {(index + 1) * 100}</option>)
//                   )}
//                 </select>}
//               </div>
//               <hr />


//               <div className='stream-episodes'>
//                 {eplist.length>1&&eplist.length>25?<div className="Epstream-grid">
//                   {eplist.length > 1 && groupep[rangeindex].map((ep) => (
//                     <p className={`epn ${epid == ep.episodeId.split('=')[1] ? "style" : ""} ${ep.isFiller?"filler":""}`}><Link to={`/stream/${ep.episodeId}`} id="ep" onClick={(e) => handleselect(e)} ><div className="eplist-num">{`Ep ${ep.number}`}</div></Link></p>
//                     //  ${epid == ep.id.split('=')[1] ? "style" : ""}

//                   ))}
//                 </div>:<div className="SEpstream-grid">
//                   {eplist.length > 1 && groupep[rangeindex].map((ep) => (
//                     //  ${epid == ep.id.split('=')[1] ? "style" : ""}
//                     <p className={`epn ${epid == ep.episodeId.split('=')[1] ? "style" : ""} ${ep.isFiller?"filler":""}`} ><Link to={`/stream/${ep.episodeId}`} id="ep" onClick={(e) => handleselect(e)} ><div className="seplist-num">{`Ep ${ep.number}: ${ep.title}`}</div></Link></p>

//                   ))}
//                 </div>}

//               </div>


//             </div>}


//           </div>
//           <div className='Ep-btns'>
//             <button className="prev" onClick={handleprev}>Prev Ep</button>
//             <button className="next" onClick={handlenext}>Next Ep</button>
//           </div>


//           {aniinfo&&seasons  && eplist ? <div className='ESeasonsDiv'>
//             {seasons && <div className="ESeasonsli">
//               {seasons.map((season) => (
//                 <div className="season" onClick={() => { setinfoid(season.id) 
//                   navigate(`/stream/${season.id}`)
//                 }}>
//                   <img className={`season-img ${aniinfo.title === season.title ? "selectedimg" : ""}`} src={season.season_poster || season.poster} />
//                   <span className={`season-tag ${aniinfo.title === season.title ? "selectedseas" : ""}`}>{season.title || season.name}</span>
//                 </div>
//               ))}
//             </div>}
//           </div> : <h3>Loading...</h3>}
//           {aniinfo && eplist ? <div className='stream-info'>
           
//             <div className="EInfo-container" >
//               <div className="eInfo-img">
//                 <img id="einfoimg-src" src={poster || info.poster} alt=""></img>
               
//               </div>

//               <div className="EWatch-desc">
                
//               <span onClick={() => { setkeyword(aniinfo.title || aniinfo.name); }}>{aniinfo.title || info.name}</span>
//                 <div id="streamep-info">
//                   <span id="es1">PG-13</span>
//                   <span id="es2"><i class="fa-solid fa-closed-captioning"></i>{Source === "Hianime" ? tvInfo.sub : stats.episodes.sub}</span>
//                   <span id="es3"><i class="fa-solid fa-microphone"></i>  {Source === "Hianime" ? tvInfo.dub : stats.episodes.dub}</span>
//                 </div>
//                 <div className="Egenre-info">
//                   {Source === "Hianime" ? aniinfo.animeInfo.Genres.map((genre, index) =>
//                     (<span id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></span>)
//                   ) : aniinfo.moreInfo.genres.map((genre, index) =>
//                     (<span id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></span>)
//                   )}
//                 </div>


//                 <h4>Description</h4>
//                 <div className="desc">
//                 <hr />
//                   <span>{Overview || info.description}</span>
//                 </div>
//               </div>
//             </div>



//           </div> : <h3>Loading...</h3>}

//         </div>
//       </div>
//     </>
//   )
// }


















/******************************************* Without Query Libraries *************************************/




// import React, { useContext, useEffect, useState, useRef} from 'react'
// import ReactPlayer from 'react-player'
// import Hls, { ContentSteeringController } from 'hls.js'
// import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom"
// import Animefetch from '../Context.js/Hianimecontext.js/context'


// export default function Epstream() {
//   const [url, seturl] = useState([])
//   const [eplist, seteplist] = useState([])
//   const [subtitlesrc, setsubtitlesrc] = useState("")
//   const [Loading, setLoading] = useState(true)
//   const [currep, setcurrep] = useState({})
//   const [rangeindex, setrangeindex] = useState(0)
//   const [serverli, setserverli] = useState()
//   const [currserv, setcurrserv] = useState({ server: "hd-1", type: "sub" })
//   const [nextep, setnextep] = useState({})
//   const [prevep, setprevep] = useState({})
//   const [aniinfo, setaniinfo] = useState(null);
//   const [seasons, setseasons] = useState(null);
//   const [quality, setquality] = useState("");
  
 
//   const context = useContext(Animefetch);
//   const { Animestream, Animeeplist, Aniserverli, Animeinfo, infoid, setinfoid, Source, setkeyword } = context

//   const [animeid, setanimeid] = useSearchParams()
//   const [server, setserver] = useState('')
//   const { id } = useParams();


//   let epid = animeid.get('ep');
//   let navigate = useNavigate();
  
//   const player = useRef();
  
//   useEffect(() => {
//     const streamdata = async () => {
//       try {

//         const serverdata = await Aniserverli(id, epid)
//         setserverli(serverdata.data)
//         const data = await Animestream(id, epid, currserv)
//         seturl(data.data.sources[0])
//         let s = (data.data.tracks.find((n) => n.label === "English"))
//         setsubtitlesrc(s.file)
//         setLoading(false)
//         // setserver(data.results.streamingLink[0]?.type === "sub" ? data.results.streamingLink[0]?.link.file : data.results.streamingLink[2]?.link.file)
//         // // setserver( data.results.streamingLink[0]?.link.file)
//         //  setsubtitlesrc(data.results?.streamingLink[0]?.type === "sub" ? data.results?.streamingLink[0]?.tracks[0].file : data.results?.streamingLink[3]?.tracks[0].file)
//         // setLoading(false)

//       }
//       catch (err) {
//         console.log(err)
//       }

//     }
//     streamdata();

//     const listdata = async () => {
//       try {
//         const response = await Animeeplist(infoid||id)
//         seteplist(response.data.episodes)
//         if (epid) {
        
//           setcurrep(response.data.episodes.find(epno => {
//             return String(epno.episodeId.split("=")[1]) === String(epid)
//           }))
         
//         }
//       }
//       catch (err) {
//         console.log(err)
//       }
//     }
//     listdata();

//     Animeinfo(infoid||id).then((result) => {


//       setaniinfo(result.data.anime)
//       setseasons(result.data.seasons)

//     }).
//       catch((err) => {
//         console.log(err)
//       })
//     return () => {
//       seturl([])
//       seteplist([])
//     }
//   }, [epid, id, Animeeplist, Animestream, currserv.server,currserv.type])



//   useEffect(() => {
//     let newep = currep.number + 1
//     let newprevep = currep.number - 1
//     setnextep(eplist.find(epno => {
//       return epno.number === newep
//     }))
//     setprevep(eplist.find(epno => {
//       return epno.number === newprevep
//     }))
//   }, [currep, eplist])



//   // useEffect(() => {
//   //   if (url) {
//   //     setserver(url[0]?.type === "sub" ? url[0]?.link.file : url[2]?.link.file)
//   //     setserver( url[0]?.link.file)
//   //     setsubtitlesrc(url[0]?.tracks[0]?.file)

//   //   }

//   // }, [url])

//   let level;

//   const handleprev = () => {
//     if (prevep) { navigate(`/Stream/${prevep.episodeId}`) }
//   }

//   const handlenext = () => {
//     if (nextep) { navigate(`/Stream/${nextep.episodeId}`) }
//   }

//   const handleselect = (e) => {

//     let styleep = document.getElementsByClassName('style')[0]
//     if (styleep) {
//       styleep.classList.remove("style")
//     }

//     e.target.parentElement.classList.add("style")
//   }


//   const groupedep = (episodelist) => {
//     let epgroup = []
//     const range = 100;
//     for (let i = 0; i < episodelist.length; i += range) {
//       epgroup.push(episodelist.slice(i, i + range))
//     }
//     return epgroup
//   }

//   const changerange = (e) => {
//     const selectedrange = e.target.value.split("-")[0];
//     setrangeindex((selectedrange - 1) / 100)

//   }


//   const changeServer = (newserver, type, e) => {

//     let disabled = document.getElementsByClassName('btndisable');
//     if (disabled.length !== 0) { disabled[0].classList.remove("btndisable") }


//     let select = e.target;
//     select.classList.add('btndisable')
//     setcurrserv({ server: newserver, type: type })
//     // setserver(newserver)
//     // setsubtitlesrc(argsubtitle.file)

//   }


//   const getresolution = ()=>{
//     let hls = player.current.getInternalPlayer("hls")
//     setquality("true")
//     // console.log("onplay : ",hls.levelController.currentLevel)
   
//   }


//   const changeQuality = (e)=>{
//     let hls = player.current.getInternalPlayer("hls")
//     // console.log("before selecting : ",hls.levelController.currentLevel)

//      hls.levelController.currentLevelIndex = e.target.value
//      hls.levelController.setLevel = e.target.value
//     //  console.log("after selecting : ",hls.levelController.currentLevel)
//   }

//   const { poster, animeInfo, info, moreInfo } = aniinfo || {}
//   const { Overview, tvInfo } = animeInfo || {}
//   const { stats } = info || {}

//   if (Loading) {
//     <div><h3>Loading...</h3></div>
//   }

//   const groupep = groupedep(eplist)
//   return (
//     <>
//       <div className="Container">

//         <div className="Stream-container">
//           <div className="Video-container">

//             <div className="Other-src">
//               {currep !== "" && <div id="currep"><h4>{`Episode ${currep.number}`}</h4></div>}
//               <div className="Sub">
//                 <h4>Sub</h4><hr />

//                 {serverli && serverli.sub.map((epsrc, index) => {
//                   // console.log("sub:",epsrc)

//                   return (<button className={`sub-ep ${currserv.server === epsrc.serverName && currserv.type == "sub" ? 'btndisable' : ''}`} onClick={(e) => changeServer(epsrc.serverName, "sub", e)}>{epsrc.serverName}</button>)
//                 }
//                 )}
//               </div>

//               <div className='Dub'>
//                 <h4>Dub</h4><hr />
//                 {serverli && serverli.dub.map((epsrc) => {
//                   // console.log("dub:",epsrc)

//                   return (<button className={`dub-ep  ${currserv.server === epsrc.serverName && currserv.type == "dub" ? 'btndisable' : ''}`} onClick={(e) => changeServer(epsrc.serverName, "dub", e)}>{epsrc.serverName}</button>)
//                 })
//                 }

//               </div>
//             </div>

//             {<div className="Ep-stream">
//             {!Loading && subtitlesrc &&   <><ReactPlayer id="ep" controls={true} ref={player}
//                 url={url.url}
//                 key={player?.current?.getInternalPlayer("hls")?.levelController?.currentLevel}
//                 onPlay={getresolution}
//                 onPause={getresolution}
//                 config={{
//                   file: {
//                     attributes: {
//                       crossOrigin: "anonymous"
//                     },
//                     tracks: [

//                       {
//                         kind: "captions",
//                         src: subtitlesrc,
//                         srcLang: "en",
//                         default: true,
//                         mode: "showing"
//                       }

//                     ]
//                   }
//                 }
//                 }
//               />
//               <select onChange={changeQuality}>
//                 {quality==="true"?player?.current?.getInternalPlayer("hls")?.levelController?._levels.map((resolution,ind) =>(
//                   <>
//                    <option value={ind}>{resolution.height}</option>
//                   </>
//                 )):<h3>Loading...</h3>}
//               </select>
//               </>}
//             </div>}


//             {eplist && <div className="Epstream-list">

//               <div className='Episodetag-range'>
//                 <h4 id="Epstreamlist-tag">Episodes</h4>
//                 {eplist.length > 100 && <select onChange={(e) => { changerange(e) }} id="Epstream-rangesselection">
//                   {groupep.map((_, index) =>
//                     (<option >{index * 100 + 1} -  {(index + 1) * 100}</option>)
//                   )}
//                 </select>}
//               </div>
//               <hr />


//               <div className='stream-episodes'>
//                 {eplist.length>1&&eplist.length>25?<div className="Epstream-grid">
//                   {eplist.length > 1 && groupep[rangeindex].map((ep) => (
//                     <p className={`epn ${epid == ep.episodeId.split('=')[1] ? "style" : ""} ${ep.isFiller?"filler":""}`}><Link to={`/stream/${ep.episodeId}`} id="ep" onClick={(e) => handleselect(e)} ><div className="eplist-num">{`Ep ${ep.number}`}</div></Link></p>
//                     //  ${epid == ep.id.split('=')[1] ? "style" : ""}

//                   ))}
//                 </div>:<div className="SEpstream-grid">
//                   {eplist.length > 1 && groupep[rangeindex].map((ep) => (
//                     //  ${epid == ep.id.split('=')[1] ? "style" : ""}
//                     <p className={`epn ${epid == ep.episodeId.split('=')[1] ? "style" : ""} ${ep.isFiller?"filler":""}`} ><Link to={`/stream/${ep.episodeId}`} id="ep" onClick={(e) => handleselect(e)} ><div className="seplist-num">{`Ep ${ep.number}: ${ep.title}`}</div></Link></p>

//                   ))}
//                 </div>}

//               </div>


//             </div>}


//           </div>
//           <div className='Ep-btns'>
//             <button className="prev" onClick={handleprev}>Prev Ep</button>
//             <button className="next" onClick={handlenext}>Next Ep</button>
//           </div>


//           {aniinfo && eplist ? <div className='stream-info'>
//             {seasons && <div className="ESeasonsli">
//               {seasons.map((season) => (
//                 <div className="season" onClick={() => { setinfoid(season.id) 
//                   navigate(`/stream/${season.id}`)
//                 }}>
//                   <img className={`season-img ${aniinfo.title === season.title ? "selectedimg" : ""}`} src={season.season_poster || season.poster} />
//                   <span className={`season-tag ${aniinfo.title === season.title ? "selectedseas" : ""}`}>{season.title || season.name}</span>
//                 </div>
//               ))}
//             </div>}
//             <div className="EInfo-container" >
//               <div className="eInfo-img">
//                 <img id="einfoimg-src" src={poster || info.poster} alt=""></img>
               
//               </div>

//               <div className="EWatch-desc">
                
//               <span onClick={() => { setkeyword(aniinfo.title || aniinfo.name); }}>{aniinfo.title || info.name}</span>
//                 <div id="streamep-info">
//                   <span id="es1">PG-13</span>
//                   <span id="es2"><i class="fa-solid fa-closed-captioning"></i>{Source === "Hianime" ? tvInfo.sub : stats.episodes.sub}</span>
//                   <span id="es3"><i class="fa-solid fa-microphone"></i>  {Source === "Hianime" ? tvInfo.dub : stats.episodes.dub}</span>
//                 </div>
//                 <div className="Egenre-info">
//                   {Source === "Hianime" ? aniinfo.animeInfo.Genres.map((genre, index) =>
//                     (<span id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></span>)
//                   ) : aniinfo.moreInfo.genres.map((genre, index) =>
//                     (<span id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></span>)
//                   )}
//                 </div>


//                 <h4>Description</h4>
//                 <div className="desc">
//                 <hr />
//                   <span>{Overview || info.description}</span>
//                 </div>
//               </div>
//             </div>



//           </div> : <h3>Loading...</h3>}

//         </div>
//       </div>
//     </>
//   )
// }

