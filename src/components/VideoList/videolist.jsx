import './videoList.css';

function VideoList(props){

    function buildList(video){
        
        let key = Math.random()
        if(video.snippet != undefined){
        return(
            <div className="related-video-content" key={key}>
                <div className="related-video-thumbnail">
                    <a href='/#' onClick={(e) => props.startVideo(e,video)}><img src={video.snippet.thumbnails.default.url} alt="video"  width="168" /></a>
                </div>
                <div className="related-video-content">
                    <p><b>{video.snippet.title}</b></p>
                    <p>{video.snippet.channelTitle}</p>
                </div>
            </div>
        )}

    }
    console.log("videolist check",props.videos)
return (
    <>
        {props.videos.map(buildList)}
    </>
    )
}

export default VideoList;