import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom'
const SignUp = (props) => {
    const [crediational, setCrediational]= useState({email:"", password:"", cpassword:"", name:""})
    const history = useNavigate();
    const handleSubmit =  async(e)=>{
        e.preventDefault();
            //API call
        const {name, email, password} = crediational;
        const response = await fetch(`${window.location.origin}/api/auth/createuser`, {
           
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
        "Content-Type": "application/json"     
        },
        body: JSON.stringify({email,password, name})
        });    
        const json = await response.json();
        console.log(json);
        if(json.success){
             localStorage.setItem('token', json.authtoken);
             history("/home");
             props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e)=>{                                     
        setCrediational({...crediational, [e.target.name]: e.target.value})
        }
  return (
    <div className='container mt-2'> 
     <h2>Create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name"  name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email"  name="email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default SignUp
