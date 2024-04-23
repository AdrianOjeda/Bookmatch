import { useState, useEffect } from 'react';

function DisplayUsers(){
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
                console.error('Error fetching books:', error.message);
            }
        }

        fetchUsers();
    }, []);

    console.log(users);
    return (


        <div>
            <h1>hello</h1>
        </div>
    )

}


export default DisplayUsers;