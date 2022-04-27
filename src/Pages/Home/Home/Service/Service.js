import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({service}) => {
    const {name,img,description,price,_id} =service;
    const navigate =useNavigate();
    const handelServicesDetail = () =>{
        navigate(`/service/${_id}`);
    }
    return (
        <div id='service' className='service-container'>
            <img className='w-100' src={img} alt="" />
            <h2>{name}</h2>
            <h3>Price :{price}</h3>
            <p><small>{description}</small></p>
            <button onClick={() =>handelServicesDetail()} className='btn btn-primary'>Book {name}</button>
        </div>
    );
};

export default Service;