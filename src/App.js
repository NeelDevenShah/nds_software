import './App.css';
import React from 'react';
import Main_page from './components/Main/Main_page';
import Main_navbar from './components/Main/Main_navbar';
import StockPortal_navbar from './components/Stock_Portal/StockPortal_navbar';
import OwnerPortal_navbar from './components/Owner_Portal/OwnerPortal_navbar';
import LoggedinNavbar from './components/Main/LoggedinNavbar';
import Main_footer from './components/Genral/Main_footer';
import About_us from './components/Main/About_us';
import Contact_us from './components/Main/Contact_us';
import Pricing from './components/Main/Pricing';
import UserLogin from './components/Main/UserLogin';
import CmpLogin from './components/Main/CmpLogin'
import LoginSelection from './components/Main/LoginSelection';
import RegisterComp from './components/Main/RegisterComp';
import ChangeCmpPass from './components/Main/ChangeCmpPass'
import ChangePass from './components/Main/ChangePass'
import StockPortal_dashboard from './components/Stock_Portal/dashboard/StockPortal_dashboard';
import OwnerPortal_dashboard from './components/Owner_Portal/dashboard/OwnerPortal_dashboard';
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
import Context from './Context';

import OwnerPortal_checkSales from './components/Owner_Portal/Check Sales Order/OwnerPortal_checkSales'
import OwnerPortal_checkPurchase from './components/Owner_Portal/Check Purchase Order/OwnerPortal_checkPurchase'
import OwnerPortal_checkquotation from './components/Owner_Portal/Check Quotation/OwnerPortal_checkquotation'
import OwnerPortal_productAndCategories from './components/Owner_Portal/Product And Categories/OwnerPortal_productAndCategories'
import CompanyLogbook from './components/Owner_Portal/Logbook/CompanyLogbook'
import DispatchedArrivedOrders from './components/Owner_Portal/Dispatched_ArrivedOrder/DispatchedArrivedOrders'

import{
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom"
import { useState } from 'react';
function App() {
  const view_mainNavbar=useSelector((state)=>state.view.view_mainNavbar)
  const view_stockNavbar=useSelector((state)=>state.view.view_stockNavbar)
  const view_accountNavbar=useSelector((state)=>state.view.view_accountNavbar)
  const view_ownerNavbar=useSelector((state)=>state.view.view_ownerNavbar)
  const view_dealerNavbar=useSelector((state)=>state.view.view_dealerNavbar)
  const view_loggedInNavbar=useSelector((state)=>state.view.view_loggedInNavbar)
  
  // var audio=new Audio('click_sound.mp3');
  
  //BASIC UTILITY FUNCTIONS THAT ARE USED IN THE INTERFILE OPERATIONS of quotations  
    //Comon utility for setting the Editid
    let [editId, setEditId]=useState(0);
    const giveId=(id)=>{
      setEditId(id);
    }

    //For saving the change in the data of quotation
    const [quotId, seteditQuotId]=useState(0);
    const [editquantity, setEditquantity]=useState(0);
    const [editppp, seteditppp]=useState(0)
  //Ending of quotation utiliy
  
    //BASIC UTILITY FUNCTIONS THAT ARE USED IN THE INTERFILE OPERATIONS OF SALES ORDER 
    const [sprodDelId, setsProdDelId]=useState(0);
    const [smanageId, setsmanageId]=useState(0);
    const [seditId, setsEditId]=useState(0);

    //For Editing Sale's Product Info
    const [espquantity, setespquantity]=useState(0);
    const [esPppp, setesPppp]=useState(0);
    //Ending of sales order utiliy

    //BASIC UTILITY FUNCTIONS THAT ARE USED IN THE INTERFILE OPERATIONS OF PURCHASE ORDER
    const [prodDelId, setprodDelId]=useState(0);
    const [prodEditId, setprodEditId]=useState(0);
    const [productIdForManageP, setproductIdForManageP]=useState(0);

    //For Editing purchase's order utility
    const [epquantity, setepquantity]=useState(0);
    const [ePppp, setePppp]=useState(0);

    //For Managing Purchase Products
    const [dataOfpProduct, setDataOfpProduct]=useState([]);

    //Ending of purchase utility

    //BASIC UTILITY FUNCTIONS THAT ARE USED IN THE INTERFILE OPERATIONS OF STOCK DETAILS
    const [sdmoveId, setSdmoveId]=useState(0);
    const [sddeleteId, setSddeleteId]=useState(0);

    //Function For Getting Detail Of Product By id
    const [prodByid, setProdByid]=useState([]);
    const getproductDetails=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/getdata/productatparticularwarebyid/${id}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token') 
        }
    })
    const json=await response.json();
    setProdByid(json);
  }
    //Ending Of Stock Details

    return (
    <div className="App">
        {/* {document.onclick=function(){audio.play()}} */}
          <Context.Provider value={{giveId, editId, editquantity, setEditquantity, editppp, seteditppp, quotId, seteditQuotId, sprodDelId, setsProdDelId, smanageId, setsmanageId, seditId, setsEditId, espquantity, setespquantity, esPppp, setesPppp, prodDelId, setprodDelId, prodEditId, setprodEditId, epquantity, setepquantity, ePppp, setePppp, sdmoveId, setSdmoveId, sddeleteId, setSddeleteId, getproductDetails, prodByid, productIdForManageP, setproductIdForManageP, dataOfpProduct, setDataOfpProduct}}>
          <Router>
           {view_mainNavbar && <Main_navbar/>}
            {view_stockNavbar && <StockPortal_navbar/>}
            {view_ownerNavbar && <OwnerPortal_navbar/>}
            {view_loggedInNavbar && <LoggedinNavbar/>}

            <Routes>
            <Route path='/' element={<Main_page/>}/>
            <Route path='/pricing' element={<Pricing/>}/>
            <Route path='/Aboutus' element={<About_us/>}/>
            <Route path='/contactus' element={<Contact_us/>}/>
            <Route path='/login' element={<UserLogin/>}/>
            <Route path='/companylogin' element={<CmpLogin/>}/>
            <Route path='/register' element={<RegisterComp/>}/>
            <Route path='/userchangepass' element={<ChangePass/>}/>
            <Route path='/cmpchangepass' element={<ChangeCmpPass/>}/>
            <Route path='/loginselection' element={<LoginSelection/>}/>
            <Route path='/stockportal' element={<StockPortal_dashboard/>}/>
            <Route path='/ownerportal' element={<OwnerPortal_dashboard/>}/>

            <Route path='/stockportal/products' element={<StockPortal_items/>}/>
            <Route path='/stockportal/sales' element={<StockPortal_sales/>}/>
            <Route path='/stockportal/purchase' element={<StockPortal_purchase/>}/>
            <Route path='/stockportal/stockdetails' element={<StockPortal_stockdetails/>}/>
            <Route path='/stockportal/managequotations' element={<StockPortal_managequotations/>}/>
            <Route path='/stockportal/addnewcategory' element={<StockPortal_addnewcategory/>}/>
            <Route path='/stockportal/managewarehouses' element={<StockPortal_managewarehouses/>}/>

            <Route path='/ownerportal/sales' element={<OwnerPortal_checkSales/>}/>
            <Route path='/ownerportal/purchase' element={<OwnerPortal_checkPurchase/>}/>            
            <Route path='/ownerportal/quotations' element={<OwnerPortal_checkquotation/>}/>
            <Route path='/ownerportal/productandcategories' element={<OwnerPortal_productAndCategories/>}/>
            <Route path='/ownerportal/logbook' element={<CompanyLogbook/>}/>
            <Route path='/ownerportal/doneorders' element={<DispatchedArrivedOrders/>}></Route>
            </Routes>
            <Main_footer/>
          </Router>
          </Context.Provider>
    </div>
  );
}

export default App
