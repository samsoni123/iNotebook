import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
const Login = (props) => {
   const [crediational, setCrediational]= useState({email:"", password:""})
   const history = useNavigate();
    const handleSubmit =  async(e)=>{
        e.preventDefault();
            //API call
        const response = await fetch(`${window.location.origin}/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
        "Content-Type": "application/json"     
        },
        body: JSON.stringify({email:crediational.email,password: crediational.password})
        });    
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save the auth and Redirect
            localStorage.setItem('token', json.authtoken);
            history("/home");
            props.showAlert("Login Successfully", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e)=>{                                     
        setCrediational({...crediational, [e.target.name]: e.target.value})
        }
  return (
    <div className='mt-3'>
        <h2>Login for iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" onChange={onChange} className="form-control" id="email" value={crediational.email} name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" onChange={onChange} className="form-control" value={crediational.password}  name="password" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login
