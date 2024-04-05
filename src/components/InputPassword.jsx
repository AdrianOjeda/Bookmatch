import React from 'react'

function InputPassword(props){

    return (
        
            <div className="input-container">
            <input type="password" id = {props.id} name="password" required></input>
            <label htmlFor="password" className="label">{props.placeholder}</label>
        </div>
    )
}



export default InputPassword