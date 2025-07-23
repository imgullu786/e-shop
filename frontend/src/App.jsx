import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import OurProducts from './pages/OurProducts.jsx'
import Product from './pages/Product.jsx'
import Orders from './pages/Orders.jsx'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Verify from './pages/Verify.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {!isLoginPage && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/our-products' element={<OurProducts />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      
      <Toaster />
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
