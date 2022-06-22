import React from "react";
import SearchBar from "./SearchBar";
import RecipeItem from "./RecipeItem";

function SearchResultsPage(props){
    return (
        <div className="mainDiv">
            <div className="centerDiv"><h3>{props.username}'s search results</h3></div>
            <SearchBar clickEvent={props.clickEvent} btnTitle={"search"}/>
            <div className="pageList">
                {props.searchResults.map((elem, index) => {
                    console.log(elem.recipe_id)
                    return <RecipeItem elem={elem} clickEvent={props.clickItem} id={elem.recipe_id} key={index}/>                
                })}
            </div>
        </div>
    )
}

export default SearchResultsPage