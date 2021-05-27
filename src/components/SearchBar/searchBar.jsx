import React from 'react';
import useSearchForm from '../CustomHooks/customHooks';
import axios from 'axios';
import './searchBar.css'


const SearchBar = (props) => {
    console.log(props)

    const Submittal = () => {
        alert(`Searching for ${inputs.search}`)
        getvideo(inputs.search, props)
    }
    const getvideo = async(searchTerm, props) => {
        try{
            let {data} = await axios.get('https://www.googleapis.com/youtube/v3/search',{
                params:{
                    q:searchTerm, 
                    part:'snippet',
                    key:props.api,
                    maxResults: 15
                }

            })
            console.log(props)
            props.processSearch(data);
            
        }

        catch(e){

        }
    }

    const {inputs, handleChange, handleSubmit} = useSearchForm(Submittal);

    return (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="form-group d-flex flex-row">
                    <input className="form-rounded" type="text" name="search" onChange={handleChange} value={inputs.search} placeholder="Search" />
                    <button className="mx-4" type="submit">Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;