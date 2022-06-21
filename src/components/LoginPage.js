import React from "react";
import UserInput from "./UserInput";
import Button from "./Button";

function LoginPage(props) {
    return (
        <div className="mainDiv">
            <div className="centerDiv">
                <h1>Welcome to Meal MVP</h1>
            </div>
            <UserInput btnTitle={"Login"} clickEvent={props.clickEvent}/>
            <div className="bottomMiddleDiv">
                <Button btnTitle={"New User"} clickEvent={props.newUserClick} />
            </div>
        </div>
    )
}

export default LoginPage