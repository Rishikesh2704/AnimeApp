import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useHomeQuery } from "../Redux/Fetchslice";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../Redux/StateSlice";

export default function Navbar() {
    const [searchkey, setsearchkey] = useState('')
    const [genres, setgenres] = useState([])
    const [show, setshow] = useState("hidden")
    const { keyword } = useSelector(state => state.states);
    const dipatch = useDispatch()

    const location = useLocation();
    const navigate = useNavigate();

    let path = location.pathname.split("/")[1]

    const handlechange = (e) => { setsearchkey(e.target.value) }

    const handledropdown = (e) => { setshow("") }


    const fetchresult = async () => {
        if (keyword !== " ") {
            dipatch(setKeyword(searchkey))
            navigate('/Search')
        }
    }

    const { data: ReduxHome, isLoading: Reduxloading, error } = useHomeQuery({
        pollingInterval: 60 * 60000,
        skipPollingIfUnfocused: true
    });



    useEffect(() => {
        if (!Reduxloading) {
            Object.entries(ReduxHome).map((categ) => {
                if (categ[0] === "genres") {
                    setgenres(categ[1])
                }
            })
        }
    }, [keyword, Reduxloading])




    return (
        <>
            <div className="navbar" style={{ position: ((path === "Home" || path === "") ? "absolute" : "fixed"), backgroundColor: ((path === "Home" || path === "") ? "linear-gradient(0deg, rgb(21, 20, 20) 0% , rgba(68, 68, 68, 0) 40%)" : "rgb(14,14,14)"), top: ((path === "Home" || path === "") ? "0.8rem" : "0rem") }}>

                <div className="Options">

                    <h2 className="Main-name">Anime</h2>

                    <ul>
                        <li id="category-main">
                            <Link to="/Home" id="category">Home</Link>
                        </li>

                        <li onMouseOver={(e) => { handledropdown(e) }} onMouseOut={() => { setshow("hidden") }}>
                            <div className="dropdown" >
                                <a className="gen-tag"  >Genre</a>
                                <div className="options" style={{ visibility: show }}>
                                    <ul id="hidden">
                                        {genres ? genres.map((genre, index) => (
                                            <li className="anime-genre" value={`/genre/${genre}`} key={index} onClick={() => handledropdown()}><Link className="genre-categories" to={`/genre/${genre}`} >{genre}</Link></li>

                                        )) : <p>NO Genres</p>}

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
                </div>
            </div>
        </>
    )
}



