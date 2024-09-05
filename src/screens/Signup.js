import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
export default function Signup() {
  let navigate=useNavigate();
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""});
  const [exists,setExists]=useState(0);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:4000/api/creatuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name: credentials.name, email: credentials.email,password: credentials.password, location: credentials.geolocation})
    });
    const json=await response.json()
    console.log(json);
    if(!json.success){
      if(json.exists===1){
        setExists(1);
      }
      else
      alert("Enter valid credentials");
    }
    else if(json.success){
      navigate("/");
    }
  }
  const handleChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
      <>
      <div className='m-3'>
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text" id="inputName"
        className="form-control" name='name' value={credentials.name} onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange}
      />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        name='password' value={credentials.password}
        id="exampleInputPassword1" onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputAddress" className="form-label">
        Address
      </label>
      <input
        type="text"
        className="form-control"
        name='geolocation' value={credentials.geolocation}
        id="exampleInputAddress" onChange={handleChange}
      />
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange}/>
      <label className="form-check-label" htmlFor="exampleCheck1">
        Check me out
      </label>
    </div>
    <button type="submit" className="btn btn-success">
      Submit
    </button>
    <Link to="/login" className='btn btn-danger' style={{marginLeft:"16px", marginBottom:"5px"}}>Already a user</Link>
    {
      exists==1?
      <div className='text-danger' style={{fontFamily:'monospace', marginTop:"0px"}}>Email is already in use</div>
      :""
    }
  </form>
  </div>
</>
  )
}