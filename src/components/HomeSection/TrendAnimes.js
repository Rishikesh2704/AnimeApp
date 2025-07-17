import { memo, useContext, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setInfoid, setModalState } from '../../Redux/StateSlice';


const TrendAnimes = memo((props) => {
    const { animes } = props
    const dispatch = useDispatch()
    const element = useRef(null);
    const trendContent = useRef(null);
    const trendContainer = useRef(null);

    /*********************Functions **********************/

    const handleMouseOverElement = (e) => {             // Hover Animation //
        let animeimg = e.target.className == "img" ? e.target.children[0] : e.target.parentNode.parentNode.children[0].children[0]
        let container = e.target.className == "img" ? e.target.parentNode : e.target.parentNode.parentNode
        let img = e.target.className == "img" ? e.target : e.target.parentNode.parentNode.children[0]

        container.style.transition = "0.3s ease-out"
        animeimg.style.transition = "0.3s ease-out"
        animeimg.style.transform = "scale(1.1)"
        img.style.setProperty('--heightofcover', "23.1rem")
        img.style.setProperty('--widthofcover', "16.5rem")
        img.style.setProperty('--transformcover', "1.1")
        img.style.setProperty('--tanslateX', "-0.75rem")
        img.style.setProperty('--tanslateY', "-0.2rem")
        container.style.bottom = "1rem"
    }

    const handleMouseOutElement = (e) => {             // Hover-out Animation //
        let animeContainer = trendContent.current
        let animeimg = e.target.className == "img" ? e.target.children[0] : e.target.parentNode.parentNode.children[0].children[0]
        let container = e.target.className == "img" ? e.target.parentNode : e.target.parentNode.parentNode
        let img = e.target.className == "img" ? e.target : e.target.parentNode.parentNode.children[0]
        animeimg.style.transition = "0.4s ease-out"
        animeimg.style.transform = "scale(1)"
        container.style.bottom = "0rem"
        img.style.setProperty('--heightofcover', "21.8rem")
        img.style.setProperty('--widthofcover', "15rem")
        img.style.setProperty('--transformcover', '1')
        img.style.setProperty('--tanslateX', "0rem")
        img.style.setProperty('--tanslateY', "0rem")
    }

    const showinfo = (id) => {
        dispatch(setModalState(true))
        let modal = document.getElementsByClassName('Modal-contentbox')
        dispatch(setInfoid(id))
    }

    let slide = 0

    const handleNextSlide = () => {
        let trendcontainer = trendContent.current
        slide += 25
        if (slide > 65) {
            slide = 65
        }
        trendcontainer.style.transform = `translateX(-${slide}%)`
    }

    const handlePrevSlide = () => {
        let trendcontainer = trendContent.current
        slide -= 30
        if (slide < 10) {
            slide = 0
        }
        trendcontainer.style.transform = `translateX(-${slide}%)`
    }

    return (
        <>
            <div className='CName' >
                <h2 id="trendH2">Trending</h2>
            </div>

            <div className='trendingCategory' ref={trendContainer}>

                <div className="Trending-Main" >
                    <div className="PrevBtn" onClick={() => handlePrevSlide()}><i className="fa-solid fa-chevron-left" onClick={() => handlePrevSlide()}></i></div>
                    <div className='NextBtn' onClick={() => handleNextSlide()}><i className="fa-solid fa-chevron-right" onClick={() => handleNextSlide()}></i></div>
                    <div className="trendingContainer" ref={trendContent} >
                        {animes.map((anime) => {
                            return (
                                    <div className="element-container" key={anime.id} label={anime.id} onClick={() => showinfo(anime.id)} ref={element} onMouseOver={(e) => handleMouseOverElement(e)} onMouseOut={(e) => handleMouseOutElement(e)} >

                                        <div className='img'>
                                            <img id="elementimg" src={anime.poster} />
                                        </div>

                                        <div className="info" >
                                            <h4 className="coverName">{anime.title}</h4>
                                        </div>

                                    </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    )
})

export default TrendAnimes
