import { useEffect, useState } from "react";

function useFavorites() {
  const [favorites, setfavorites] = useState(() => {
    let stored = localStorage.getItem("Favorites")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('Favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (animeObj) => {
    setfavorites((fav) => [...fav, animeObj])
  }
  const deleteFavorite = (id) => {
    setfavorites((fav) => fav.filter((notFav) => notFav.animeid !== id))
  }



  return { addFavorite, deleteFavorite, favorites }
}

export default useFavorites




// let storedFavorite = JSON.parse(localStorage.getItem("Favorites")) || []
// if(storedFavorite===null){  storedFavorite = storedFavorite.push(favAnimeObj) }
// else{storedFavorite.push(favAnimeObj)}
// localStorage.setItem("Favorites",JSON.stringify(storedFavorite))
// console.log(JSON.parse(localStorage.getItem("Favorites")))

// let storedFavorite = JSON.parse(localStorage.getItem("Favorites")) || []
// let filteredFav = storedFavorite.filter((notFav)=> notFav.animeid !== id)
// localStorage.setItem("Favorites",JSON.stringify(filteredFav))