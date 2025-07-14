import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAnimeserversQuery } from "../../Redux/Fetchslice";;

export default function Servers(props) {
    const {currserv,setcurrserv,currep,epid,id} = props
    const [serverli, setserverli] = useState()
   
      
    const {data:serverlist,isLoading:servloading,error:servError} = useAnimeserversQuery({animeid:id,epid})
    
    useEffect(()=>{
      if(!servloading){
        setserverli(serverlist)
      }
      return(()=>{setserverli()})
    },[epid,id,serverlist])

    const changeServer = (newserver, type, e) => {
        let disabled = document.getElementsByClassName('btndisable');
        if (disabled.length !== 0) { disabled[0].classList.remove("btndisable") }

        let select = e.target;
        select.classList.add('btndisable')
        setcurrserv({ server: newserver, type: type })
    }

    return (
        <>

            <div className="Other-src">
                {currep !== "" && <div id="currep"><h4>{`Episode ${currep.episode_no}`}</h4></div>}
                <div className="Sub">
                    <h4>Sub :</h4>

                    {serverli && serverli.map((epsrc, index) => {
                        if(epsrc.type==="dub"){
                        return (<button className={`sub-ep ${currserv.server === epsrc.serverName && currserv.type == "sub" ? 'btndisable' : ''}`} onClick={(e) => changeServer(epsrc.serverName, "sub", e)}>{epsrc.serverName}</button>)
                    }}
                    )}
                </div>
                <hr></hr>
                <div className='Dub'>
                    <h4>Dub :</h4>
                    {serverli && serverli.map((epsrc) => {
                        if(epsrc.type==="dub"){

                            return (<button className={`dub-ep  ${currserv.server === epsrc.serverName && currserv.type == "dub" ? 'btndisable' : ''}`} onClick={(e) => changeServer(epsrc.serverName, "dub", e)}>{epsrc.serverName}</button>)
                        }
                    })
                    }
                </div>
            </div>
        </>
    )
}