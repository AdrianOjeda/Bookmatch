import React, { useState, useEffect } from 'react';
import BookFeedEntry from './BookFeedEntry';
import '../styles/booksFeed.css'; // Import your CSS file for styling

function BooksFeed() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {
        const userId = localStorage.getItem("token id");
        try {
            const booksResponse = await fetch('/api/feedBooks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                }
            })
            if (booksResponse.ok) {
                const booksData = await booksResponse.json();
                setBooks(booksData);
            }
        } catch (error) {
            alert("No se pudo cargar el feed")
        }
    }

    return (
        <div className="books-feed-container">
            <h1>Hola Mundo</h1>
            <div className="books-grid">
                {books.map(bookItem => (
                    <BookFeedEntry
                        key={bookItem.id_libro}
                        id={bookItem.id_libro}
                        titulo={bookItem.titulo}
                        autor={bookItem.autor}
                        isbn={bookItem.isbn}
                        propietario={bookItem.nombres}
                        descripcion={bookItem.descripcion}
                        coverimage={bookItem.coverimage}
                        tags={bookItem.tagsarray}
                    />
                ))}
            </div>
        </div>
    )
}

export default BooksFeed;