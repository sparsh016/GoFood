import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';



function isInteger(str) {
  const num = Number(str);
  return Number.isInteger(num) && !isNaN(num);
}


export default function AddNewFood() {
  const [check,setCheck]=useState(0);
  const [numOfSizes, setNumOfSizes] = useState(0);
  const [foodData, setFoodData] = useState({ foodCategory: "", foodName: "",numOfSizes: numOfSizes, foodDescription: "",imgSrc:"" });
  const [deleteItemData,setDeleteItemData]=useState({foodCategory:"",foodName:""});
  const [sizeOptions,setSizeOptions]=useState({});
  const [inputs, setInputs] = useState({});
  const [keys,setKeys]=useState(0);
  const [checkLogin,setCheckLogin]=useState(0);
  const [email,setEmail]=useState('');
  //const email=JSON.parse(localStorage.getItem("userData")).email;
  const [checkDelete,setCheckDelete]=useState(0);
  const handleOnChange = (event) => {
    setFoodData({ ...foodData, [event.target.name]: event.target.value });
  }

  const handleOnChangeDelete=(event)=>{
    setDeleteItemData({...deleteItemData, [event.target.name]:event.target.value});
  }

  let navigate=useNavigate();

  const handleFinalSubmit=async(e)=>{
    e.preventDefault();
    if(!localStorage.getItem("authToken")){
      setCheckLogin(1);
      return;
    }
    //const email=JSON.parse(localStorage.getItem("userData")).email;
    setEmail(JSON.parse(localStorage.getItem("userData")).email);
    const response=await fetch("http://localhost:4000/api/addnewfood",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({foodCategory: foodData.foodCategory, foodName: foodData.foodName,numOfSizeOptions: 
      foodData.numOfSizes,foodDescription:foodData.foodDescription,sizeOptions:sizeOptions,imgSrc:foodData.imgSrc,
      email: email,
    })
    })
    const json=await response.json()
    console.log(json);
    if(!json.success){
      alert(json.msg);
    }


    
    else if(json.success){
      alert(json.msg);
      navigate("/addnewfood");
    }
  };

  const handleFinalDeleteItem=async(e)=>{
    e.preventDefault();
    //console.log(deleteItemData.foodCategory,deleteItemData.foodName,email);
    if(!localStorage.getItem("authToken")){
      setCheckLogin(1);
      return;
    }
    setEmail(JSON.parse(localStorage.getItem("userData")).email);
    const response=await fetch("http://localhost:4000/api/deleteItem",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({foodCategory: deleteItemData.foodCategory, foodName: deleteItemData.foodName, email: email,
    })
    })
    const json=await response.json()
    console.log(json);
    if(!json.success){
      alert(json.msg);
    }
    else if(json.success){
      alert(json.msg);
      navigate("/addnewfood");
    }
  };
    

let changeCheck=(e)=>{
    e.preventDefault();
        setCheck(1);
    }

    const handleInputChange = (index, event) => {
      let { name, value } = event.target;
      console.log(name,typeof value);
      if(name=="key"&&isInteger(value)){
        value="";
        alert("Size cannot be any number");
      }
      else if(name=="value"&&!isInteger(value)){
        value="";
        alert("Price will always be a number");
      }
      setInputs((prevInputs) => ({
        ...prevInputs,
        [`${name}${index + 1}`]: value,
      }))};

    const handleSubmit = (e) => {
      e.preventDefault();
      Array.from({ length: numOfSizes }).map(async(_, index) => {
        if(inputs[`key${index + 1}`]==""||inputs[`key${index + 1}`]==undefined){
          
        }
        else if(inputs[`value${index + 1}`]==""||inputs[`value${index + 1}`]==undefined){
          
        }
        else{
        setSizeOptions((prevState)=>({
          ...prevState,[inputs[`key${index + 1}`]]:inputs[`value${index + 1}`]
        }))
      }    
    })
    setKeys(Object.keys(sizeOptions).length);
    };

    useEffect(() => {
      console.log(sizeOptions);
    }, [sizeOptions]);


  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputCategory" className="form-label">Food Category</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name='foodCategory' value={foodData.foodCategory}
            aria-describedby="emailHelp" placeholder='eg. fruit' onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Food Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name='foodName' value={foodData.foodName}
            aria-describedby="emailHelp" placeholder='eg. mango' onChange={handleOnChange} />
        </div>
        <div className="" style={{margin:"0px"}}>
          <label htmlFor="exampleInputEmail1" className="form-label">How many food sizes are there: </label>
          <input type="text" className="form-control" style={{ display: 'inline-block', width: "100px", margin: "10px" }}
            name='numOfSizes' value={numOfSizes} onChange={(e) => {
              let nNum = parseInt(e.target.value, 10);
              setCheck(0);
              handleOnChange(e);
              setNumOfSizes(nNum);
            }}
            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='eg. 3' />
            <button className='bg-primary' onClick={changeCheck}>sizeOptions</button>
        </div>
        {
           check?(<>
           <div style={{ display: 'inline-block', margin: "10px", marginRight:"30px",width: "150px" }}>Enter Size </div>Price<div></div>
           <div> </div>
           {
            Array.from({ length: numOfSizes }).map((_, index) => (
              <div key={index}>
                <input type='text' className={`sizeClass${index + 1}`} style={{ display: 'inline-block', margin:"10px", width: "150px" }} name='key' placeholder={`Size ${index + 1}`} onChange={(event) => handleInputChange(index, event)}/>
                <input type='text' className={`priceClass${index + 1}`} style={{ display: 'inline-block', width: "75px" }} name='value' placeholder={`Price ${index + 1}`} onChange={(event) => handleInputChange(index, event)}/><br />
              </div>
            ))}
            <button style={{marginLeft:"12px"}} onClick={handleSubmit}>Submit</button>
            </>)
          :(
            <div>First Enter a valid number of size options</div>
          )
        
        }

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" style={{marginTop:"30px"}} className="form-label">Add Image</label>
          <input type="text" className="form-control" name='imgSrc' value={foodData.imgSrc}
            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='insert image url' onChange={handleOnChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">About Food</label>
          <input type="text" className="form-control" name='foodDescription' value={foodData.foodDescription}
            id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder='eg. Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added.' 
            onChange={handleOnChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-success" onClick={handleFinalSubmit}>Submit</button>
        <Link className="text-danger m-3" onClick={()=>{setCheckDelete(1)}}>Click here to delete an item</Link>
        {checkLogin?
        <div className='text-danger fs-5' 
        style={{fontFamily:'monospace', marginTop:"0px"}}>
          user must logged in to add item
        </div>:""}
      </form>
      {
        checkDelete
        ?
        <>
        <form style={{margin:"50px 30px 5px 20px"}}>
          <div className='text-center fs-3 bg-secondary'>Delete Items</div>
          <ol className='m-3' style={{fontSize:"16px",fontWeight:"bold"}}>
            <li>Only Logged in users can Delete items</li>
            <li>A user can only delete his contributions</li>
            <li>Food Name is case sensitive</li>
          </ol>
        <div className="mb-3">
          <label htmlFor="exampleInputCategory" className="form-label">Food Category of Deleting Item</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name='foodCategory' value={deleteItemData.foodCategory}

            aria-describedby="emailHelp" placeholder='eg. fruit' onChange={handleOnChangeDelete} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Food Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name='foodName' value={deleteItemData.foodName}
            aria-describedby="emailHelp" placeholder='eg. mango' onChange={handleOnChangeDelete} />
        </div>
        <button type="submit" className="btn btn-danger" onClick={handleFinalDeleteItem}>Delete</button>
        {checkLogin?
        <div className='text-danger fs-5' 
        style={{fontFamily:'monospace', marginTop:"0px"}}>
          user must logged in to add item
        </div>:""}
        </form>
        {/* <div style={{heigth:"500px"}}></div> */}
        </>
        :""
      }
    </div>
  )
}