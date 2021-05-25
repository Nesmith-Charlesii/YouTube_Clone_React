import React from 'react';

const SearchBar = (props) => {
    return (
        <form>
            <div className="form-group">
                <input className="form-control" type="text" name="search" id="search" value={props.value}/>
            </div>
        </form>
    )
}

export default SearchBar;