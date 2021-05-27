import React, {useState} from 'react';
import './videoPlayer.css';

const VideoPlayer = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [videoId, setVideoId] = useState(props.video)


    
    return (
        <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameBorder="0">
        </iframe>
    )
}

export default VideoPlayer;