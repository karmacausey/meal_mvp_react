import React from "react";
import IngredientItem from "./IngredientItem";

function RecipeItem(props){
    const handleClick = (e) => {        
        props.clickEvent(e.target.id)
    }

    let ingredientArr = props.elem.ingredient_list.split(',');    
    return (
        <div className="recipeDiv leftroundedContainer" id={props.elem.meal_id} onClick={handleClick}>
            <div className="leftimg"><img id={props.elem.id} src={props.elem.image_url} alt="..."/></div>
            <div className="horizontal"><h5 id={props.elem.id}>{props.elem.name}</h5>          
                {ingredientArr.map((elem, index) => {     
                    return (
                        <IngredientItem id={index + 1} elem={elem}/>
                    )                    
                })}                    
            </div>                        
        </div>
    )
}

export default RecipeItem