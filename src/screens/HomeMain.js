import React, {useEffect,useState} from "react";
import Footer from "./Footer";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";
import Carousal1 from "../components/Carousal1";
export default function HomeMain() {
  const [search,setSearch]=useState('');
  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);

    const loadData=async()=>{
        let response=await fetch("http://localhost:4000/api/foodData",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            }
        });
        response=await response.json();
      setFoodCat(response[0]);
        setFoodItem(response[1]);
    }
    useEffect(()=>{
      loadData()
    },[])
  return (
    <div>

      {/* Implementing Navbar */}

    <div> <Navbar /> </div>

    {/* Implementing Carousel */}

    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{objectFit:"contain !important"}}
    >
      <div className="carousel-inner position-relative">
        <div className="carousel-item active">
          <img
            src="https://img.freepik.com/free-photo/table-full-food-including-vegetables-fruits_1340-26892.jpg"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1}}
            alt="..."
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search} onChange={(e)=>{
                let newSearch=[...search];
                newSearch=e.target.value;
                setSearch(newSearch);
              }}
            />
          </form>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2295&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1}}
            alt="..."
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search} onChange={(e)=>{
                let newSearch=[...search];
                newSearch=e.target.value;
                setSearch(newSearch);
              }}
            />
          </form>
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1}}
            alt="..."
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search} onChange={(e)=>{
                let newSearch=[...search];
                newSearch=e.target.value;
                setSearch(newSearch);
              }}
            />
          </form>
        </div>
        <div className="carousel-item">
          <img
            src="https://c7.alamy.com/comp/E989C1/homebaked-pepperoni-pizza-with-a-delicious-topping-of-salami-chilli-E989C1.jpg"
            className="d-block w-100"
            style={{ height: "500px",position:"relative",zIndex:1}}
            alt="..."
          />
          <form className="d-flex" style={{position:"relative",top:"-100px",zIndex:100,marginLeft:"250px", marginRight:"250px"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search} onChange={(e)=>{
                let newSearch=[...search];
                newSearch=e.target.value;
                setSearch(newSearch);
              }}
              />
          </form>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>



    {/* Printing card data:  */}

    <div className="container">{
      foodCat!=[]?
      foodCat.map((data)=>{
        return(
          <div className="row mb-3">
          <div key={data._id} className="fs-3 m-3">
            {data.CategoryName.toUpperCase()}
            </div>
            <hr/>
              {
                foodItem!=[]?
                  foodItem.filter((item)=>{ 
                    if(search!=='') return (item.CategoryName.toLowerCase()===data.CategoryName.toLowerCase())
                      &&(item.name.toLowerCase().includes(search.toLowerCase())
                    ||item.description.toLowerCase().includes(search.toLowerCase()))
                    return(item.CategoryName.toLowerCase()===data.CategoryName.toLowerCase())
                    })
                  .map((filterItems)=>{
                    return(
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Cards foodItem={filterItems}
                      options={filterItems.options}
                      ></Cards>
                      </div>
                    )
                  })
                :<div>No such data exists</div>
                
              }
            </div>
          )
      }):<div>**********</div>
      }
      
    </div>
    <Link className="nav-link active" aria-current="page" to="/addnewfood">
    <div className="fs-5 bg-success h-10 w-auto addNewItem" 
    style={{height:"120px",width:"150px", color:"black",
    position:"fixed",
    top:"650px",
    left:"1300px",
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:"75px", 
    zIndex:1000
    }}><div>Add</div>
    <div>NewItem</div>
    </div>
    </Link>
    <div> <Footer/> </div>
    </div>
  );
}