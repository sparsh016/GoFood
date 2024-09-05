import React,{useState} from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
export default function Cards(props) {
    let arr=[1,2,3,4,5,6];
    let allDispatchers=useDispatchCart();
    let dispatch=allDispatchers.dispatch;
    let allData=useCart();
    let data=allData.state;
    let options=props.options;
    let foodItem=props.foodItem;
    let priceOptions=Object.keys(options);  //inbuilt function of javascript that forms an array of keys
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState(priceOptions[0]);
    const [check,setCheck]=useState(1);
    const handleAddCart=async ()=>{
        if(localStorage.getItem("authToken")){
            let food=[];
            let idx=0;
            for(let cartItem of data){
                if(foodItem._id===cartItem.id){
                    food=cartItem;
                    break;
                }
                idx++;
            }
            if(food!=[]){
                if(food.size===size){
                    await dispatch({type:"REMOVE",index:idx});
                }
            }
            await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,sizeOptions:options,qty:qty,size:size,img:foodItem.img})
            console.log(data);
        }
        else{
            let nCheck=check;
            setCheck(-1*nCheck);
        }
    }
  return (
    <div style={{zIndex:1}}>
      <div>
      <div className='card mb-5'
        style={{width:"18rem"}}>
        <img src={foodItem.img} className='card-img-top' alt="..." style={{width:"286px",height:"190px",objectFit:"fill"}}/>
        <div className='card-body'>
            <h5 className='card-title'>{foodItem.name}</h5>
            <p className='card-text'>{foodItem.description}</p>
            <div className='container w-100'>
    <select className='m-2 h-100 bg-success rounded' onChange={(e)=>{setQty(e.target.value)}}>
{
    arr.map((val,i)=>{
        return(
            <option key={i} value={val}>{val}</option>
        )
})}
{/* Array.from(Array(6),(e,i)=>{
    return (
        <option key={i+1} value={i+1}>{i+1}</option>
    )
})} */}
    </select>

<select className='m-2 h-100 bg-success rounded' onChange={(e)=>{setSize(e.target.value)}}>
    {
        priceOptions.map((data)=>{
            return(
                <option key={data} value={data}>{data}</option>
            )
        })
    }
</select>

<div className='fs-5'>TotalPrice: Rs.{qty*options[size]}</div>
<hr></hr>
<button className='btn btn-warning' onClick={handleAddCart}>Add To Cart </button>
{check==-1?<div className='text-danger' style={{fontFamily:'cursive'}}>please login to Add item to Cart</div>:""}
    </div>
</div>
</div>
</div>
</div>
  )
}
