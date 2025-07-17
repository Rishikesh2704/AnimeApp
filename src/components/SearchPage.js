import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from './Modal/Modal'
import { useAnimesearchInfiniteQuery } from '../Redux/Fetchslice';
import ListLayout from './ListLayout';
import { useSelector } from 'react-redux';

export default function SearchPage() {
    const { keyword, modalState, infoid } = useSelector(state => state.states)
    const [Search, setSearch] = useState([])
    const location = useLocation()
    const body = document.getElementsByTagName('body')[0]
    const navigate = useNavigate()

    let name = location.pathname.split("/")
    let currgen
    name[1] = location.pathname.slice(1)
    currgen = name[1].split('/')[1]
    
    const {data, isLoading, fetchNextPage} = useAnimesearchInfiniteQuery(keyword)
 
    // SCROLL END FUNCTION //
    const scrollFunction = () => {
        if (name[1].split('/')[0] === "Search" &&body && window.scrollY + window.innerHeight + 150 >=body.scrollHeight) {
            fetchNextPage()
        }
    }

    // SETTING SEARCH ANIMES STATE //
    useEffect(() => {
        
        if (name[1] === "Search" && keyword.length > 0 && !isLoading) {
            let animes = data?.pages.map((page) => page.data).flat()  //No Page Parameter in th API for Search
            setSearch([...animes])
        }
        return () => { setSearch([]) }
    }, [isLoading, data, keyword])

    // INFINITE SCROLL //
    useEffect(() => {
        if(keyword===''){
            navigate('/Home')
        }
        if (name[1].split('/')[0] === "Search" &&body) {
            document.addEventListener('scroll', scrollFunction)
        }

        return () => {
            window.removeEventListener("scroll", scrollFunction)
        }
    }, [keyword])

    // LOADING COVERS //
    useEffect(() => {
        if (isLoading && keyword !== " ") {
            for (let i = 0; i <= 35; i++) {
                let LoadingDiv = document.createElement("div")
                LoadingDiv.className = 'loadingCover';
                let home = document.getElementsByClassName('Loading-List')[0]
                home && home.prepend(LoadingDiv)
            }
        }
        return () => { }
    }, [isLoading])


    return (
        <> 
            <ListLayout Animes={Search} heading="Search Results" />
            {modalState &&<Modal id={infoid}/>}
        </>
    )
}

