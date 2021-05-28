import './videoList.css';

function VideoList(props){

    function buildList(video){
        
        if(video.snippet != undefined){
        return(
            <div className="related-video-content">
                <div className="related-video-thumbnail">
                    <a href='#' onClick={(e) => props.startVideo(e,video)}><img src={video.snippet.thumbnails.default.url} alt="video"  width="168" /></a>
                </div>
                <div className="related-video-content">
                    Channel:{video.snippet.channelTitle}<br/>
                    Video Title: {video.snippet.title}
                </div>
            </div>
            // <table className='list-group-item'>
            //     <tbody>
            //         <tr>
            //             <td>
            //                 <a href='#' onClick={(e) => props.startVideo(e,video)}>
            //                     <img src={video.snippet.thumbnails.default.url} alt="video"  width="360" />
            //                 </a>
            //             </td>
            //             <td>
            //                 <h4>
            //                     Channel:{video.snippet.channelTitle}<br/>
            //                     Video Title: {video.snippet.title}
            //                 </h4>

            //             </td>
            //         </tr>
            //     </tbody>
            // </table>
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