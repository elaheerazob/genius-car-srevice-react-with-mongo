import React from "react";
import { useForm } from "react-hook-form";

const Addservice = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url =`http://localhost:5000/service`;
    fetch(url,{
        method:'POST',
        headers :{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res =>res.json())
    .then(result =>{
    console.log(result);
    })
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please add Service</h2>
      <form className="d-flex flex-column " onSubmit={handleSubmit(onSubmit)}>
        <input className="mb-2" placeholder="Name" {...register("name")} />
        <textarea className="mb-2" placeholder="Description" {...register("description")} />
        <input className="mb-2" placeholder="Number" type="number" {...register("price")} />
        <input className="mb-2" placeholder="Image URL" type="text" {...register("img")} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Addservice;
