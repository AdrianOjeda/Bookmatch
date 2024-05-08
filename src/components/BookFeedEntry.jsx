
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function BookFeedEntry(props){

  function handlePrestamo() {
    props.onClick(props.id);
  }
  function handlePropietario(){

    props.onClickPropietario(props.propietarioId);

  }

    return (

      <div >
            <div className="book-feed-container" >
                <img className = 'book-cover-container' src={`/uploads/${props.coverimage}`} alt={props.titulo} />
                <div className="book-info">
                    <h2>{props.titulo}</h2>
                    <p>Autor: {props.autor}</p>
                    <p>ISBN: {props.isbn}</p>
                    <p onClick = {handlePropietario} style={{cursor:"pointer"}}>Propietario: {props.propietario}</p>
                    <p>Descripcion: {props.descripcion}</p>
   
                    <p >Categorias: {props.tags.join(", ") }</p>

                    <button className = "boton-prestamo" onClick={handlePrestamo}  >Solicitar prestamo</button>
                </div>
                
            </div>
        </div>


      );



}


export default BookFeedEntry;