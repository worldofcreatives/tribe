import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from '../../redux/actions/users'; // You need to implement this action

const UsersChart = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(fetchAllUsers());
            if (response.ok) {
                setUsers(await response.json());
            } else {
                console.error("Failed to fetch users");
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Stage Name</th>
                    <th>Status</th>
                    <th>Profile</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.stage_name}</td>
                        <td>{user.status}</td>
                        <td><a href={user.profile_link}>View Profile</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersChart;
