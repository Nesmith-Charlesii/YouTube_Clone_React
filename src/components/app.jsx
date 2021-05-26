import React, {Component} from 'react';
import SearchBar from './SearchBar/searchBar';
import VideoPlayer from './VideoPlayer/videoPlayer';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: ''
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="search-header">
                    <SearchBar />
                </div>
                <div className="row">
                    <div className="col-8">
                        <VideoPlayer/>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        )
    }
}

export default App;