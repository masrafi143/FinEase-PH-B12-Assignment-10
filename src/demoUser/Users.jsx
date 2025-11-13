import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const Users = () => {
    const initialUsers = use(usersPromise);
    // console.log(initialUsers);
    const [users, setUsers] = useState(initialUsers);
    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);

        const newUser = {name, email};
        // save this user data to the database (via server)
        fetch('https://finease-api-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res=> res.json())
        .then(data =>{
            console.log('after saving user ', data);
            if(data.insertedId){
                newUser._id = data.insertedId;
                const newUsers = [...users, newUser];
                setUsers(newUsers);
                toast('users added successfully');
                e.target.reset();
            }
        })        
    }
    const handleDeleteUser = (id) => {
        console.log('delete user', id);
        fetch(`https://finease-api-server.vercel.app/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log('after delete', data);
            if(data.deletedCount){
                toast('deleted successfully!');
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            }
        })
    }
    return (
        <div>
            <p>Users: {users.length}</p>
            <form onSubmit={handleAddUser}>
                <input name='name' type="text" placeholder='name'/> <br />
                <input name='email' type="email" placeholder='email'/> <br />
                <input type="submit" value="Add User" />
            </form>
            <div>
                {
                    users.map(user=> <p key={user._id}>{user.name} : {user.email}
                    <Link to={`/users/${user._id}`}>Details</Link>
                    <Link to={`/update/${user._id}`}>Edit</Link>
                    <button onClick={()=>handleDeleteUser(user._id)}>x</button>
                    </p>)
                }
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Users;