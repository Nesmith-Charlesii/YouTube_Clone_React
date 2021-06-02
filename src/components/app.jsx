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
    // this function will generate a dynamic home page of random search results to get someone started after initial render
    componentDidMount() {
        this.genHomePage()
    }
    //this function will cause the app to redraw and update which video is playing
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

    //gets comments for a new video and adds them to state
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

    //makes call to youtube API for related video data and returns the results
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
    //adds search results to state and changes page draw type
    processSearch(searchResults) {
        this.setState({searchResults:searchResults.items, renderType: "search"})
    }
    //makes an empty search call to the api to generate a "homepage"
    genHomePage = async(searchTerm='') => {
        try{
            let {data} = await axios.get('https://www.googleapis.com/youtube/v3/search',{
                params:{
                    q:searchTerm, 
                    part:'snippet',
                    key:this.state.api,
                    maxResults: 50
                }

            })
            
            this.processSearch(data);
            
        }

        catch(e){

        }
    }

    render() {
        
        //checks the stateful variable renderType to see which child components it should load on page render
        if(this.state.renderType === 'video') {
            //this section will render if the video has comments associated with it
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
            //this section will render if there are no comments associated with the video
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
        //this is what renders for search results and the homepage
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
        //default page render which theoretically shouldn't be seen
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