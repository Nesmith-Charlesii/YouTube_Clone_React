import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import './app.css';
import VideoPlayer from './VideoPlayer/videoPlayer';
import VideoList from './VideoList/videolist';
import apiKey from '../api';

class App extends Component {
    constructor(props) {
        super(props);
        this.startVideo = this.startVideo.bind(this)
        this.processSearch = this.processSearch.bind(this)
        this.state = {
            allVideos: [],
            searchResults:[],
            videoId: '44-Kx5ZZTsY',
            api:apiKey,
            renderType: 'home'
        }
    }

    startVideo(event, video){
        
        if (video.id.kind === "youtube#video"){
            let related = this.getRelatedVideos(video.id.videoId)
        }
        else{
            console.log("please don't see me")
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
            console.log('statecheck ',this.state.videoId);
            console.log("related",data);
            this.setState({
                searchResults:data.items,
                renderType:'video',
                videoId:videoId
            })
            console.log(this.state.videoId);

            return (data);
        }
        catch(ex) {
            alert(`Whoops! ${ex} Looks like we're having some technical difficulties. Try again later`)
        }
    }

    processSearch(searchResults) {
        console.log("searchResults", searchResults);
        this.setState({searchResults:searchResults.items, renderType: "search"})
    }

    render() {
        

        if(this.state.renderType === 'video') {
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
                        <div className="col-1"></div>
                        <div className="related-videos-container col-3">
                            <VideoList startVideo = {this.startVideo} videos = {this.state.searchResults} />
                        </div>
                    </div>
                </div>
            )
        } else if(this.state.renderType === 'search') {
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