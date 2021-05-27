import React, {useState} from 'react';
import './videoPlayer.css';

const VideoPlayer = () => {

    // eslint-disable-next-line no-unused-vars
    const [videoId, setVideoId] = useState('44-Kx5ZZTsY')
    
    return (
        <iframe className="responsive-iframe" title="view-player" id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`} frameborder="0">
        </iframe>
    )
}

export default VideoPlayer;