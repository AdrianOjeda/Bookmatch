

function BookUserEntry(props){

  function handleDeleteClick() {
    props.onClick(props.id, props.idUsuario);
  }
  

    return (

      <div className="form-container">
            <div className="book-detail-container">
                <img className = 'book-cover-container' src={`/uploads/${props.coverimage}`} alt={props.titulo} />
                <div className="book-info">
                    <h2>{props.titulo}</h2>
                    <p>Autor: {props.autor}</p>
                    <p>ISBN: {props.isbn}</p>
                    <p>Descripcion: {props.descripcion}</p>
                    
   
                    <p >Categorias: {props.tags.join(", ") }</p>

                    
                  </div>
                  <div className="actions">
                  
                    <button onClick={handleDeleteClick} className="upload-button">Solicitar prestamo</button>
                  
                    
                  
                  </div>
              </div>
          </div>


        );



}


export default BookUserEntry;
