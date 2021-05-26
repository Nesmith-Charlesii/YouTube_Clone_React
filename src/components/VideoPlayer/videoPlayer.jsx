import React /*{useState}*/ from 'react';
import './videoPlayer.css';

const VideoPlayer = () => {

    //const [videoId, setVideoId] = useState('')
    
    return (
        <iframe title="view-player" id="ytplayer" type="text/html" 
        src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
        frameborder="0">
        </iframe>
    )
}

export default VideoPlayer;