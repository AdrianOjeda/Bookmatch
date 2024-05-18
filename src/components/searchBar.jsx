import React, { useEffect } from 'react';
import InputForm from './InputForm';

function SearchBar({ onSearchKeyDown, onSearchChange }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                onSearchKeyDown(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSearchKeyDown]);

    const handleInputChange = (value) => {
        onSearchChange(value);
    };

    return (
        <div>
            <InputForm
                className="inputSearch"
                id="searchBar"
                name="text"
                type="text"
                onChange={handleInputChange} 
                required
            />
        </div>
    );
}

export default SearchBar;
