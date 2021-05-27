function VideoList(props){

    function buildList(video){
        return(
            <table>
                <tbody>
                    <tr>
                        <td>
                            <a href='#' onClick={(e) => props.startVideo(e,video)}>
                                <img src={video.snippet.thumbnails.default.url}/>
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
        )

    }
return (props.videos.map(buildList))
}

export default VideoList;