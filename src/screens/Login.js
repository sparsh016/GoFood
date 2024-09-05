import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatchCart,useCart } from '../components/ContextReducer';
export default function Login() {
    const [credentials,setcredentials]=useState({email:"",password:""});
    let navigate=useNavigate();
    let allDispatchers=useDispatchCart();
    let dispatchUserData=allDispatchers.dispatchUserData;
    let allData=useCart();
    let userData=allData.userData;
    useEffect(() => {
      console.log('User data changed:', userData);
  }, [userData]);
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const response=await fetch("http://localhost:4000/api/loginuser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email: credentials.email,password: credentials.password})
      });
      const json=await response.json()
      console.log(json);
      if(!json.success){
        alert(json.msg);
      }
      else if(json.success){
        localStorage.setItem("authToken",json.authToken);
        //console.log(localStorage.getItem("authToken"));
        localStorage.setItem("userData", JSON.stringify(json.userData));
        await dispatchUserData({type:"LOGIN", userData:json.userData});
        navigate("/");
      }
    }
    const handleChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <>
        <div>
    <form onSubmit={handleSubmit}>
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
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange}/>
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
      <Link to="/createuser" className='m-3 btn btn-danger'>Do Not Have Account</Link>
    </form>
    </div>
  </>
    )
}