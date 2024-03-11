'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react"
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { API_URL } from "../../../config";


async function registerForEvent(data , event_id )  {
    console.log ( "data is ",  JSON.stringify(data)) ; 

    //const res = await fetch(`${API_URL}/api/events?populate=*`);
    const result = await  axios.post(`${API_URL}api/event-enrollments/`, {
           data  : {  full_name : data.full_name ,
                    email : data.email , 
                    contact_number : data.mobile , 
                    attendee_catagory : "general" , 
                    event_catagory : data.race_cat ,
                    gender : data.gender , 
                    address:  data.address ,
                    event_id : event_id
                 } 

        },   { headers: new Headers({'content-type': 'application/json'} ) }    
     ) ;
    console.log( "result is ", result ) ; 
    } 
    

 const Register = ({props}) => {
  const searchParams = useSearchParams()
 
  const event_id = searchParams.get('event_id') 
  const event_name = searchParams.get('event_name') 

  console.log ( "got Event as " + event_id  + "name is "  +event_name ) ; 

 const { register, handleSubmit, formState: { errors } } = useForm() ; 
  /*
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
        full_name: 'Enter full name',
        email: 'Enter email',
        address : 'Enter your address',
        mobile : 'Enter mobile number'
    },
  })    ;
  */ 
  const  handleRegistration = (data) => { console.log(data);
  console.log ( "going to call azios api now "); 
  registerForEvent(data , event_id )  ; 
  } 
  const handleError = (errors) => {console.log( "ërror here " + errors )};

  const registerOptions = {
    full_name: { required: "Full Name is required" },
    email: { required: "Email is required", 
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Invalid email address' },
    address : { required : "address is required"} }, 
    mobile : { required : "mobile number is required " , minLength : { value : 10 , message  : "mobile number must be 10 digits"}}   ,
    category  : { required : "race category is required"} , 
    gender : { required : "gender is required"} 
  };

  const [catagory, setRace] = useState("10k")
  const [gender, setGender] = useState("male")

  const onOptionChange = e => {
    console.log( "race option changed" )
    setRace(e.target.value)
  } 
  const onGenderChange = e =>{ 
    console.log ( "Gender option changed ")
    setGender(e.target.value) 
  }

  return (
 <>  


<div className="px-5 py-5"> 
<div>     
        <h1> <center> Registering for : {event_name}  </center></h1>
        </div>

      <form className="w-full max-w-lg" onSubmit={(e) => handleSubmit(handleRegistration, handleError)(e)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="full_name">
            Full Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="full_name"
            type="text"
            placeholder="Enter your full name"
            {...register('full_name', registerOptions.full_name)}
          />
          <small className="text-danger">
            {errors?.full_name && errors.full_name.message}
          </small>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="text"
            placeholder="Enter your Email"
            {...register('email', registerOptions.email)}
          />
          <small className="text-danger">
            {errors?.email && errors.email.message}
          </small>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mobile">
            Mobile
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="mobile"
            type="text"
            placeholder="Enter your mobile"
            {...register('mobile', registerOptions.mobile)}
          />
          <small className="text-danger">
            {errors?.mobile && errors.mobile.message}
          </small>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="gender"
            {...register('gender', registerOptions.gender)}
          >
            <option>Female</option>
            <option>Male</option>
          </select>
          <small className="text-danger">
            {errors?.gender && errors.gender.message}
          </small>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="address"
            type="text"
            placeholder="Enter your address"
            {...register('address', registerOptions.address)}
          />
          <small className="text-danger">
            {errors?.address && errors.address.message}
          </small>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="city"
            type="text"
            placeholder="City"
            {...register('city', registerOptions.city)}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
            Category
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="category"
              {...register('category', registerOptions.category)}>
              <option>21 KM</option>
              <option>10 KM</option>
              <option>5 KM</option>
            </select>
          </div>
        </div>
      </div>
    
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      
      <button
        type="submit"
        className="text-black  text-center me-2 mb-2"
      >
        Register
      </button>
      
    </form>


</div>
    

</>
  
  );
};
export default Register;