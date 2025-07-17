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
