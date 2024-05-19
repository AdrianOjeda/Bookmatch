import { useState, useEffect } from 'react';
import UsersValidationEntry from './UsersValidationEntry';
import swal from 'sweetalert';
function DisplayUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/getUsers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const usersData = await response.json();
                    setUsers(usersData);
                } else {
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        }

        fetchUsers();
    }, []);

    const fetchedUsers = Array.isArray(users.usersInfo) ? users.usersInfo : [];
    console.log(fetchedUsers);

    async function validateUser(id) {
        console.log("validate clicked");

        try {
           //not complete
           const response = await fetch(`/api/verifyUser/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            swal({icon:"success", title:"El usuario se valido con exito"})
            setUsers({
                ...users,
                usersInfo: fetchedUsers.filter(user => user.id !== id)
            });
        } else {
            console.error('No se pudo validar al usuario', response.statusText);
        }
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteUser(id) {
        console.log("del user clicked");
        try {
            const response = await fetch(`/api/verifyUser/deleteUser/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                swal({icon:"success", title:"Usuario rechazado con exito"})
                setUsers({
                    ...users,
                    usersInfo: fetchedUsers.filter(user => user.id !== id)
                });
            } else {
                console.error('No se pudo eliminar al usuario', response.statusText);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className='listContainer'>
            {fetchedUsers.length === 0 ? (
                <div className="empty-list-container">
                    <img src="src/assets/logo.png" alt="Imagen default de logo" />
                    <h1 className="empty-list-title">No hay usuarios para validar</h1>
                </div>
            ) : (
                fetchedUsers.map(usersItem => (
                    <UsersValidationEntry
                        key={usersItem.id}
                        id={usersItem.id}
                        nombres={usersItem.nombres}
                        apellidos={usersItem.apellidos}
                        codigo={usersItem.codigo}
                        correo={usersItem.correo}
                        credencial={usersItem.credencial}
                        onDelete={deleteUser}
                        onClick={validateUser}
                    />
                ))
)}
        </div>
    );
}

export default DisplayUsers;
