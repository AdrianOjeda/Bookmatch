import {useState, useEffect} from 'react'
import BookEntry from './BookEntry'


function DisplayBooks(){
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        async function fetchBooks() {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('/api/renderBooks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });

                if (response.ok) {
                    const booksData = await response.json();
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
        console.log(id);
        try {
            const token = localStorage.getItem('token');
            
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

    async function editBook(id){
        try {
            
            localStorage.setItem('tokenLibro', id);
        } catch (error) {
            alert('Login failed: ' + error.message);
            console.error('Login failed:', error);
        }
        window.location.href = '/editBookForm';
        
    }
    return (
        <div className="books-container">
            <h1 className="form-container">Mis libros</h1>
            <div className="books-list">
                {books.map(bookItem => (
                    <BookEntry
                        key={bookItem.id_libro}
                        id = {bookItem.id_libro}
                        titulo={bookItem.titulo}
                        autor={bookItem.autor}
                        isbn={bookItem.isbn}
                        precio={bookItem.precio}
                        onDelete={deleteBook}
                        onClick = {editBook}
                    />
                ))}
            </div>
        </div>
    );

}


export default DisplayBooks;