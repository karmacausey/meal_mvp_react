import React from "react";
import SearchBar from "./SearchBar";
import RecipeItem from "./RecipeItem";

function FavoritesPage(props){
    return (
        <div className="mainDiv">
            <div className="centerDiv"><h3>{props.username}'s favorite Meals</h3></div>
            <SearchBar clickEvent={props.clickEvent} btnTitle={"search"}/> 
            <div className="pageList">
                {props.favorites.map((elem) => {
                    return <RecipeItem elem={elem} clickItem={props.clickItem}/>
                })}
            </div>
        </div>
    )
}

export default FavoritesPage