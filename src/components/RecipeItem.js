import React from "react";
import { useState } from "react";
import IngredientItem from "./IngredientItem";

function RecipeItem(props){
    const [recipeID] = useState(props.elem.recipe_id)
    const handleClick = (e) => {       
        console.log(recipeID) 
        props.clickEvent(recipeID)
    }

    let ingredientArr = props.elem.ingredient_list.split(',');    
    return (
        <div className="recipeDiv leftroundedContainer" onClick={handleClick}>                        
            <div className="leftimg"><img id={props.elem.id} src={props.elem.image_url} alt="..."/></div>
            <div className="horizontal"><h5 id={props.elem.id}>{props.elem.name}</h5>          
                {ingredientArr.map((elem, index) => {     
                    return (
                        <IngredientItem key={index} id={index + 1} elem={elem}/>
                    )                    
                })}                    
            </div>                        
        </div>
    )
}

export default RecipeItem