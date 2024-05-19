import { useState, useEffect } from 'react';
import BookEntry from './BookEntry';
import swal from 'sweetalert';
function DisplayBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const token = localStorage.getItem('token id');

                const response = await fetch('/api/renderBooks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
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

    async function deleteBook(id) {
        console.log("Holaaa "+id);
        try {
            const token = localStorage.getItem('token id');
            
            const response = await fetch(`/api/deleteBook/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove the deleted book from the local state
                setBooks(books => books.filter(book => book.id_libro !== id));
            } else {
                console.error('Failed to delete book:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
    }

    async function editBook(id) {
        try {
            localStorage.setItem('tokenLibro', id);
        } catch (error) {
            //alert('Login failed: ' + error.message);
            swal({
                icon:"error", 
                title:'Login failed: ' + error.message
                });
            console.error('Login failed:', error);
        }
        window.location.href = '/editBookForm';
    }

    return (
        <div className="books-container">
            <h1 className="form-container" style = {{marginLeft: '35%'}}>Mi estantería</h1>
            <div className="books-list">
            {books.length === 0 ? (
                <div className="empty-list-container">
                    <img src="src/assets/logo.png" alt="Imagen default de logo" />
                    <h1 className="empty-list-title">No has subido ningún libro aún</h1>
                </div>
            ) : (
                books.map(bookItem => (
                    <BookEntry
                        key={bookItem.id_libro}
                        id={bookItem.id_libro}
                        titulo={bookItem.titulo}
                        autor={bookItem.autor}
                        isbn={bookItem.isbn}
                        descripcion={bookItem.descripcion}
                        coverimage={bookItem.coverimage} // Render the image from Base64 string
                        tags={bookItem.tagsarray}
                        onDelete={deleteBook}
                        onClick={editBook}
                    />
                ))
            )}
            </div>
        </div>
    );
}

export default DisplayBooks;
