import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import './app.css';
import VideoPlayer from './VideoPlayer/videoPlayer';
import VideoList from './VideoList/videolist';
import apiKey from '../api';
import CommentSection from './CommentSection/commentSection'

class App extends Component {
    constructor(props) {
        super(props);
        this.startVideo = this.startVideo.bind(this)
        this.processSearch = this.processSearch.bind(this)
        this.getComments = this.getComments.bind(this)
        this.state = {
            videoTitle: '',
            videoDescription: '',
            searchResults:[],
            videoId: '44-Kx5ZZTsY',
            api:apiKey,
            renderType: 'home',
            comments:[]
        }
    }
    
    componentDidMount() {
        this.getComments()
    }

    async startVideo(event, video){
        if (video.id.kind === "youtube#video"){
            let comments = await this.getComments(video.id.videoId)
            let related = this.getRelatedVideos(video.id.videoId)
            this.setState({videoTitle:video.snippet.title, videoDescription: video.snippet.description, comments:comments})
        }
        else{
            console.log("please don't see me")
        }
        
    }

    async getComments(videoId){
        try{
            let comments= await axios.get('http://127.0.0.1:8000/'+videoId)
            comments = comments.data
            this.setState({
                comments: comments
            })
            console.log('get comments in app', comments)
            return(comments)
        }
        catch(e){
            console.log(e)
            this.setState({comments:"No Comments Yet"})

        }

    }

    async getRelatedVideos(videoId) {
        try {
            let {data} = await axios.get('https://www.googleapis.com/youtube/v3/search',{
                params:{
                    part:'snippet',
                    type:'video',
                    relatedToVideoId:videoId,
                    key:this.state.api,
                    maxResults: 15
                }

            })
            
            this.setState({
                searchResults:data.items,
                renderType:'video',
                videoId:videoId
            })
            

            return (data);
        }
        catch(ex) {
            alert(`Whoops! ${ex} Looks like we're having some technical difficulties. Try again later`)
        }
    }

    processSearch(searchResults) {
        this.setState({searchResults:searchResults.items, renderType: "search"})
    }

    render() {
        

        if(this.state.renderType === 'video') {
            if (this.state.comments.length>0){
                return (
                    <div className="container-fluid">
                        <div className="search-header">
                            <SearchBar api={this.state.api} processSearch= {this.processSearch} />
                        </div>
                        <div className="row">
                            <div className = "col-8">
                                <div className="video-player-container">
                                    <VideoPlayer video={this.state.videoId} videoTitle={this.state.videoTitle} videoDescription={this.state.videoDescription} />
                                    
                                    <CommentSection videoId = {this.state.videoId} comments={this.state.comments} getComments={this.getComments} />
                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="related-videos-container col-3">
                                <VideoList startVideo = {this.startVideo} videos = {this.state.searchResults} />
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div className="container-fluid">
                        <div className="search-header">
                            <SearchBar api={this.state.api} processSearch= {this.processSearch} />
                        </div>
                        <div className="row">
                            <div className = "col-8">
                                <div className="video-player-container">
                                    <VideoPlayer video={this.state.videoId} videoTitle={this.state.videoTitle} videoDescription={this.state.videoDescription} />
                                    
                                    <CommentSection videoId = {this.state.videoId} comments="No Comments Yet" getComments={this.getComments}/>
                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="related-videos-container col-3">
                                <VideoList startVideo = {this.startVideo} videos = {this.state.searchResults} />
                            </div>
                        </div>
                    </div>
                )
            }
        }
        else if(this.state.renderType === 'search') {
            return (
                <div className="container-fluid">
                    <div className="search-header">
                        <SearchBar api={this.state.api} processSearch= {this.processSearch} />
                    </div>
                    <div className="search-list-wrapper">
                        <VideoList startVideo = {this.startVideo} videos = {this.state.searchResults} />
                    </div>
                </div>
            )
        }
        return (
            <div className="container-fluid">
                <div className="search-header">
                    <SearchBar api={this.state.api} processSearch= {this.processSearch} />
                </div>
                <div className="row">
                    <div className = "col-8">
                        <div className="video-player-container">
                            <VideoPlayer video={this.state.videoId}/>
                        </div>
                    </div>
                    <div className="related-videos-container col-4">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default App;