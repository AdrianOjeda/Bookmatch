
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function BookEntry(props){

  function handleDeleteClick() {
    props.onDelete(props.id);
  }
  function handleEditClick(){

    props.onClick(props.id);

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
                
                  <DeleteIcon onClick={handleDeleteClick} />
                
                  <EditIcon onClick={handleEditClick}/>
                
                </div>
            </div>
        </div>


      );



}


export default BookEntry;
