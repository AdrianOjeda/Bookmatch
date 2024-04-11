import react, {useState, useEffect} from 'react'
import BookEntry from './BookEntry'

function DisplayBooks(){
    const [books, setBooks] = useState([]);

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
    return (
        <div>
            <h1 className='form-container'>Mis libros</h1>
        <div>
            {books.map(bookItem => (
          <BookEntry
            key={bookItem.id_libro}
            titulo={bookItem.titulo}
            autor={bookItem.autor}
            isbn={bookItem.isbn}
            precio ={bookItem.precio}
          />
        ))}
        </div>
        </div>
        

    );

}


export default DisplayBooks;