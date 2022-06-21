import React from "react";

function Button(props){
    return (
        <div>
            <button id={props.btnTitle} onClick={props.clickEvent}>
                {props.btnTitle}
            </button>
        </div>
    )
}

export default Button