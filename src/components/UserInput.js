import React from "react";
import { useState } from "react";
//import Button from "./Button";

function UserInput(props){
    const [username, changeUVal] = useState("");
    const handleUChange = (e) => {
        changeUVal(e.target.value)
    }
    const [pword, changePVal] = useState("")
    const handlePChange = (e) => {
        changePVal(e.target.value)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.clickEvent(username, pword)
    }
    return (
        <form  onSubmit={handleFormSubmit} className="roundedContainerNoHover">
            <div>
                <p>
                    Username:
                    <input 
                    value={username}
                    type="text"
                    id="username" 
                    onChange={handleUChange}
                    ></input>
                </p>
            </div>
            <div>
                <p>Password:
                    <input 
                    value={pword}
                    type="text" 
                    id="pword" 
                    onChange={handlePChange}
                    ></input>
                </p>
            </div>
            <div className="padded">
                <button id={props.btnTitle} type="submit">
                    {props.btnTitle}
                </button>
            </div>            
        </form>
    )
}

export default UserInput