import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Animefetch from "../Context.js/Hianimecontext.js/context";
import { useNavigate } from "react-router-dom";
import { queries } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { SignedIn, SignInButton, UserButton } from "@clerk/clerk-react";
import { useHomeQuery } from "../Redux/Fetchslice";

export default function Navbar() {
    const [searchkey, setsearchkey] = useState('')
    const [genres, setgenres] = useState([])
    const [show, setshow] = useState("hidden")
    const context = useContext(Animefetch)
    const { setkeyword, AnimeList, setSource,isMovie,setisMovie,keyword} = context;
    
    const location = useLocation();
    const navigate = useNavigate();
    
    let path = location.pathname.split("/")[1]
   
    const handlechange = (e) => { setsearchkey(e.target.value) }

    const handledropdown = (e) => { setshow("") }


    const fetchresult = async () => {
        if(keyword!==" "){
           setkeyword(searchkey) 
        navigate('/Search')
        }
    }

     const {data:ReduxHome,isLoading:Reduxloading,error} = useHomeQuery({
          pollingInterval:60*60000,
          skipPollingIfUnfocused:true
       });

    

    // const {data , isLoading , error } = useQuery({queryKey:['Genreli'],queryFn:()=>AnimeList()})
    useEffect(() => {
        if(!Reduxloading){
            Object.entries(ReduxHome).map((categ)=>{
                if(categ[0]==="genres"){
                    setgenres(categ[1])
                }
            })
        }

    }, [keyword,Reduxloading])
    //  const handlegenre = (genrename)=>{
    //     console.log(genrename)
    //     setgenrekey(genrename);
    //    console.log(genrekey)
    //  }



    return (
        <>
            <div className="navbar" style={{position:((path==="Home"||path==="")?"absolute":"fixed"), backgroundColor:((path==="Home"||path==="")?"linear-gradient(0deg, rgb(21, 20, 20) 0% , rgba(68, 68, 68, 0) 40%)":"rgb(14,14,14)") ,top:((path==="Home"||path==="")?"0.8rem":"0rem")}}>

                <div className="Options">
                <h2 className="Main-name">Anime</h2>

                    <ul>
                        <li id="category-main">
                            <Link to="/Home" id="category">Home</Link>
                        </li>
                       
                        <li onMouseOver={(e)=>{handledropdown(e);setisMovie(false)}} onMouseOut={()=>{setshow("hidden")}}>
                            <div className="dropdown" >
                                <a className="gen-tag"  >Genre</a>
                                <div className="options" style={{ visibility: show }}>
                                    <ul id="hidden">
                                        {genres ? genres.map((genre, index) => (
                                            <li className="anime-genre" value={`/genre/${genre}`} key={index} onClick={() => handledropdown()}><Link className="genre-categories"to={`/genre/${genre}`} >{genre}</Link></li>

                                        )):<p>NO Genres</p>}

                                    </ul>
                                </div>
                            </div>
                        </li>
                        
                         <li id="category-main">
                            <Link to="/Favorites" id="category" >Favorites</Link>
                        </li>
                        

                    </ul>

                </div>

                <div className="Other">

                    <div className="search">
                        <button className="search-bt" onClick={fetchresult}><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input className="search-input" placeholder="Search" onChange={handlechange} value={searchkey}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    fetchresult()
                                }
                            }
                            }></input>
                    </div>


                     <div className="auth">
                            
                           <SignInButton className="signup"/>
                           <UserButton id="user"/>
                     </div>
                </div>

                    
              
                 

            </div>

        </>
    )
}





// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Animefetch from "../Context.js/Hianimecontext.js/context";
// import { useNavigate } from "react-router-dom";
// import { queries } from "@testing-library/react";
// import { useQuery } from "@tanstack/react-query";

// export default function Navbar() {
//     const [searchkey, setsearchkey] = useState('')
//     const [genres, setgenres] = useState([])
//     const [show, setshow] = useState("hidden")
//     const context = useContext(Animefetch)
//     const { setkeyword, AnimeList, setSource,isMovie,setisMovie,keyword} = context;
    
//     const location = useLocation();
//     const navigate = useNavigate();
    
//     let path = location.pathname.split("/")[1]
   
//     const handlechange = (e) => { setsearchkey(e.target.value) }

//     const handledropdown = () => { show === "hidden" ? setshow("") : setshow("hidden") }


//     const fetchresult = async () => {
//         if(isMovie){
//             setkeyword(searchkey) 
//           navigate('/Search/Movies')
//         }
//         else{setkeyword(searchkey) 
//         navigate('/Search')}
//     }
//     const {data , isLoading , error } = useQuery({queryKey:['Genreli'],queryFn:()=>AnimeList()})
//     useEffect(() => {

//         path==="Movies"?setisMovie(true):setisMovie(false)
//         AnimeList().then(result => {
//            setgenres(result.data.genres)
//         }).catch((err)=>{
//             console.log(err)
//         })
      
//         return(()=>{
//         })

//     }, [keyword])
//     //  const handlegenre = (genrename)=>{
//     //     console.log(genrename)
//     //     setgenrekey(genrename);
//     //    console.log(genrekey)
//     //  }



//     return (
//         <>
//             <div className="navbar">

//                 <h2>Anime</h2>
//                 <div className="Options">

//                     <ul>
//                         <li>
//                             <Link to="/Home" id="category" onClick={()=> setisMovie(false)}>Home</Link>
//                         </li>
                       
                       
//                         <li >
//                             <div className="dropdown" >
//                                 <a className="gen-tag" onClick={()=>{handledropdown();setisMovie(false)}}>Genre</a>
//                                 <div className="options" style={{ visibility: show }}>
//                                     <ul id="hidden">
//                                         {genres ? genres.map((genre, index) => (
//                                             <li className="anime-genre" value={`/genre/${genre}`} key={index} onClick={() => handledropdown()}><Link to={`/genre/${genre}`} >{genre}</Link></li>

//                                         )):<p>NO Genres</p>}

//                                     </ul>
//                                 </div>
//                             </div>
//                         </li>
//                         <hr id = "navline"/>
//                         <li>
//                             <Link to="/Movies" id="category" onClick={()=>setisMovie(true)}>TvShows/Movies</Link>
//                         </li>
                        

//                     </ul>

//                 </div>

//                 <div className="search">
//                     <button className="search-bt" onClick={fetchresult}><i className="fa-solid fa-magnifying-glass"></i></button>
//                     <input className="search-input" placeholder="Search" onChange={handlechange} value={searchkey}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                                 fetchresult()
//                             }
//                         }
//                         }></input>
//                 </div>



//             </div>

//         </>
//     )
// }