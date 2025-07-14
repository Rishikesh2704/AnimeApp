import { useContext, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Animefetch from '../Context.js/Hianimecontext.js/context'

export default function AnimeCard(props) {
    const context = useContext(Animefetch)
    const { setmodalstate, setinfoid } = context
    const { name, img, id, loading, eps} = props
    const element = useRef(null)
    const location = useLocation();

    const page = location.pathname.split('/')
    const showinfo = () => {
        setmodalstate(true)
        setinfoid(id)
    }

    const handleMouseOverElement = (e) => {
        let animeimg = e.target.className == "img" ? e.target.children[0] : e.target.parentNode.parentNode.children[0].children[0]
        let container = e.target.className == "img" ? e.target.parentNode : e.target.parentNode.parentNode
        let img = e.target.className == "img" ? e.target : e.target.parentNode.parentNode.children[0]

        container.style.transition = "0.3s ease-out"
        animeimg.style.transition = "0.3s ease-out"
        animeimg.style.transform = "scale(1.14)"
        img.style.setProperty('--heightofcover', "15.24rem")
        img.style.setProperty('--widthofcover', "10rem")
        img.style.setProperty('--transformcover', "1.1")
        img.style.setProperty('--tanslateX', "-0.54rem")
        img.style.setProperty('--tanslateY', "-0rem")
        container.style.bottom = "1rem"
    }


    useEffect(() => {
        let elementC = element.current

        if (elementC && page[1] === "genre" || page[1] === "search") {

            if (elementC?.getBoundingClientRect().bottom >= 0 && elementC?.getBoundingClientRect().bottom <= window.innerHeight + elementC?.getBoundingClientRect().width) {
                elementC.style.setProperty("--size", "scale(1)")
            }
            window.addEventListener("scroll", () => {
                if (elementC?.getBoundingClientRect().bottom >= 0 && elementC?.getBoundingClientRect().bottom <= window.innerHeight + elementC?.getBoundingClientRect().width) {
                    elementC.style.setProperty("--size", "scale(1)")
                }
            })
        }
        else {
            elementC.style.setProperty("--size", "scale(1)")

        }

        return () => {
            window.removeEventListener("scroll", () => {

                let elementC = element.current
                let boundary = elementC.getBoundingClientRect();
                if (elementC?.getBoundingClientRect().bottom >= 0 && elementC?.getBoundingClientRect().bottom <= window.innerHeight + elementC?.getBoundingClientRect().width) {
                    elementC.style.transform = "scale(1)"

                }
            })
        }
    }, [])


    useEffect(() => {

        let animeContainer = document.querySelectorAll('.element-container')
        if (loading) {
            animeContainer.forEach(element => {
                element.style.setProperty("--loading", "visible")
            });
        }
        else {

            animeContainer.forEach(element => {
                element.style.setProperty("--loading", "hidden")
            });
        }
    }, [loading])


    const handleMouseOutElement = (e) => {
        // container.style.bottom = "1rem"
        // animeimg.style.height = "11.8rem"

        let animeimg = e.target.className == "img" ? e.target.children[0] : e.target.parentNode.parentNode.children[0].children[0]
        let container = e.target.className == "img" ? e.target.parentNode : e.target.parentNode.parentNode
        let img = e.target.className == "img" ? e.target : e.target.parentNode.parentNode.children[0]


        animeimg.style.transition = "0.4s ease-out"
        animeimg.style.transform = "scale(1)"
        container.style.bottom = "0rem"
        img.style.setProperty('--heightofcover', "15.34rem")
        img.style.setProperty('--widthofcover', "10rem")
        img.style.setProperty('--transformcover', '1')
        img.style.setProperty('--tanslateX', "0rem")
        img.style.setProperty('--tanslateY', "0rem")


    }


    return (
        <>
            <div className="element-container" onClick={showinfo} ref={element} onMouseOver={(e) => handleMouseOverElement(e)} onMouseOut={(e) => handleMouseOutElement(e)} >
                <div className='img' >
                    <img id="elementimg" src={img} />
                </div>

                <div className="info" >
                    <h4 className="coverName">{name}</h4>
                    {eps && <p>Episode {eps}</p>}
                </div>
            </div>
        </>
    )
}