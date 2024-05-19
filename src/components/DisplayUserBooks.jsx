import { useState, useEffect } from 'react';
import BookUserEntry from './BookUserEntry';
import swal from 'sweetalert';
function DisplayUserBooks() {
    const [books, setBooks] = useState([]);
    const [userName, setName] = useState('');

    useEffect(() => {
        async function fetchBooks() {
            try {
                const token = localStorage.getItem('id propietario');
                console.log("Hola " +token);

                const response = await fetch(`/api/renderUserBooks/${token}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const booksData = await response.json();
                    console.log("Books data");
                    console.log(booksData);
                    setBooks(booksData);
                   
                } else {
                    console.error('Failed to fetch books:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching books:', error.message);
            }
        }

        fetchBooks();
        
        
    }, []);

    console.log(books);

    useEffect(() => {
        getProfileName();
    }, []);

    async function getProfileName() {
        try {
            const userId = localStorage.getItem("id propietario");
            console.log(userId);
            const response = await fetch(`/api/getUserName/${userId}`, {
                method: 'GET',
                
            });
            const data = await response.json();
            console.log(data.fullName);

            let fullName = data.fullName;
            let nameParts = fullName.split(" ");
            let firstName = nameParts[0];

            setName(firstName);
        } catch (err) {
            console.error(err);
        }
    }

    

    async function borrowRequest(idLibro, idUsuario){
        const idUserToken =  localStorage.getItem("token id");



        console.log("borrow clicked " + idLibro + " id usuario propietario" +idUsuario+ " mi Id "+ idUserToken);

        try {
            const loanRequest = await fetch(`/api/loanRequest/${idLibro}?idUsuario=${idUsuario}`,{
                method: 'POST',
                headers:{
                    'Authorization':`Bearer ${idUserToken}`
                }
            })

            if(loanRequest.ok){
                const responseJson = await loanRequest.json();
                alert(responseJson.message);
            }


        } catch (error) {
            //alert("No se pudo solicitar el prestamo")
            swal({icon:"error",title:"No se pudo solicitar el prestamo"})
        }
    }

    return (
        <div className="books-container">
            <h1 className="form-container" style = {{marginLeft: '35%'}}>Estantería de {userName}</h1>
            <div className="books-list">
            {books.length === 0 ? (
                <div className="empty-list-container">
                    <img src="src/assets/logo.png" alt="Imagen default de logo" />
                    <h1 className="empty-list-title">No tiene libros disponibles</h1>
                </div>
            ) : (
                books.map(bookItem => (
                    <BookUserEntry
                        key={bookItem.id_libro}
                        id={bookItem.id_libro}
                        idUsuario={bookItem.id}
                        titulo={bookItem.titulo}
                        autor={bookItem.autor}
                        isbn={bookItem.isbn}
                        descripcion={bookItem.descripcion}
                        coverimage={bookItem.coverimage} // Render the image from Base64 string
                        tags={bookItem.tagsarray}
                        onClick={borrowRequest}
                    />
                ))
            )}
            </div>
        </div>
    );
}

export default DisplayUserBooks;
