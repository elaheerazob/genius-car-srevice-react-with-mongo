import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const {serviceId} =useParams();
    const [service] =useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    const handelPlaceOrder = (e) =>{
        e.preventDefault();
        const order = {
            email : user.email,
            service: service.name,
            serviceId : serviceId,
            address: e.target.address.value,
            phone: e.target.number.value
        }
        axios.post('http://localhost:5000/order',order)
        .then(res =>{
            const {data} =res;
            if(data.insertedId){
                toast('Your order Is booked!!!');
                e.target.reset()
          
            }
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order : {service.name}</h2>
            <form onSubmit={handelPlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={user?.email} name='email' placeholder='Email' required  disabled/>
                <br />
                <input className='w-100 mb-2' type="text"  name='service' value={service?.name} placeholder='name' required readOnly />
                <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Address' required />
                <br />
                <input className='w-100 mb-2' type="text" name='number' placeholder='Phone' required />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Checkout;