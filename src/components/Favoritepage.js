import { useContext } from "react"
import Animefetch from "../Context.js/Hianimecontext.js/context"
import Modal from "../components/Modal/Modal"
import AnimeCard from "./AnimeCard"
export default function FavoritePage(){
    const context = useContext(Animefetch)
    const{infoid,modalstate} = context
    const  animesli = JSON.parse(localStorage.getItem("Favorites")) || null
    
    return(
        <>
         
            <div className="favorite-container"  >

                <div className='CName'>
                    <h2>Favorites</h2>
                </div>

                <div className='Result'>
                        <div className="Anime-List">

                         {animesli?.map(anime => {
                             return(
                                 <AnimeCard key={anime.animeid} name={anime.name} img={anime.poster} id={anime.animeid} />
                             )
                            })
                          }
                        </div>
                </div>
            </div>
                {modalstate &&<Modal id={infoid}/>}
        </>
    )
}