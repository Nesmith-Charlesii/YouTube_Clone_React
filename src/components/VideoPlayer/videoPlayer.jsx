import React, {useState} from 'react';
import './videoPlayer.css';

const VideoPlayer = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [videoId, setVideoId] = useState(props.video)

    if(videoId === props.video){
        if (props.video === 'null'){
            return (
                <>
                <div className="video-info">
                    <p id="video-title">{props.videoTitle}</p>
                    <hr/>
                    <p>{props.videoDescription}</p>
                </div>
                <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
                </iframe>
                </>
            )
        }
        else{
            return (
                <>
                <div className="video-info">
                    <p id="video-title">{props.videoTitle}</p>
                    <hr/>
                    <p id="video-description">{props.videoDescription}</p>
                    <hr/>
                </div>
                <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
                </iframe>
                </>
            )
        }
    }
    else{
        setVideoId(props.video)
        return (
            <>
            <div className="video-info">
                <p id="video-title">{props.videoTitle}</p>
                <hr/>
                <p>{props.videoDescription}</p>
            </div>
            <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
            </iframe>
            </>
        )
    }
}

export default VideoPlayer;