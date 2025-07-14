import { useLocation } from 'react-router-dom'
import AnimeCard from '../components/AnimeCard'

export default function List(props) {
   const { anime, next, height } = props
   const location = useLocation();
 
   let name = location.pathname.split("/")
   let currgen
   if(name[1]==="genre"&&name[1]!=="Home"){

       name[1] = location.pathname.slice(1)  
       currgen = name[1].split('/')[1]
   } 


  
   return (
      <>
         <div className="Anime-List" style={
            {
               overflow:next ,
               maxHeight:(name[1]==="Home"||name[1]==="")?height:" ",
               rowGap:(name[1]!=="Home"||name[1]!=="")?"2.2rem":" "
            }
         }>
            { anime&&anime?.map((ani) => (
                <AnimeCard key={ani.id} name={ani?.title}  img={ani?.poster} id={ani?.id} eps={ani?.tvInof?.eps} />
            ))}
            
         </div>
      </>
   )
}











































// const {  Animesearch,keyword,setkeyword ,Source ,AnimeList,Animegenrelist } = context;



//   setloading(false)
//            if(name[1]!=="genre") {setlist(anime)
//             setloading(false)
//          }
//             else
//            { 
//                setlist(data?.results?.data)
//                setloading(false)
//              }


// loading={animeLoadingState} top10={true}

// import React, { useContext, useEffect, useState } from 'react'
// import AnimeCard from './AnimeCard'
// import Animefetch from '../Context.js/Hianimecontext.js/context'
// import { useLocation } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'

// export default function List(props) {
//    const {anime,next,page , height,genre} = props
//    const [list, setlist] = useState([])
//    const [loading, setloading] = useState(true)
//    const location = useLocation();
//    const context = useContext(Animefetch)
//    const {  Animesearch,keyword,setkeyword ,Source ,AnimeList,Animegenrelist } = context;
 
//    let name = location.pathname.split("/")
//    let currgen
//    if(name[1]==="genre"&&name[1]!=="Home"){

//        name[1] = location.pathname.slice(1)  
//        currgen = name[1].split('/')[1]
//    } 
//    const {data,isLoading,error} = useQuery({queryKey:["Listgenre"],queryFn:()=>AnimeList()})
//    useEffect(() => {  
//            setlist(anime)
//             setloading(false)
//            if(name[1]!=="genre") {setlist(anime)
//             setloading(false)
//          }
//             else
//            { Animegenrelist(currgen,page).then(res => {
//                setlist(res.results.data)
//                setloading(false)
//              })}
     
//       return ()=> {
//          setlist([])
//          setloading(true) }
//    }, [name,currgen,page])


   
     
   
  
//    if(loading){
//       return <h2>Loading...</h2>
//    }

//    return (
//       <>
//          <div className="Anime-List" style={{overflow:next , maxHeight:height}}>
//             { !loading?list?.map((anime, index) => (
//                <AnimeCard key={index} name={anime.name} ep={anime.episodes} img={anime.poster} id={anime.id} />
//             )):<h2>Loading...</h2> }
//          </div>
//       </>
//    )
// }