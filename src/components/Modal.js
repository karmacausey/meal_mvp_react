import React from "react";


function Modal(props){
    return (
        <div id="myModal" className="modal">        
            <div className="modal-content">          
            <p id="modalText">{props.text}</p>
            </div>      
        </div>
    )
}

export default Modal