import React from 'react';

function TagEntry(props) {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    value={props.id}
                    checked={props.selected}
                    onChange={props.onChange}
                />
                {props.tag}
            </label>
        </div>
    );
}

export default TagEntry;