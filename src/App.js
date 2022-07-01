import './App.css';
import React from 'react';
import Main_page from './components/Main_page';
import Main_navbar from './components/Main_navbar';
import StockPortal_navbar from './components/StockPortal_navbar';
import AccountPortal_navbar from './components/AccountPortal_navbar';
import OwnerPortal_navbar from './components/OwnerPortal_navbar';
import DealerPortal_navbar from './components/DealerPortal_navbar';
import Main_footer from './components/Main_footer';
import About_us from './components/About_us';
import Contact_us from './components/Contact_us';
import Pricing from './components/Pricing';
import Login from './components/Login';
import LoginSelection from './components/LoginSelection';
import RegisterComp from './components/RegisterComp';
import ChangePass from './components/ChangePass'
import StockPortal_dashboard from './components/StockPortal_dashboard';
import AccountingPortal_dashboard from './components/AccountingPortal_dashboard';
import OwnerPortal_dashboard from './components/OwnerPortal_dashboard';
import DealerPortal_dashboard from './components/DealerPortal_dashboard';
import { useDispatch } from 'react-redux';
import {useSelector } from "react-redux";
import { ViewActions } from './store/view-slice';

import{
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom"
function App() {
  const dispatch=useDispatch();
  
  const pageStarting=()=>{
   dispatch(ViewActions.do_view_main());
  }
  const view_mainNavbar=useSelector((state)=>state.view.view_mainNavbar)
  const view_stockNavbar=useSelector((state)=>state.view.view_stockNavbar)
  const view_accountNavbar=useSelector((state)=>state.view.view_accountNavbar)
  const view_ownerNavbar=useSelector((state)=>state.view.view_ownerNavbar)
  const view_dealerNavbar=useSelector((state)=>state.view.view_dealerNavbar)
  return (
    <div className="App">
          {pageStarting()}
          <Router>
           {view_mainNavbar && <Main_navbar/>}
            {view_stockNavbar && <StockPortal_navbar/>}
            {view_accountNavbar && <AccountPortal_navbar/>}
            {view_ownerNavbar && <OwnerPortal_navbar/>}
            {view_dealerNavbar && <DealerPortal_navbar/>}
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
            </Routes>
            <Main_footer/>
          </Router>
    </div>
  );
}

export default App;
