import React from 'react';


function TagEntry(props) {


    return (
        <div className="tag-container">
            <label className='tagText'>
                <input className='tagInput'
                    type="checkbox"
                    value={props.id}
                    checked={props.selected}
                    onChange={props.onChange}
                />
                <span className="checkmark"></span> 
                {props.tag}
            </label>
        </div>
    );
}

export default TagEntry;