import './videoList.css';
//this is used for drawing both search results and related videos
function VideoList(props){
    //sub function returns the HTML for the individual videos
    function buildList(video){
        
        let key = Math.random()
        //checks to see if we have all the information we need to render a video
        if(video.snippet !== undefined){
            //confirms that the video is in fact a video application doesn't support channels or playlists at this time
            if(video.id.kind ==="youtube#video"){
                return(
                    <div className="related-video-content" key={key}>
                        <div className="related-video-thumbnail">
                            <a href='/#' onClick={(e) => props.startVideo(e,video)}><img src={video.snippet.thumbnails.high.url} alt="video"  width="168" /></a>
                        </div>
                        <div className="related-video-content">
                            <p><b>{video.snippet.title}</b></p>
                            <p>{video.snippet.channelTitle}</p>
                        </div>
                    </div>
                )
            }
        }

    }
return (
    <>
        {props.videos.map(buildList)}
    </>
    )
}

export default VideoList;