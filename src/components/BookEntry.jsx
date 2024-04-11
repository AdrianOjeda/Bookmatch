import react from 'react'

function BookEntry(props){
    return (
        <div className="form-container">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              Titulo: {props.titulo} 
            </span>
            <span> Autor: {props.autor} </span>
            <span>ISBN: {props.isbn} </span>
            <span>Precio: {props.precio} </span>
          </dt>
          
        </div>
      );



}


export default BookEntry;
