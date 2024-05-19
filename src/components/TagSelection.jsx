import React, { useState, useEffect } from 'react';
import TagEntry from './TagEntry'; // Import the TagEntry component

function ParentComponent({ onSubmit }) {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        
        fetchTags();
    }, []);

    
    async function fetchTags() {
        try {
            const response = await fetch('/api/tags');
            if (response.ok) {
                const tagsData = await response.json();
                setTags(tagsData.tagsInfo);
            } else {
                console.error('Failed to fetch tags:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    }

   
    function handleCheckboxChange(tagId) {
        console.log('Tag ID:', tagId);
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tagId)) {
                
                const updatedTags = prevSelectedTags.filter(id => id !== tagId);
                console.log('Updated Tags (Removed):', updatedTags);
                return updatedTags;
            } else {
               
                const updatedTags = [...prevSelectedTags, tagId];
                console.log('Updated Tags (Added):', updatedTags);
                return updatedTags;
            }
        });
    }

    // Submit selected tags to backend
    function handleSubmit(event) {
        event.preventDefault();
        //alert( selectedTags);
        console.log(selectedTags);
        
        
    }
    

    return (
        <div>
            <h2 className='titulo'>Selecciona tus generos preferidos</h2>
            <div className='form-container'>
            
            <form onSubmit={handleSubmit} className = 'form-grid'>
                {tags.map(tag => (
                    <TagEntry
                        key={tag.idtag}
                        id = {tag.idtag}
                        tag={tag.tagname}
                        selected={selectedTags.includes(tag.idtag)}
                        onChange={() => handleCheckboxChange(tag.idtag)}
                    />
                ))}
                
            </form>
            
        </div>
        <div>
        <button type="button" className='submit-button' onClick={() => onSubmit(selectedTags)}>
                Aceptar
            </button>
        </div>
        
        </div>
        
    );
}

export default ParentComponent;