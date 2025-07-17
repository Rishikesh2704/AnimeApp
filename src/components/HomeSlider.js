import { useEffect, useRef, useState } from "react"
import { useAnimeinfoQuery } from '../Redux/Fetchslice'
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { setInfoid, setModalState } from "../Redux/StateSlice";

export default function HomeSlider({ spotlightCoverAnimes }) {
  const dispatch = useDispatch()
  const [animeimg, setanimeimg] = useState([])
  const [currentindx, setcurrentindx] = useState(0)
  const grid = useRef(null)
  const id = spotlightCoverAnimes.map(ani => ani.id)
  let fetchingid = id[currentindx]
  let currentrem = 0;

  const { data } = useAnimeinfoQuery(fetchingid)
  useEffect(() => {
    if (data?.data?.poster) {
      setanimeimg((prev) => [...prev, data.data.poster])
      if (currentindx <= id.length) setcurrentindx(prev => prev + 1)
    }
  }, [data])

  const handleNextCover = () => {

    if (currentrem < 94 * 7) {
      currentrem += 94
      grid.current.style.setProperty('--changeCover', `-${currentrem}rem`)

    }
  }
  const handlePrevCover = () => {
    if (currentrem >= 0) {
      currentrem -= 94
      grid.current.style.setProperty('--changeCover', `-${currentrem}rem`)
    }

  }

  const handleModal = (spotlightId) => {
    dispatch(setInfoid(spotlightId))
    dispatch(setModalState(true));
    // setinfoid(spotlightId)
    // setmodalstate(true)
  }

  return (
    <>

      <Navbar />

      <div className="Slider-Container">
        <i className="fa-solid fa-chevron-left CoverPrevBtn" onClick={() => { handlePrevCover() }} role="button"></i>
        <i className="fa-solid fa-chevron-right CoverNextBtn" onClick={() => { handleNextCover() }} role="button"></i>

        <div className="Animes-Container">
          <div className="Slide-Images" ref={grid}>
            {spotlightCoverAnimes.map((spotlight, idx) => (
                  <div className="SpotlightAnime-container" key={spotlight.id+idx} style={{ transform: spotlight.title === "One Piece" ? "translateY(5rem)" : "none" }}>
                    <div className="Cover">
                      <div className="CoverDark"></div>
                      <img src={spotlight.poster}></img>
                    </div>

                    <div className="Cover-Info"style={{ bottom: idx === 7 ? "60%" : "52%", transform: spotlight.title === "One Piece" ? "translateY(12rem)" : "none" }}>

                      <div className="Title">
                        <img id="Coverimg-src" src={animeimg[idx]} onClick={() => handleModal(spotlight.id)} ></img>
                        <p>{spotlight.title}</p>
                      </div>

                      <div id="ep-info">
                        {Object.entries(spotlight.tvInfo).map((info,idx) => (
                          info[0] !== "episodeInfo" && <span id="Cover" key={idx+1}>{info[1]}</span>
                        ))}

                        {Object.entries(spotlight.tvInfo).map(info => {
                          if (info[0] === "episodeInfo") {
                            return (Object.entries(info[1]).map((ep,idx) => (<span id="Cover" key={idx+1}>{ep[0].toUpperCase()}:{ep[1]}</span>)))
                          }
                        })}
                      </div>

                      <span >{spotlight?.description.slice(0, 598)}...</span>

                    </div>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}