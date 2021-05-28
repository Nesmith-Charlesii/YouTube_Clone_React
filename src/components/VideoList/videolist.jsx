function VideoList(props){

    function buildList(video){
        
        if(video.snippet != undefined){
        return(
            <table className='list-group-item'>
                <tbody>
                    <tr>
                        <td>
                            <a href='#' onClick={(e) => props.startVideo(e,video)}>
                                <img src={video.snippet.thumbnails.default.url} alt="video"  width="360" />
                            </a>
                        </td>
                        <td>
                            <h4>
                                Channel:{video.snippet.channelTitle}<br/>
                                Video Title: {video.snippet.title}
                            </h4>

                        </td>
                    </tr>
                </tbody>
            </table>
        )}

    }
    console.log("videolist check",props.videos)
return (
    <div className='list-group'>
        {props.videos.map(buildList)}
    </div>
    )
}

export default VideoList;