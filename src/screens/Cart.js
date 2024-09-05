import React,{useEffect,useState} from 'react'
import { useCart,useDispatchCart } from '../components/ContextReducer'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash, faAngleDown } from '@fortawesome/free-solid-svg-icons';
export default function Cart() {
    const [TotalPrice,setTotalPrice]=useState(0);
    let allDispatchers=useDispatchCart();
    let dispatch=allDispatchers.dispatch;
    let allData=useCart();
    let data=allData.state;
    useEffect(() => {
        let amt = 0;
        data.forEach((it) => {
          amt += it.qty * it.sizeOptions[it.size]; // Assuming sizeOptions is an array of objects
        });
        setTotalPrice(amt);
      }, [data]);
    if(data.length==0){
        return (
          <>
        <div className="container-fluid  mt-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Cart</h5>
              </div>
              <div className="card-body cart">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img src="https://i.imgur.com/dCdflKN.png" width={130} height={130} className="img-fluid mb-4 mr-3" />
                  <h3><strong>Your Cart is Empty</strong></h3>
                  <h4>Add something to make me happy :)</h4>
                  <Link to="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
        )
      }
  return(
    <>
      <section className="h-100">
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-normal mb-0">Cart Items</h3>
          <div>
            <p className="mb-0">
              <span className="text-muted">Sort by:</span>{" "}
              <a href="#!" className="text-body">
                price <i className="fas fa-angle-down mt-1" />
              </a>
            </p>
          </div>
        </div>
        {data.map((ele,idx)=>
        <div className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src={ele.img}
                  className="img-fluid rounded-3"
                  alt="Cotton T-shirt"
                  style={{objectFit:"fill"}}
                />
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">{ele.name}</p>
                <p>
                  <span className="text-muted">Size: </span>{ele.size}<br></br>
                  <span className="text-muted">Quantity: </span>{ele.qty}
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mb-0">Rs.{ele.qty*ele.sizeOptions[ele.size]}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end removeCart"
              
              onClick={()=>dispatch({type:"REMOVE",index:idx})}>
                Remove
              </div> 
            </div>
          </div>
        </div>)}
        <div className="card mb-4">
          <div className="card-body p-4 d-flex flex-row">
            <div data-mdb-input-init="" className="form-outline flex-fill fs-3">
              TotalPrice: Rs.{TotalPrice}
            </div>
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-ripple-init=""
              className="btn btn-outline-warning btn-lg ms-3"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-ripple-init=""
              className="btn btn-warning btn-block btn-lg"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
