import './App.css';
import React from 'react';
import Main_page from './components/Main/Main_page';
import Main_navbar from './components/Main/Main_navbar';
import StockPortal_navbar from './components/Stock_Portal/StockPortal_navbar';
import AccountPortal_navbar from './components/Account_Portal/AccountPortal_navbar';
import OwnerPortal_navbar from './components/Owner_Portal/OwnerPortal_navbar';
import DealerPortal_navbar from './components/Dealer_Portal/DealerPortal_navbar';
import LoggedinNavbar from './components/Main/LoggedinNavbar';
import Main_footer from './components/Genral/Main_footer';
import About_us from './components/Main/About_us';
import Contact_us from './components/Main/Contact_us';
import Pricing from './components/Main/Pricing';
import Login from './components/Main/Login';
import LoginSelection from './components/Main/LoginSelection';
import RegisterComp from './components/Main/RegisterComp';
import ChangePass from './components/Main/ChangePass'
import StockPortal_dashboard from './components/Stock_Portal/dashboard/StockPortal_dashboard';
import AccountingPortal_dashboard from './components/Account_Portal/AccountingPortal_dashboard';
import OwnerPortal_dashboard from './components/Owner_Portal/OwnerPortal_dashboard';
import DealerPortal_dashboard from './components/Dealer_Portal/DealerPortal_dashboard';
import { useDispatch } from 'react-redux';
import {useSelector } from "react-redux";
import { ViewActions } from './store/view-slice';

import StockPortal_items from './components/Stock_Portal/Items/StockPortal_items'
import StockPortal_sales from './components/Stock_Portal/Sales_orders/StockPortal_sales'
import StockPortal_purchase from './components/Stock_Portal/Purchase_orders/StockPortal_purchase'
import StockPortal_stockdetails from './components/Stock_Portal/Stock_Details/StockPortal_stockdetails'
import StockPortal_managequotations from './components/Stock_Portal/Manage_Quotations/StockPortal_managequotations'
import StockPortal_addnewcategory from './components/Stock_Portal/Add_NewCategory/StockPortal_addnewcategory'
import StockPortal_managewarehouses from './components/Stock_Portal/Manage_Warehouses/StockPortal_managewarehouses'

import{
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom"
function App() {
  const view_mainNavbar=useSelector((state)=>state.view.view_mainNavbar)
  const view_stockNavbar=useSelector((state)=>state.view.view_stockNavbar)
  const view_accountNavbar=useSelector((state)=>state.view.view_accountNavbar)
  const view_ownerNavbar=useSelector((state)=>state.view.view_ownerNavbar)
  const view_dealerNavbar=useSelector((state)=>state.view.view_dealerNavbar)
  const view_loggedInNavbar=useSelector((state)=>state.view.view_loggedInNavbar)
  
  // var audio=new Audio('click_sound.mp3');

  return (
    <div className="App">
        {/* {document.onclick=function(){audio.play()}} */}
   
          <Router>
           {view_mainNavbar && <Main_navbar/>}
            {view_stockNavbar && <StockPortal_navbar/>}
            {view_accountNavbar && <AccountPortal_navbar/>}
            {view_ownerNavbar && <OwnerPortal_navbar/>}
            {view_dealerNavbar && <DealerPortal_navbar/>}
            {view_loggedInNavbar && <LoggedinNavbar/>}

            <Routes>
            <Route path='/' element={<Main_page/>}/>
            <Route path='/pricing' element={<Pricing/>}/>
            <Route path='/Aboutus' element={<About_us/>}/>
            <Route path='/contactus' element={<Contact_us/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegisterComp/>}/>
            <Route path='/changepassword' element={<ChangePass/>}/>
            <Route path='/loginselection' element={<LoginSelection/>}/>
            <Route path='/stockportal' element={<StockPortal_dashboard/>}/>
            <Route path='/accountingportal' element={<AccountingPortal_dashboard/>}/>
            <Route path='/ownerportal' element={<OwnerPortal_dashboard/>}/>
            <Route path='/dealerportal' element={<DealerPortal_dashboard/>}/>

            <Route path='/stockportal/products' element={<StockPortal_items/>}/>
            <Route path='/stockportal/sales' element={<StockPortal_sales/>}/>
            <Route path='/stockportal/purchase' element={<StockPortal_purchase/>}/>
            <Route path='/stockportal/stockdetails' element={<StockPortal_stockdetails/>}/>
            <Route path='/stockportal/managequotations' element={<StockPortal_managequotations/>}/>
            <Route path='/stockportal/addnewcategory' element={<StockPortal_addnewcategory/>}/>
            <Route path='/stockportal/managewarehouses' element={<StockPortal_managewarehouses/>}/>
            </Routes>
            <Main_footer/>
          </Router>
    </div>
  );
}

export default App;
