import React,{createContext,useContext,useReducer} from 'react'
const CartStateContext=createContext();
const CartDispatchContext=createContext();
const reducer=(state,action)=>{
    switch(action.type){
        case "ADD":
        return [...state,{id:action.id,name:action.name,sizeOptions: action.sizeOptions,qty:action.qty,size:action.size,img:action.img}]
        case "REMOVE":
            let newState=[...state];
            newState.splice(action.index,1);
            return newState;
        defalult: 
        console.log("Error in Reducer");
    }
}
const userDataReducer=(userData,action)=>{
    switch(action.type){
        case "LOGIN":
            //localStorage.setItem("userData", JSON.stringify(userData));
            return action.userData;
        case "LOGOUT":
            //localStorage.removeItem("userData");
            return {};
        default:
            return userData;
    }
}
export const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    const [userData,dispatchUserData]=useReducer(userDataReducer,{});
    return (
        <CartDispatchContext.Provider value={{dispatch,dispatchUserData}}>
            <CartStateContext.Provider value={{state,userData}}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
  )
}
export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);