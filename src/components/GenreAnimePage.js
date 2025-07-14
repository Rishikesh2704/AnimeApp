import { useContext, useState, useEffect } from 'react'
import Animefetch from '../Context.js/Hianimecontext.js/context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom'
import Modal from './Modal/Modal';
import { useGenreAnimeInfiniteQuery } from '../Redux/Fetchslice';
import ListLayout from './ListLayout';

export default function GenreAnimePage() {
    const context = useContext(Animefetch);
    const { Animegenrelist, modalstate, infoid } = context;
    const [Genre, setGenre] = useState([])
    const [currpage, setcurrpage] = useState(1)
    const location = useLocation()
    const body = document.getElementsByTagName('body')[0]

    let name = location.pathname.split("/")
    let currgen
    name[1] = location.pathname.slice(1)
    currgen = name[1].split('/')[1]



    // FETCHING GENRE ANIMES//
    const {data, isLoading,fetchNextPage} = useGenreAnimeInfiniteQuery({currgen})
    // const { data: Genreli, isLoading: Genreloading, error: Genreerror, fetchNextPage: fetchNextGenrePage } = useInfiniteQuery({
    //     queryKey: ['Genre', currgen],
    //     queryFn: (pageParam) => Animegenrelist(currgen, pageParam), enabled: !!currgen,
    //     initialPageParam: 1,
    //     getNextPageParam: (lastpage) => {
    //         if (lastpage?.data?.hasNextPage) { return lastpage?.data?.currentPage + 1 }
    //         else return undefined
    //     },
    // })


    // // SETTING GENRE ANIMES STATE //
    useEffect(() => {
        if (!isLoading && name[1].split('/')[0] === "genre") {
            let animes = data?.pages.map(pageAnimes => pageAnimes.data).flat()
            setGenre([...animes])
        }
        return () => { setGenre([]) }
    }, [data, currgen])


    // SCROLL END FUNCTION //
    const scrollFunction = (e) => {
        if (body) {
            if (name[1].split('/')[0] === "genre" && window.scrollY + window.innerHeight + 150 >= body.scrollHeight) {
                fetchNextPage();
            }
        }
    }


    // INFINITE SCROLL //
    useEffect(() => {
        try {
            if (name[1].split('/')[0] === "genre" && body) {
                document.addEventListener('scroll', scrollFunction)
            }
        }
        catch (err) {
            console.log(err)
        }
        return () => {
            window.removeEventListener("scroll", scrollFunction)
        }
    }, [name[1]])


    // LOADING COVERS //
    useEffect(() => {
        if (isLoading) {
            for (let i = 0; i <= 35; i++) {
                let LoadingDiv = document.createElement("div")
                LoadingDiv.className = 'loadingCover';
                let home = document.getElementsByClassName('Loading-List')[0]
                home && home.prepend(LoadingDiv)
            }
        }
        return () => { }
    }, [isLoading, currgen])


    return (
        <>
            <ListLayout Animes={Genre} heading={currgen} />
            {modalstate &&<Modal id={infoid}/>}
        </>
    )
}









{/* <div className="Search-container" >

                <div className='CName'>
                    <h2>{currgen.slice(0, 1).toUpperCase() + currgen.slice(1)}</h2>
                </div>

                <div className='Result'>
                    {!Genreloading
                        ?
                        <List anime={Genre} page={currpage} height="57rem" loading={Genreloading} />
                        :
                        <div className="Loading-List"></div>
                    }

                </div>

            </div> */}






//Genre pages //
//    useEffect(()=>{
//     if(!Genreloading&&name[1].split('/')[0]==="genre"){
//       let fetchedGenreName = Genreli?.pages[0]?.data?.genreName
//       let animes = Genreli?.pages.map((page)=> Object.entries(page?.data)?.filter(anime =>  anime[0]==="animes")[0][1]).flat()
//          setGenre([...animes])
//       }
//       return()=>{setGenre([])}
//    },[Genreloading,Genreli,currgen])


//Search Pages//
//    useEffect(()=>{
//       if(name[1]==="Search"&&keyword.length>0&&!Searchloading){
//       let animes = Searchre?.pages.map((page)=> Object.entries(page?.data).filter(anime =>  anime[0]==="animes")[0][1]).flat()
//       setSearch([...animes])
//    }
//    return()=>{setSearch([])}
//    },[Searchloading,Searchre,keyword])

