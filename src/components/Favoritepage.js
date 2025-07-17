import Modal from "../components/Modal/Modal"
import AnimeCard from "./AnimeCard"
import { useSelector } from "react-redux"
export default function FavoritePage(){
    const{ infoid, modalstate } = useSelector(state => state.states)
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