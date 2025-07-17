import { useState } from "react"
import useFavorites from "../../Hooks/useFavorites"
import { Link } from "react-router-dom";
import { setInfoid, setKeyword, setModalState } from "../../Redux/StateSlice";
import { useDispatch } from "react-redux";

export default function Info({aniinfo ,id}) {
    const dispatch = useDispatch()
    const [Favorite, setFavorite] = useState("regular")
    const [epid, setepid] = useState('')


    const { poster, animeInfo, info, moreInfo,title } = aniinfo?.data || {}
    const { Overview, tvInfo, Genres, Status} = animeInfo || {}
    const { stats } = info || {}
    const { addFavorite, deleteFavorite, favorites } = useFavorites()



    const handleFavorite = (e) => {
        let favAnimeObj = {
            name: title,
            poster: poster,
            animeid: id
        }
        if (Favorite === 'regular') {
            addFavorite(favAnimeObj)
        }

        else if (Favorite === 'solid') {
            deleteFavorite(id)
        }
        setFavorite(prev => prev === 'regular' ? 'solid' : 'regular')
    }
    return (
        <>
            {aniinfo ?<div className="Info-container" >

                <div id="backgroundImgWrapper"><img id="backgroundImg" src={poster}></img></div>
                <div className="Img-Container">
                    <img id="infoimg-src" src={poster} alt=""></img>
                    <button onClick={(e) => { handleFavorite(e) }} ><i className={`fa-${Favorite} fa-star`} ></i></button>
                </div>

                <div className="Info">
                    <p onClick={() => { dispatch(setKeyword(aniinfo.title));  dispatch(setModalState(false)) }}>{title}</p>

                    <div id="ep-info">
                        <span id="s">{Status === "Finished Airing" ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-clock"></i>}{Status === "Finished Airing" ? "Completed" : "Ongoing"}</span>
                        <span id="s1">{tvInfo.rating}</span>
                        <span id="s2"><i class="fa-solid fa-closed-captioning"></i>{tvInfo.sub }</span>
                        <span id="s3"><i class="fa-solid fa-microphone"></i>  {tvInfo.dub}</span>
                    </div>

                    <div className="genre-info">
                        {Genres?.map((genre, index) =>
                            (<p id="anime-genre"><Link to={`/genre/${genre.toLowerCase()}`}>{genre}</Link></p>)
                        )}
                    </div>

                    <div className="Watch-desc">
                        <Link to={`/stream/${epid}`}><button className="Watch-btn" ><i class="fa-solid fa-play"></i>  Watch Now</button></Link>
                        <h4>Description</h4>

                        <hr />
                        <div className="desc">
                            <span>{Overview}</span>
                        </div>
                    </div>

                </div>
            </div>:<h3 style={{color:"white"}}>Loading...</h3>}

            {aniinfo?.seasons && <div className="Seasonsli">
                {aniinfo?.seasons.map((season) => (
                    <div className="season" onClick={() => { dispatch(setInfoid(season.id)) }}>
                        <img className={`season-img ${aniinfo.title === season.title ? "selectedimg" : ""}`} src={season.season_poster || season.poster} />
                        <span className={`season-tag ${aniinfo.title === season.title ? "selectedseas" : ""}`}>{season.title || season.name}</span>
                    </div>
                ))}
            </div>}

        </>
    )
}