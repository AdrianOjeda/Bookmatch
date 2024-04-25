import React, { useState } from 'react';

function InputForm(props) {
    const handleChange = (event) => {
        props.onChange(event.target.value);
        console.log(event.target.value);
    };

    return (
        <div className="input-container">
            <input
                type={props.type}
                id={props.id}
                className={props.className}
                name={props.name}
                value={props.value}
                onChange={handleChange}
                required
            ></input>
            <label htmlFor={props.id} className="label">
                {props.placeholder}
            </label>
        </div>
    );
}

export default InputForm;