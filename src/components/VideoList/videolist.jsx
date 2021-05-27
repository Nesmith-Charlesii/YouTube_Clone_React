function VideoList(props){

    function buildList(video){
        
        if(video.snippet != undefined){
        return(
            <table>
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
                                description: {video.snippet.description}
                            </h4>

                        </td>
                    </tr>
                </tbody>
            </table>
        )}

    }
    console.log("videolist check",props.videos)
return (props.videos.map(buildList))
}

export default VideoList;