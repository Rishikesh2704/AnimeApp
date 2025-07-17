import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEplistQuery } from "../../Redux/Fetchslice";

export default function EpisodeList({id,epid,setcurrep}) {
    const {infoid} = useSelector(state => state.states)
    const [rangeindex, setrangeindex] = useState(0)
    const [eplist, seteplist] = useState([])
    
    const {data:qEpli, isLoading:epliLoading , error: epliError} =  useEplistQuery(infoid||id)

    useEffect(()=>{
      if(!epliLoading){
        seteplist(qEpli?.episodes)
      }
    },[id,qEpli])
   
    useEffect(()=>{
      if(!epliLoading && epid){
          let selectedEpisode = qEpli?.episodes.find(epno => {
            return String(epno.id.split("=")[1]) === String(epid)
          })

          setcurrep(selectedEpisode)
      }
    },[epid])
    
    
    /*********************FUNCTIONS*************************/

    //Changing BackgroundColor Of Selected Episode
    const handleselect = (e) => {
        let styleep = document.getElementsByClassName('style')[0]
        if (styleep) {
            styleep.classList.remove("style")
        }
        e.target.parentElement.classList.add("style")
    }

    //For Grouping Range of EpisodeList
    const groupedep = (episodelist) => {
        let epgroup = []
        const range = 100;
        for (let i = 0; i < episodelist.length; i += range) {
            epgroup.push(episodelist.slice(i, i + range))
        }
        return epgroup
    }

    const groupep = groupedep(eplist)

    // Changing Range of Episodes
    const changerange = (e) => {         
        const selectedrange = e.target.value.split("-")[0];
        setrangeindex((selectedrange - 1) / 100)
    }

    return (
        <>
            {eplist && <div className="Epstream-list">

                <div className='Episodetag-range'>
                    <h4 id="Epstreamlist-tag">Episodes</h4>
                    {eplist.length > 100 && <select onChange={(e) => { changerange(e) }} id="Epstream-rangesselection">
                        {groupep.map((_, index) =>
                            (<option >{index * 100 + 1} -  {(index + 1) * 100}</option>)
                        )}
                    </select>}
                </div>
                <hr />

                <div className='stream-episodes'>
                    {eplist.length > 1 && eplist.length > 25
                        ? <div className="Epstream-grid">
                            {eplist.length > 1 && groupep[rangeindex].map((ep) => (
                                <p className={`epn ${epid == ep.id.split('=')[1] ? "style" : ""} ${ep.isFiller ? "filler" : ""}`}><Link to={`/stream/${ep.id}`} id="ep" onClick={(e) => handleselect(e)} ><div className="eplist-num">{`Ep ${ep.episode_no}`}</div></Link></p>
                                //  ${epid == ep.id.split('=')[1] ? "style" : ""}

                            ))}
                        </div>
                        : <div className="SEpstream-grid">
                            {eplist.length > 1 && groupep[rangeindex].map((ep) => (
                                //  ${epid == ep.id.split('=')[1] ? "style" : ""}
                                <p className={`epn ${epid == ep.id.split('=')[1] ? "style" : ""} ${ep.isFiller ? "filler" : ""}`} ><Link to={`/stream/${ep.id}`} id="ep" onClick={(e) => handleselect(e)} ><div className="seplist-num">{`Ep ${ep.episode_no}: ${ep.title}`}</div></Link></p>

                            ))}
                        </div>
                    }
                </div>

            </div>}
        </>
    )
}