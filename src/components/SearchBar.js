import React from "react";
import { useState } from "react";
//import SearchInput from "./SearchInput";

function SearchBar(props) {
    const [searchText, changeVal] = useState("")
    const handleChange = (e) => {
        changeVal(e.target.value)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.clickEvent(searchText);
    };

    return (
        <div className="searchBar roundedContainerNoHover">
            <form onSubmit={handleFormSubmit} >            
                Recipe Search:
                <input
                value={searchText}
                id="recipeSearch"
                type="text"
                onChange={handleChange}
                ></input>                
                <button id={props.btnTitle} type="submit">
                    {props.btnTitle}
                </button>                
            </form>
        </div>
    );
}

export default SearchBar;
