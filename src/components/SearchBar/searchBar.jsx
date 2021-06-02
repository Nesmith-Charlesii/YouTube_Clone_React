import React from 'react';
import useSearchForm from '../CustomHooks/customHooks';
import axios from 'axios';
import './searchBar.css'

//this generates the search bar and handles onSubmit behavior
const SearchBar = (props) => {
    

    const Submittal = () => {
        getvideo(inputs.search, props)
    }

    //api call to get the videos from a search
    const getvideo = async(searchTerm, props) => {
        try{
            let {data} = await axios.get('https://www.googleapis.com/youtube/v3/search',{
                params:{
                    q:searchTerm, 
                    part:'snippet',
                    key:props.api,
                    maxResults: 50
                }

            })
            
            props.processSearch(data);
            
        }

        catch(e){

        }
    }

    const {inputs, handleChange, handleSubmit} = useSearchForm(Submittal);

    return (
        <div className="form">
            <form onSubmit = {handleSubmit} >
                <div className="form-group d-flex flex-row">
                    <input className="form-rounded" type="text" name="search" onChange={handleChange} value={inputs.search} placeholder="Search" spellcheck="false"/>
                    <button className="mx-3" type="submit"><i class="fas fa-search"></i></button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;