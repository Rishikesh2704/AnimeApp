import { useContext,useState } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Animefetch from '../../Context.js/Hianimecontext.js/context'
import { useHomeQuery } from '../../Redux/Fetchslice'
import { useRef } from 'react'
import TopAnimesSection from './TopAnimesSection'
import TrendAnimes from './TrendAnimes'
import SpotLightSection from './SpotLightSection'
import OtherSection from './OtherSection'
import LoadingPage from '../LoadingPage'

export default function Home() {
   const location = useLocation()
   const context = useContext(Animefetch)
   const { modalstate, infoid } = context
   const homeRef = useRef(null);
   
   let name = location.pathname.split("/")
   let currgen
    
   if (name[1] === "genre") {
      name[1] = location.pathname.slice(1)
      currgen = name[1].split('/')[1]
   }
   

   //Fetching//

   const {data:ReduxHome,isLoading:Reduxloading,error} = useHomeQuery({
      pollingInterval:60*60000,
      skipPollingIfUnfocused:true
   });

  //Functions//

   const isHome = name[1]==="Home"||name[1]==="" 
  
   const isOther = (key) => 
      key !== "genres" && 
      key !== "today" && 
      key !== "topTen" && 
      key !== "spotlights" && 
      key !== "trending" && 
      key !== "today"
   
   
   return (
      <>
         {!Reduxloading&&(isHome)&&Object.entries(ReduxHome).map(([key,value]) => {
            if (key==="spotlights") return(<SpotLightSection key={key} spotlightCoverAnimes={value}/>)
         })}
            
         {!Reduxloading
            ?
               <div className='Home' ref={homeRef} >
                  {isHome && Object.entries(ReduxHome).map(([key,value]) => {

                     if(key==='trending') return (<TrendAnimes key={key+1} animes={value}/>) 

                     if (key === "topTen")  return (<TopAnimesSection key={key+2} animes={value} heading={key} />)
                        
                     if (isOther(key))  return (<OtherSection key={key+3}  keys={key} animeli={value} />)

                  })}
               </div>
            :
            <LoadingPage/>
         }

         {modalstate &&<Modal id={infoid}/>}
      </>
   )
}














/********************************* With Tanstack Query **********************************/



// import React, { useContext, useEffect, useState, } from 'react'
// import List from './List'
// import { Navigate, useLocation, useNavigate, } from 'react-router-dom'
// import Modal from './Modal'
// import Animefetch from '../Context.js/Hianimecontext.js/context'
// import SimpleImageSlider from "react-simple-image-slider";
// import { use } from 'react'
// import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

// export default function Home() {
  
//    const location = useLocation()
//    const context = useContext(Animefetch)
//    const { modalstate, setmodalstate, infoid, Source, AnimeList, keyword, setkeyword, Animesearch, Animegenrelist,isMovie} = context
//    const path = location.pathname.split('/')
//    const heading = path[1] === "genre" ? path[2].toUpperCase() : path[1].toUpperCase();

//    // const [Anili, setAnili] = useState([])
//    // const [Loading, setLoading] = useState(true)
//    const [Search, setSearch] = useState([])
//    const [showmore, setshowmore] = useState("hidden")
//    const [Error, setError] = useState("Loading...")
//    const [height, setheight] = useState("12rem")
//    const [ani, setani] = useState('today')
//    const [currpage, setcurrpage] = useState(1)

//    let currgen
//    let name = location.pathname.split("/")


//    const images = [
//       { url: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/46d8e6d3fcd4a016ff5e90f0281eae76.jpg" },
//       { url: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/af1c058948079aabe09de052cc7b4261.jpg" },
//       { url: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg" },
//    ]
   
//    if (name[1] === "genre" && name[1] !== "Home") {

//       name[1] = location.pathname.slice(1)
//       currgen = name[1].split('/')[1]
//    }
   
//    const {data:Animeli , isLoading, error} = useQuery({queryKey:['Animelist'],queryFn:()=>AnimeList()})

//    const {data:Searchre , isLoading:Searchloading, error:searcherror,fetchNextPage:fetchSearchNextPage} = useInfiniteQuery({
//       queryKey:['SearchResults',keyword,currpage,name[1]],
//       queryFn:(pageParam)=>Animesearch(keyword,pageParam),enabled: name[1]=== "Search",
//       initialPageParam:1,
//       getNextPageParam:(lastpage)=>{
//         if(lastpage?.data?.hasNextPage){
//          return lastpage?.data?.currentPage+1
//         }
//         else return undefined
//       }
//    })
//    const {data:Genreli , isLoading:Genreloading , error:Genreerror ,fetchNextPage } = useInfiniteQuery({
//       queryKey:['Genre',currgen,currpage],
//       queryFn:(pageParam)=>Animegenrelist(currgen,pageParam),enabled: !!currgen,
//       initialPageParam:1,
//       getNextPageParam:(lastpage)=>{
//          if(lastpage?.data?.hasNextPage){
//             return lastpage?.data?.currentPage+1
//          }
//          else return undefined;
//       }
      

//    }) 
   
//    // useEffect(()=>{
     
//    //    if(name[1]==="Search"&&keyword.length>0&&!Searchloading){
//    //       setSearch(Searchre?.data?.animes)
//    //       console.log(searcherror)
//    //    }
//    //    return(()=>{
//    //     setSearch([])
//    //    })
//    // },[Searchloading,Searchre,currpage,])
  
   
//    useEffect(()=>{   
//    if(name[1]==="Search"&&keyword.length>0&&!Searchloading){
//       let animes = Searchre?.pages.map((page)=> Object.entries(page?.data).filter(anime =>  anime[0]==="animes")[0][1])[Searchre.pages.length-1]

//       setSearch([...Search,...animes])
//       console.log(Searchre?.pages)
//    }
//     else if(!Genreloading&&name[1].split('/')[0]==="genre"){
//       console.log(Genreli.pages.length)
//       let animes = Genreli?.pages.map((page)=> Object.entries(page?.data).filter(anime =>  anime[0]==="animes")[0][1])[Genreli.pages.length-1]
//          setSearch([...Search,...animes])
//       }
//       return(()=>{
//          setSearch([])
//       })
//    },[Searchloading,Searchre,keyword,Genreloading,Genreli,currgen,currpage])

//    console.log(name[1])
//    useEffect(()=>{
//       console.log(name[1])
//      if(name[1].split('/')[0]==="genre"|| name[1]=="Search"){ document.addEventListener('scroll',function(e){
        
//          if(window.scrollY+window.innerHeight+450>=document.getElementsByClassName('Home')[0].scrollHeight){
//             if(name[1]==="Search"){
//                fetchSearchNextPage()
//             }

//             else if(name[1].split('/')[0]==="genre") {fetchNextPage();}
//             }
//       })
//          }
//    },[name[1]])
   
//    const handlemodal = (e) => {
//       if (e.target.classList == "Modal-bg") {
//          setmodalstate(false)
//       }
//    }


//    const handleShowmore = (e) => {
//       let clist = e.target.parentElement.nextElementSibling.nextElementSibling.children[0]
//       if(name[1].split('/')[0]=="genre"){
//       clist.style.maxHeight = "none"
//       clist.style.overflow = " " 

//       }
//       else{

//          clist.style.maxHeight == "30rem" ? clist.style.maxHeight = "12rem" : clist.style.maxHeight = "30rem"
//          clist.style.overflow == " " ? clist.style.overflow = "hidden" : clist.style.overflow = " "
//       }
//    }

  
//    if(error!==null){
//         setError(error)
//    }
//    const navigate = useNavigate()
   
//    return (
//       <>
//         <button onClick={()=>navigate('/Counter')}>Click</button>
//          <h2 style={{ color: "white" }}>{Source}</h2>
//          {!isLoading? <div className='Home'>

//            {name[1]==="Home"||name[1]==="" ?<div className='Slides'>
//                <SimpleImageSlider
//                   width={950}
//                   height={500}
//                   images={images}
//                   autoPlay={true}
//                />
             
//             </div>:<h3>Loading...</h3>}
//             {name[1] == "" || name[1] == "Home" ? Object.entries(Animeli?.data).map((re) => {
//                if (key !== "genres" && key !== "today" && key !== "top10Animes" && key !== "spotlightAnimes") {
//                   return (<>
//                      <div className='CName'>

//                         <h2>{(key.slice(0, 1).toUpperCase() + key.slice(1))}</h2>
//                         {re[1].length > 10 && <i id="showmore" class="fa-solid fa-arrow-down" onClick={(e) => handleShowmore(e)}></i>}
//                      </div>
//                      <div className='hline'></div>

//                      <div className='Result'>
//                         <List anime={re[1]} next={showmore} height={height} />
//                      </div>
                      
//                   </>
//                   )
//                }
//                else if (key !== "spotlights") {
//                   if (key == "top10Animes") {

//                      return (<>
//                         <div className='CName'>

//                            <h2>{(key.slice(0, 1).toUpperCase() + key.slice(1))}</h2>
//                            <select id="top10" onChange={(e) => setani(e.target.value)}>
//                               {Object.keys(re[1]).map((li) => (
//                                  <option>{li}</option>
//                               ))}
//                            </select>

//                         </div>
//                         <div className='hline'></div>
//                         <div className='Result'>
//                           <div id="today">
//                               {Object.entries(re[1]).map((t) => {
//                                  if (t[0] === ani) {

//                                     return (
//                                        <>
//                                           <List anime={t[1]} next={showmore} height={height} />
//                                        </>
//                                     )
//                                  }
//                               }

//                               )}
//                            </div>
//                         </div>

//                      </>
//                      )
//                   }


//                }

//             }) :


//                <>
//                   <div className='CName'>

//                      <h2>{name[1] !== "Search" ? currgen.slice(0, 1).toUpperCase() + currgen.slice(1) : "Search Results"}</h2>
//                   </div>
//                   <div className='hline'></div>

//                  <div className='Result'>
//                   {console.log(Search)}
//                      {/* {Search.map((page)=>{
//                              return (
//                               <>
//                               <List anime={page} next={showmore} page={currpage} height="57rem" />
                           
//                      </>)
//                      })
                        
//                      } */}
//                               <List anime={Search} next={showmore} page={currpage} height="57rem" />

                     
//                   </div>

//                </>



//             }

           
//          </div> : <h3 style={{ color: "white", marginTop: "10rem" }}>{Error}</h3>}


//          {modalstate && <div className="Modal-bg" onClick={(e) => handlemodal(e)}>
//             <div className="Modal-contentbox">
//                <Modal id={infoid} />
//             </div>
//          </div>}
//       </>
//    )
// }

















/******************************** Without Any Query Libraries *********************************/

// import React, { useContext, useEffect, useState, } from 'react'
// import List from './List'
// import { useLocation, } from 'react-router-dom'
// import Modal from './Modal'
// import Animefetch from '../Context.js/Hianimecontext.js/context'
// import SimpleImageSlider from "react-simple-image-slider";
// import {useQuery} from '@tanstack/react-query'

// export default function Home() {
  
//    const location = useLocation()
//    const context = useContext(Animefetch)
//    const { modalstate, setmodalstate, infoid, Source, AnimeList, keyword, setkeyword, Animesearch, Animegenrelist,isMovie,QAnimeList} = context
//    const path = location.pathname.split('/')
//    const heading = path[1] === "genre" ? path[2].toUpperCase() : path[1].toUpperCase();

//    const [Anili, setAnili] = useState([])
//    const [Search, setSearch] = useState([])
//    const [Loading, setLoading] = useState(true)
//    const [showmore, setshowmore] = useState("hidden")
//    const [Error, setError] = useState("Loading...")
//    const [height, setheight] = useState("12rem")
//    const [ani, setani] = useState('today')
//    const images = [
//       { url: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/46d8e6d3fcd4a016ff5e90f0281eae76.jpg" },
//       { url: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/af1c058948079aabe09de052cc7b4261.jpg" },
//       { url: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg" },
//    ]

//    const [totpages, settotpages] = useState()
//    const [currpage, setcurrpage] = useState(1)
   



//    let name = location.pathname.split("/")
//    let currgen
//    if (name[1] === "genre" && name[1] !== "Home") {

//       name[1] = location.pathname.slice(1)
//       currgen = name[1].split('/')[1]
//    }

//    const handlemodal = (e) => {
//       if (e.target.classList == "Modal-bg") {
//          setmodalstate(false)
//       }
//    }



//    const handleShowmore = (e) => {
//       let clist = e.target.parentElement.nextElementSibling.nextElementSibling.children[0]

//       clist.style.maxHeight == "30rem" ? clist.style.maxHeight = "12rem" : clist.style.maxHeight = "30rem"
//       clist.style.overflow == " " ? clist.style.overflow = "hidden" : clist.style.overflow = " "
//    }




//    useEffect(() => {
//       AnimeList().then(result => {
//          let n = Object.entries(result.data).map((re) => re).filter(n => n[0] === "top10Animes")
//          setAnili(Object.entries(result.data).map((re) => re).filter(n => n[0] !== "top10Animes").concat(n))
//          setLoading(false)
         
//       }).catch((err) => {
//          console.log("Failed to fetch Animes", err)
//          setError("Failed to fetch Anime")
//        })

     
//       currgen && Animegenrelist(currgen, currpage).then(res => {
//          setSearch(res.data.animes)
//          settotpages(res.data.totalPages)
//       }).catch((err) => {
//          console.log("failed to fetch genre", err)
//       })

//       return (() => {
//          if (currpage == totpages)
//             setSearch([])

//       })

//    }, [currpage, currgen, ani])
   

//    useEffect(() => {
//       if (keyword !== "") {
//          setLoading(true)

//          Animesearch(keyword, currpage).then(result => {

//             setSearch(result.data.animes)
//             settotpages(result.data.totalPages)
//             setLoading(false)
//          }).catch((err) => {
//             console.log("Failed to get results", err)
//          })

//       }



//       return () => {
//          setkeyword('')
//          setLoading(true)
//       }

//    }, [keyword, currpage])

//    useEffect(() => {
//       setcurrpage(1)
//    }, [currgen])

//    let result = QAnimeList()
//    console.log("Loading: ",result.isLoading,"Animes: ",result.data,"Is Error: ",result.isError,"Error: ",result.error)

  

//    return (
//       <>
//          <h2 style={{ color: "white" }}>{Source}</h2>
//          {!Loading? <div className='Home'>


//             <div className='Slides'>
//                <SimpleImageSlider
//                   width={950}
//                   height={500}
//                   images={images}
//                   showNavs={true}
//                />
//                {/* <img src="https://cdn.noitatnemucod.net/thumbnail/1366x768/100/46d8e6d3fcd4a016ff5e90f0281eae76.jpg"></img>
//                      <img src="https://cdn.noitatnemucod.net/thumbnail/1366x768/100/af1c058948079aabe09de052cc7b4261.jpg"></img>
//                      <img src="https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg"></img>
//                    */}
//             </div>
//             {name[1] == "" || name[1] == "Home" ? Anili.map((re) => {
//                if (key !== "genres" && key !== "today" && key !== "top10Animes" && key !== "spotlightAnimes") {
//                   return (<>
//                      <div className='CName'>

//                         <h2>{(key.slice(0, 1).toUpperCase() + key.slice(1))}</h2>
//                         {re[1].length > 10 && <i id="showmore" class="fa-solid fa-arrow-down" onClick={(e) => handleShowmore(e)}></i>}
//                      </div>
//                      <div className='hline'></div>

//                      <div className='Result'>
//                         <List anime={re[1]} next={showmore} height={height} />
//                      </div>

//                   </>
//                   )
//                }
//                else if (key !== "spotlights") {
//                   if (key == "top10Animes") {

//                      return (<>
//                         <div className='CName'>

//                            <h2>{(key.slice(0, 1).toUpperCase() + key.slice(1))}</h2>
//                            <select id="top10" onChange={(e) => setani(e.target.value)}>
//                               {Object.keys(re[1]).map((li) => (
//                                  <option>{li}</option>
//                               ))}
//                            </select>

//                         </div>
//                         <div className='hline'></div>
//                         <div className='Result'>
//                           <div id="today">
//                               {Object.entries(re[1]).map((t) => {
//                                  if (t[0] === ani) {

//                                     return (
//                                        <>
//                                           <List anime={t[1]} next={showmore} height={height} />
//                                        </>
//                                     )
//                                  }
//                               }

//                               )}
//                            </div>
//                         </div>

//                      </>
//                      )
//                   }


//                }

//             }) :


//                <>
//                   <div className='CName'>

//                      <h2>{name[1] !== "Search" ? currgen.slice(0, 1).toUpperCase() + currgen.slice(1) : "Search Results"}</h2>
//                   </div>
//                   <div className='hline'></div>

//                   <div className='Result'>
//                      <List anime={Search} next={showmore} page={currpage} height="57rem" />
//                      <div className="pages">
//                         <i class="fa-solid fa-chevron-left" onClick={() => setcurrpage(prev => prev - 1)}></i>
//                         <p>{`${currpage} of ${totpages}`}</p>
//                         <i class="fa-solid fa-angle-right" onClick={() => setcurrpage(prev => prev + 1)}></i>
//                      </div>
//                   </div>

//                </>



//             }


//          </div> : <h3 style={{ color: "white", marginTop: "10rem" }}>{Error}</h3>}


//          {modalstate && <div className="Modal-bg" onClick={(e) => handlemodal(e)}>
//             <div className="Modal-contentbox">
//                <Modal id={infoid} />
//             </div>
//          </div>}
//       </>
//    )
// }