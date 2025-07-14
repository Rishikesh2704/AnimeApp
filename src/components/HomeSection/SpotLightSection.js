import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "../Navbar"
import HomeSlider from "../HomeSlider";
import { memo } from "react";


const SpotLightSection = memo((props) =>{
    const { spotlightCoverAnimes } = props
    return (
        <>
            <div className='Slides-Container' >
                <HomeSlider spotlightCoverAnimes={spotlightCoverAnimes} />
            </div>
        </>
    )
})


export default SpotLightSection 