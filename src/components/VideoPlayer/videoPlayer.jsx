import React, {useState} /*{useState}*/ from 'react';
import './videoPlayer.css';

const VideoPlayer = () => {

    const [videoId, setVideoId] = useState('')
    
    return (
        <iframe title="view-player" id="ytplayer" type="text/html" 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
        frameborder="0">
        </iframe>
    )
}

export default VideoPlayer;