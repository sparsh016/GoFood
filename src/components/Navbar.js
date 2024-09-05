import React, {useEffect, useState} from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
import {Link,useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';

import Cart from '../screens/Cart';
export default function Navbar() {
    let navigate=useNavigate();
    let allDispatchers=useDispatchCart();
    let dispatchUserData=allDispatchers.dispatchUserData;
    let allData=useCart();
    let data=allData.state;
    let userData=allData.userData;
    let storedUserData = JSON.parse(localStorage.getItem("userData"));
    const [currLocation,setCurrLocation]=useState("fetching location...");
    const [latti,setLatti]=useState(0.0000000);
    const [longi,setLongi]=useState(0.0000000);
    const currentLocation=async(position)=>{
      console.log(position);
      await setLatti(position.coords.latitude);
      await setLongi(position.coords.longitude);
      console.log(latti,longi);
    };
 

    const loadData=async()=>{
      await navigator.geolocation.getCurrentPosition(currentLocation);
      let response=await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latti}&lon=${longi}&apiKey=9871ee1be62b4258a08a4ee1b069e4e3`,{
          method:"GET",
          headers:{
              'Content-Type':'application/json'
          }
      });
      response=await response.json();
      setCurrLocation((response.features[0]).properties.formatted);
  }

useEffect(()=>{
  loadData()
},[]);



  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    storedUserData={};
    dispatchUserData({type:"LOGOUT"});
    navigate("/")
     }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
    <div className="container-fluid">
      <Link className="navbar-brand fs-3 fw-bold decideFont" to="/">Go-Food</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
          {
            localStorage.getItem("authToken")
            ?<><ul className="navbar-nav me-auto">
            <li className="nav-item d-flex">
              <Link className="nav-link active d-flex align-items-center" aria-current="page" to="/">Home</Link>
              <Link className="nav-link active d-flex flex-column" aria-current="page" to="/">
              <i class="fa-solid fa-location-dot fs-4"></i>
              <b>{currLocation}</b>
              </Link>
            </li>
            </ul>
            <ul className="navbar-nav ">
            <li className="nav-item d-flex">
              <Link className="nav-link active d-flex align-items-center" aria-current="page" to="/myCart">
              <i className="fa-solid fa-cart-shopping fs-3"></i>
              <b style={{margin:"4px"}}>My Cart</b>
              <Badge pill bg="danger">{data.length}</Badge>
              </Link>
              <Link className="nav-link active d-flex align-items-center" to="#" onClick={handleLogout}>LogOut</Link>
              <Link className="nav-link active d-flex flex-column align-items-center" to="#" >
              <i className="fa-solid fa-user fs-3"></i>
              <b>{storedUserData.name}</b>
              </Link>
            </li>
            </ul></>
            :<><ul className="navbar-nav me-auto">
            <li className="nav-item d-flex">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            </ul>
            <ul className="navbar-nav ">
          <li className="nav-item d-flex">
            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
            <Link className="nav-link active" to="/signup">Signup</Link>
          </li>
          </ul></>
          }
      </div>
    </div>
  </nav>
  )
}