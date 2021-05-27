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
            videoId: '',
            api:apiKey,
            renderType: 'home'
        }
    }

    startVideo(video){
        let a;
    }

    getRelatedVideos = async () => {
        try {
            let {data} = await axios.get('http://127.0.0.1:8000/2ys9IS5r9yA')
            this.setState({allVideos: data})
            console.log(this.state.allVideos)
            console.log(`run out`);
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
                                <VideoPlayer/>
                            </div>
                        </div>
                        <div className="related-videos-container col-4">
                            <h1>related videos</h1>
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
                    <div className="row">
                        <div className = "col-8">
                            <VideoList startVideo = {this.startVideo} videos = {this.state.searchResults} />
                        </div>
                        <div className="related-videos-container col-4">
                            <h1>related videos</h1>
                        </div>
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
                            <VideoPlayer/>
                        </div>
                    </div>
                    <div className="related-videos-container col-4">
                        <h1>related videos</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;