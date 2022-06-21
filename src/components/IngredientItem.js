import React from "react";

function IngredientItem(props){
    return (
        <p className="ingredient" id={props.id}>{props.id}: {props.elem}</p>    
    )
}

export default IngredientItem