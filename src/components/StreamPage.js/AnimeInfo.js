import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useAnimeinfoQuery } from "../../Redux/Fetchslice";
import { useDispatch } from "react-redux";
import { setInfoid, setKeyword } from "../../Redux/StateSlice";



export default function AnimeInfo({id}) {
    const dispatch = useDispatch()
    const [aniinfo, setaniinfo] = useState(null);
    const [seasons ,setseasons] = useState(null)
    const navigate = useNavigate();

    const { data: qinfo, isLoading, error } = useAnimeinfoQuery(id)

    useEffect(() => {
        if (!isLoading) {
            setaniinfo(qinfo?.anime)
            setseasons(qinfo?.seasons)

        }
    },[qinfo])

   
    const { poster, animeInfo, info, moreInfo,title } = qinfo?.data || {}
    const { Overview, tvInfo, Genres, Status} = animeInfo || {}
    return (
        <>  
            {seasons? <div className='ESeasonsDiv'>
                {seasons && <div className="ESeasonsli">
                {seasons.map((season) => (
                    <div className="season" onClick={() => { dispatch(setInfoid(season.id)) 
                    navigate(`/stream/${season.id}`)
                    }}>
                    <img className={`season-img ${aniinfo.title === season.title ? "selectedimg" : ""}`} src={season.season_poster || season.poster} />
                    <span className={`season-tag ${aniinfo.title === season.title ? "selectedseas" : ""}`}>{season.title || season.name}</span>
                    </div>
                ))}
                </div>}
            </div> : <h3>Loading...</h3>} 

            {qinfo  
             ?<div className='stream-info'>
                <div className="EInfo-container" >

                    <div className="eInfo-img">
                        <img id="einfoimg-src" src={poster} alt=""></img>

                    </div>

                    <div className="EWatch-desc">

                        <span onClick={() => { dispatch(setKeyword(title)); }}>{title}</span>

                        <div id="streamep-info">
                            <span id="es1">{tvInfo.rating}</span>
                            <span id="es2"><i class="fa-solid fa-closed-captioning"></i>{tvInfo.sub}</span>
                            <span id="es3"><i class="fa-solid fa-microphone"></i>  {tvInfo.dub }</span>
                        </div>

                        <div className="Egenre-info">
                            {Genres.map((genre, index) =>
                                (<span id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></span>)
                            ) }
                        </div>

                        <h4>Description</h4>

                        <div className="desc">
                            <hr />
                            <span>{Overview}</span>
                        </div>

                    </div>

                  </div> 
                </div> 
            : <h3>Loading...</h3>}

        </>
    )
}