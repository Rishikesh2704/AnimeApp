import { useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { setInfoid, setModalState } from '../../Redux/StateSlice'

const TopAnimesSection = memo((props) => {
   const dispatch = useDispatch();
   const { animes, heading, } = props
   const [ani, setani] = useState('today')

   const showinfo = (id) => {
      dispatch(setModalState(true))
      let modal = document.getElementsByClassName('Modal-contentbox')
      dispatch(setInfoid(id))
   }

   return (<>
      <div className='Top10'>
         <div className='Top10CName'  >
            <h2 id="Top10Tag">Top 10</h2>
            <ul id="top10">
               {Object.keys(animes).map((li, index) => (
                  <li
                     key={index}
                     id={`li${index}`}
                     style={{
                        textDecoration: ani === li ? "underline" : "none",
                        textUnderlineOffset: ani === li ? "0.75rem" : "none",
                        textDecorationThickness: ani === li ? "0.14rem" : "0.1",
                        textDecorationColor: ani === li ? " rgb(0, 255, 225)" : "white"
                     }
                     }
                     value={li} onClick={() => setani(li)}>{li}
                  </li>
               ))}
            </ul>
         </div>


         <div className='Result'>
            {Object.entries(animes).map((t, index) => {
               if (t[0] === ani) {
                  return (
                        <div className='Top10List' key={t[1]}>
                           {t[1].map((animes, index) => (
                              <div className="Topanime-container" key={animes.id} onClick={() => showinfo(animes.id)} /*ref={element}*/  >
                                 <h1 id="topNum">{animes.number}</h1>

                                 <div className='Topanimeimg-wrapper' >
                                    <img id="Topanimeimg" src={animes.poster} />
                                 </div>
                                 <div className="Topanimeinfo" >
                                    <h4 className="TopanimecoverName" >{animes.title}</h4>
                                    <span id="top10EpisodeType">
                                       <h5 id="top10Sub"><i className="fa-solid fa-closed-captioning"></i>{animes.tvInfo.sub}</h5>
                                       <h5 id="top10dub"><i className="fa-solid fa-microphone"></i>{animes.tvInfo.dub}</h5>
                                    </span>
                                 </div>
                              </div>
                           )
                           )
                           }
                        </div>
                  )
               }
            })}
         </div>
      </div>
   </>
   )
})

export default TopAnimesSection








