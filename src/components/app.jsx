import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import './app.css';
import VideoPlayer from './VideoPlayer/videoPlayer';
import apiKey from '../api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVideos: [],
            videoId: '',
            api:apiKey
        }
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

    render() {
        return (
            <div className="container-fluid">
                <div className="search-header">
                    <SearchBar api={this.state.api}/>
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