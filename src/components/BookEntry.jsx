
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
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              Titulo: {props.titulo} 
            </span>
            <span> Autor: {props.autor} </span>
            <span>ISBN: {props.isbn} </span>
            <span>Precio: {props.precio} </span>
          </dt>
          <button onClick={handleDeleteClick}>
                <DeleteIcon />
          </button>
          <button onClick={handleEditClick}>
                <EditIcon />
          </button>
        </div>
      );



}


export default BookEntry;
