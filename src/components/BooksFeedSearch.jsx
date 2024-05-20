import React, { useState, useEffect } from 'react';
import BookFeedEntry from './BookFeedEntry';
import '../styles/booksFeed.css'; // Import your CSS file for styling
import swal from 'sweetalert';

function BooksFeedSearch() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    

    async function perfilPropietario(idPropietario){
        console.log("Propietario "+idPropietario);
        localStorage.setItem('id propietario', idPropietario);

        window.location.href = "/userProfile.html";

    }
    async function fetchBooks() {
        const userId = localStorage.getItem("token id");
        const search = localStorage.getItem("valorDeBusqueda")
        
        try {
            const booksResponse = await fetch(`/api/feedBooksSearch/${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                },  
            })
            if (booksResponse.ok) {
                const { rowCount, booksJSON } = await booksResponse.json();
                setBooks(booksJSON);
                if (rowCount === 0) {
                    swal({
                        icon: "info",
                        title: "No se encontraron resultados",
                        buttons: {
                          redirect: {
                            text: "Ir a la página principal",
                            value: "redirect",
                          },
                        },
                      })
                      .then((value) => {
                        if (value === "redirect") {
                          window.location.href = "/feedreal"; 
                        }
                      });
                      
                }
            }
        } catch (error) {
            //alert("No se pudo cargar el feed")
            swal({
                icon:"error",
                title:"No se pudo cargar el feed"
            })
        }
    }

    async function solicitarPrestamo(idLibro, idUsuario){
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
                swal({
                    icon:"success",
                    title:`${responseJson.message}`});
            }


        } catch (error) {
            //alert("No se pudo solicitar el prestamo")
            swal({
                icon:"error",
                title:"No se pudo solicitar el prestamo"
            })
        }
        
    }

    return (
        <div className="books-feed-container">
            <h1 style={{fontFamily:"Arial, Helvetica, sans-serif", paddingLeft: '20px'}}>Resultados</h1>
            <div className="books-grid">
                {books.map(bookItem => (
                    <BookFeedEntry
                        key={bookItem.id_libro}
                        id={bookItem.id_libro}
                        titulo={bookItem.titulo}
                        autor={bookItem.autor}
                        isbn={bookItem.isbn}
                        propietario={bookItem.nombres}
                        propietarioId={bookItem.id}
                        descripcion={bookItem.descripcion}
                        coverimage={bookItem.coverimage}
                        tags={bookItem.tagsarray}
                        onClick={solicitarPrestamo}
                        onClickPropietario={perfilPropietario}
                    />
                ))}
            </div>
        </div>
    )
}

export default BooksFeedSearch;