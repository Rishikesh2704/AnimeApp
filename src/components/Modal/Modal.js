import { useState, useEffect, useRef} from 'react'
import { useAnimeinfoQuery, useEplistQuery } from '../../Redux/Fetchslice';
import EpisodeList from './EpisodeList';
import Info from './Info';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../../Redux/StateSlice';

export default function Modal(props) {
   const { id } = props
   const [Favorite,setFavorite] = useState("regular")
   const {infoid} = useSelector(id => id.states.infoid)
   
   const dispatch = useDispatch();
   const modalBox = useRef(null);
   
    const { data: aniinfo, isLoading, error } = useAnimeinfoQuery(id)
    const { data: eplist, isLoading: epLoading, error: epError } = useEplistQuery(id)
    
 
   
    
   useEffect(() => {

      let body = document.getElementsByTagName('body')[0]
      body.style.setProperty('--homescroll','hidden')

      let isFavorite = localStorage.getItem('Favorites')?.includes(infoid)
       isFavorite?setFavorite("solid"):setFavorite("regular")

      return ()=>{
         body.style.setProperty('--homescroll','scroll')
      }
    },[id]);

   


    const handlemodal = (e) => {                    //Modal Show or Hide
      if (e.target.classList == "Modal-bg") {
         let animation = [
            {
               transform:"translate(0,0rem)",
               opacity:1
            },
            {
               transform:"translate(0,-16rem)",
               opacity:0.3
            },
            {
               transform:"translate(0,-30rem)",
               opacity:0.1
            }
         ]

         modalBox.current.animate(animation,{duration:200,timing:"linear"})
         setTimeout(()=>{dispatch(setModalState(false))},190)
      }
   }

   
   return (
      <>
      <div className="Modal-bg" onClick={(e) => handlemodal(e)}>
         <div className="Modal-contentbox-main" ref={modalBox}>
            <div className="Modal-contentbox">
              
               <Info aniinfo={aniinfo} id={id} />

               <EpisodeList eplist={eplist} />

            </div> 
         </div>
      </div>
      </>
   )
}







