//import logo from './logo.svg';
import './App.css';
import HomeMain from './screens/HomeMain';
import Signup from './screens/Signup.js';
import Login from './screens/Login.js'
import { CartProvider } from './components/ContextReducer.js';
import Cart from './screens/Cart.js';
import AddNewFood from './screens/AddNewFood.js';
import DeleteItem from './screens/DeleteItem.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <CartProvider>
    <Router>
    <Routes>
    <Route exact path="/" element={<HomeMain/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path ="/signup" element={<Signup/>}/>
    <Route exact path ="/createuser" element={<Signup/>}/>
    <Route exact path ="/myCart" element={<Cart/>}/>
    <Route exact path ="/addnewfood" element={<AddNewFood/>}/>
    <Route exact path ="/deleteitem" element={<DeleteItem/>}/>
    </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;