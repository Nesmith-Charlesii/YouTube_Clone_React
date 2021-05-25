import React, {Component} from 'react';
import SearchBar from './SearchBar/searchBar';
import 'bootstrap/dist/css/bootstrap.css';

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
            </div>
        )
    }
}

export default App;