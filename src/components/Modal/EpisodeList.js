import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalState } from "../../Redux/StateSlice";

export default function EpisodeList({ eplist }) {
   
    const dispatch = useDispatch()
    const [rangeindex, setrangeindex] = useState(0)

    const groupedep = (episodelist) => {
        let epgroup = []
        const range = 100;

        for (let i = 0; i < episodelist?.length; i += range) {
            epgroup.push(episodelist.slice(i, i + range))
        }
        return epgroup
    }

    const changerange = (e) => {
        const selectedrange = e.target.value.split("-")[0];
        setrangeindex((selectedrange - 1) / 100)
    }

    const groupep = groupedep(eplist?.episodes)
    return (
        <>

            {eplist?<div className='epli'>
                <div className='Episodetag-range'>
                    <h4>Episodes</h4>
                    {eplist?.episodes.length > 100 && <select onChange={(e) => { changerange(e) }} id="rangesselection">
                        {groupep.map((_, index) =>
                            (<option >{index * 100 + 1} -  {(index + 1) * 100}</option>)
                        )}
                    </select>}
                </div>

                <hr />

                <div className="Ep-list">
                    <div className='episodes'>
                        <div className="Ep-grid">
                            {groupep[rangeindex]?.map((ep) =>
                            (
                                <p ><Link to={`/stream/${ep.id}`} id="epstream-ep" onClick={() => dispatch(setModalState    (false))}>{ep.episode_no}</Link></p>
                            ))}
                        </div>

                    </div>
                </div>
            </div>:<h3 style={{color:"white"}}>Loading...</h3>}
        </>
    )
}