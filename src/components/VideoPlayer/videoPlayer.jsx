import React, {useState} from 'react';
import './videoPlayer.css';

const VideoPlayer = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [videoId, setVideoId] = useState(props.video)

    if(videoId === props.video){
        if (props.video === 'null'){
            return (
                <>
                <h1>{props.videoTitle}</h1>
                <h2>{props.videoDescription}</h2>
                <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
                </iframe>
                </>
            )
        }
        else{
            //put logic here for title/description
            return (
                <>
                <h1>{props.videoTitle}</h1>
                <h2>{props.videoDescription}</h2>
                <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
                </iframe>
                </>
            )
        }
    }
    else{
        setVideoId(props.video)
        //put logic here for title/description infromation is held
        return (
            <>
            <h1>{props.videoTitle}</h1>
            <h2>{props.videoDescription}</h2>
            <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
            </iframe>
            </>
        )
    }
}

export default VideoPlayer;