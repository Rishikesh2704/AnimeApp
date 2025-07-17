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