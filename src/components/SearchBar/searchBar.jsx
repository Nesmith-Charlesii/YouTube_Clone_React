import React from 'react';
import useSearchForm from '../CustomHooks/customHooks';
//import axios from 'axios';
import './searchBar.css'


const SearchBar = () => {

    const Submittal = () => {
        alert(`Searching for ${inputs.search}`)
    }

    const {inputs, handleChange, handleSubmit} = useSearchForm(Submittal);

    return (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="form-group d-flex flex-row">
                    <input className="form-control form-rounded" type="text" name="search" onChange={handleChange} value={inputs.search} placeholder="Search..." />
                    <button className="mx-4" type="submit">Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;