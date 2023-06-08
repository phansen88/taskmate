import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;

const UserForm = () => {
    const { uid } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data using the UID
        const fetchUser = async () => {
            try {
                console.log(`${API_ENDPOINT}/api/users/${uid}`);
                const response = await fetch(`${API_ENDPOINT}/api/users/${uid}`, {
                    mode: 'cors',
                });
                const data = await response.json();

                // Check if data is an array and extract the user object
                const userObject = Array.isArray(data) ? data[0] : data;
                setUser(userObject);

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [uid]);

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log(user);
    return (
        <div className="grid grid-cols-2 gap-6">
            <div>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={user.first_name}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={user.last_name}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="active" className="block text-sm font-medium text-gray-700">
                        Active
                    </label>
                    <select
                        id="active"
                        name="active"
                        value={user.active}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={user.title}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={user.role}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div>
                <div className="mb-4">
                    <img src={user.photo} alt="User" className="h-64 w-64 object-cover" />
                </div>
                <div className="flex space-x-2">
                    <a href="#" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Upload</a>
                    <a href="#" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Delete</a>
                </div>
            </div>
        </div>
    );
};

export default UserForm;