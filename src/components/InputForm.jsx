import React from 'react'

function InputForm(props){
    

    return (
        <div className="input-container">
            <input type="text" id={props.id} name="first_name" required></input>
            <label htmlFor="fname" className="label">{props.placeholder}</label>
        </div>
    )
}


export default InputForm;