import React from "react";
import UserInput from "./UserInput";

function NewUserPage(props){
    return (
        <div className="mainDiv">
            <div className="centerDiv">
                <h1>Enter a Username and Password</h1>
            </div>
            <UserInput btnTitle={"Create User"} clickEvent={props.clickEvent}/>
        </div>
    )
}

export default NewUserPage