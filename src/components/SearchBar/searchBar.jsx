import React, {useState} from 'react';


const SearchBar = (props) => {
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setInput({
            [event.targe.name]: event.target.value
        })
    }

    return (
        <form>
            <div className="form-group">
                <input className="form-control" type="text" name="input" id="input" onChange={(event) => handleChange(event)} value={input} placeholder="Search..." />
            </div>
        </form>
    )
}

export default SearchBar;