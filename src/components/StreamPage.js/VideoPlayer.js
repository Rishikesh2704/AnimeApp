import { useEffect, useState } from "react";
import { useAnimestreamQuery } from "../../Redux/Fetchslice";
import { MediaPlayer, MediaProvider,Track} from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

export default function VideoPlayer(props) {
    const {id,epid,currserv} = props
    const [url, seturl] = useState([])
    const [Loading, setLoading] = useState(true)
    const [subtitlesrc, setsubtitlesrc] = useState("")
    
    
    const { data: eplink, isLoading: epLoading, error: epError } = useAnimestreamQuery({ 
         animeid: id,
         epid, 
         server: currserv.server, 
         type: currserv.type 
    })

    useEffect(() => {
        if (!epLoading&&eplink?.streamingLink) {
            let subtitle = eplink?.streamingLink?.tracks.find((track) => track.label === "English");
                seturl(eplink.streamingLink.link);
                setsubtitlesrc(subtitle?.file);
                setLoading(false);
            }
        return () => {
            seturl([])
        }
    }, [epid, id, eplink, currserv.server, currserv.type])
        
    if (Loading) {
        <div><h3>Loading...</h3></div>
    }

    return (
        <>
            {!Loading && url &&
                <>
                    <MediaPlayer 
                     className="player"
                     title={id} 
                     aspectRatio="16/9" 
                     src={url.file}
                     load="visible" 
                     preload='auto'
                     >
                        <MediaProvider >
                            <Track 
                                label="English"
                                kind="captions"
                                src={subtitlesrc}
                                default
                                key={subtitlesrc} 
                            />
                        </MediaProvider>

                        <PlyrLayout icons={plyrLayoutIcons} />

                    </MediaPlayer>

                </>
            }
        </>
    )
}
