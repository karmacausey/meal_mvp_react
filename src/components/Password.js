import React from "react";
import { useState } from "react";

function Password(){
    const [pword, changePVal] = useState(null)
    const handlePChange = (e) => {
        changePVal(e.target.value)
    }
    return (
        <div>
            <p>
                Password:
                <input 
                value={pword}
                type="text" 
                id="pword" 
                onChange={handlePChange}
                ></input>
            </p>
        </div>
    )
}

export default Password