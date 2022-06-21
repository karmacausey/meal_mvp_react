import React from "react";
import { useState } from "react";

function SearchInput(){
    const [searchText, changeVal] = useState(null)

    const handleChange = (e) => {
        changeVal(e.target.value)
    }
    return (
        <input 
        value={searchText}
        id="recipeSearch"
        type="text"
        onChange={handleChange}
        ></input>
    ) 
}

export default SearchInput