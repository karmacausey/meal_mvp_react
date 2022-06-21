import React from "react";
import { useState } from 'react';

function Username(){
    const [username, changeVal] = useState(null);
    const handleChange = (e) => {
        changeVal(e.target.value)
    }
    return (
        <div>
            <p>Username:
                <input 
                value={username}
                type="text"
                id="username" 
                onChange={handleChange}
                ></input>
            </p>
        </div>
    )
}

export default Username