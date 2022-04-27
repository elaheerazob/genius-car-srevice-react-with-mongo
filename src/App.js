import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Addservice from './Addservice/Addservice';
import './App.css';
import ManageServices from './ManageServices/ManageServices';
import Orders from './Orders/Orders';
import About from './Pages/About/About';
import Checkout from './Pages/Checkout/Checkout/Checkout';
import Home from './Pages/Home/Home/Home';
import ServicesDetail from './Pages/Home/Home/ServicesDetail/ServicesDetail';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import NotFound from './Pages/NotFound/NotFound';

import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/service/:serviceId' element={<ServicesDetail></ServicesDetail>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/checkout/:serviceId' element={
          <RequireAuth>
            <Checkout></Checkout>
          </RequireAuth>
        }></Route>
        <Route path='/addservice' element={
          <RequireAuth>
            <Addservice></Addservice>
          </RequireAuth>
        }></Route>
        <Route path='/manage' element={
          <RequireAuth>
            <ManageServices></ManageServices>
          </RequireAuth>
        }></Route>
        <Route path='/orders' element={
          <RequireAuth>
            <Orders></Orders>
          </RequireAuth>
        }></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer/>
    </div>
  );
}

export default App;
