import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Orders = () => {
    const [user] =useAuthState(auth);
    const [orders,setOrders]= useState([]);
    useEffect( () =>{
        const getOrders = async() =>{
            const email = user.email;
            const url = `http://localhost:5000/orders?email=${email}`;
            const {data} =await axios.get(url , {
                headers : {
                    authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setOrders(data);
        }
        getOrders();
    } ,[])
    return (
        <div>
            <h1>Order: {orders.length} </h1>
        </div>
    );
};

export default Orders;