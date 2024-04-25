import React from "react";
import InputForm from "./InputForm";
function SearchBar(){
    return <div>
        {/*<input type="text" placeholder="Buscar" name="text" className="inputSearch"/>    */}
        <InputForm className="inputSearch" 
            
            id="searchBar"
            name="text"
            type="text"
            /*value={formData.password}
            onChange={(value) => handleChange('password', value)}*/
        />
    </div>
    
}

export default SearchBar;