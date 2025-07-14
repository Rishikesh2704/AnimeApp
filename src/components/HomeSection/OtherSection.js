import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import List from "../List";


export default function OtherSection({ keys, animeli }) {
    const showMoreBtn = useRef(null);
    const [height, setheight] = useState("18rem")
    const [showmore, setshowmore] = useState("hidden")
    const location = useLocation()

    let name = location.pathname.split("/")
    let currgen

    if (name[1] === "genre") {
        name[1] = location.pathname.slice(1)
        currgen = name[1].split('/')[1]
    }

    const handleShowmore = (e) => {                  // HomePage Show More
        let moreBtn = e.target
        moreBtn.style.transform === "rotate(0deg)" ? moreBtn.style.transform = "rotate(-180deg)" : moreBtn.style.transform = "rotate(0deg)"
        let clist = e.target.parentElement.nextElementSibling.children[0]
        if (name[1].split('/')[0] == "genre" || name[1] === "Search") {
            clist.style.Height = "auto"
            clist.style.overflow = " "
        }
        else {
            clist.style.maxHeight == "70rem" ? clist.style.maxHeight = "18rem" : clist.style.maxHeight = "70rem"
            clist.style.overflow == " " ? clist.style.overflow = "hidden" : clist.style.overflow = " "
        }
    }

    const Homeheading = (heading) => {             
        let regex = /[A-Z]/
        let indexOfCaptialLetter = heading.match(regex).index
        let newheading = heading.slice(0, 1).toUpperCase() + heading.slice(1, indexOfCaptialLetter) + " " + heading.slice(indexOfCaptialLetter)
       return newheading
    }

    return (
        <>
            <div >
                <div className='CName' >
                    <h2>{(Homeheading(keys))}</h2>

                    {animeli.length > 10 && <i id="showmore" style={{ transform: "rotate(0deg)" }} className="fa-solid fa-arrow-down" ref={showMoreBtn} onClick={(e) => handleShowmore(e)}></i>}
                </div>

                <div className='Result'>
                    <List anime={animeli} next={showmore} height={height} />
                </div>
            </div>
        </>
    )
}