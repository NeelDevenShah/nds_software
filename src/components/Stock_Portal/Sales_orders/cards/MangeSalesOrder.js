import React, { useState, useEffect, useContext} from 'react'

import plus from '../../../../images/stockPortal_images/plus.png'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'
import GetProductOfSales from './GetProductOfSales'
import Context from '../../../../Context'
//In this page, when the order is been added the status and dispatching form should be in the to be planned, And that can be changed from the order status managment portal
function MangeSalesOrder() {
  
  const context=useContext(Context);
  const {sprodDelId, setsProdDelId, smanageId, setsmanageId, seditId, setsEditId, espquantity, setespquantity, esPppp, setesPppp}=context;
  useEffect(()=>{
    getSalesData();
  }, [])

  //Function(Secondary) For Getting The Data Of Sales Company And Other Necessary Information
  const salesComp=[];
  const [Sname, ScmpsetName] = useState(salesComp)
  const getSalesData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/salesorders', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    ScmpsetName(json)
  }

  //Function(Secondary) for getting the difference of the current date and the main dispatch date
  const DateDifference = (Odate) => {
    //Use the mm/dd/yyy format
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yyyy = now.getFullYear();
    var nowDate = mm + '/' + dd + '/' + yyyy;

    const date1 = new Date(nowDate);
    const date2 = new Date(Odate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + " days");
    return diffDays
  }

  //Function(Primary) For Adding New Sales Order
  const[neworderData, setnewOrderData]=useState({salesDealer:"", brokerName:"", paymentTerm:"", comment:"", dispatchDay:"", dispatchMonth:"", dispatchYear:""})
  const onChangenod=(event)=>{
    setnewOrderData({...neworderData, [event.target.name]: event.target.value})
  }
  const addnewSorder=async()=>{
    const response=await fetch('http://localhost:5000/api/salesorder/addneworder', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
          // In mm/dd/yyyy format
      body: JSON.stringify({salesDealer:neworderData.salesDealer, brokerName:neworderData.brokerName, paymentTerm:neworderData.paymentTerm, comment:neworderData.comment, totalAmount:0, mainDispatchDate:neworderData.dispatchMonth+"/"+neworderData.dispatchDay+"/"+neworderData.dispatchYear})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Sales Order Added Successfull");
      getSalesData();
    }
    else{
      console.log("Sales order addition failed");
      console.log(json);
    }
  }

  //Function(Primary) For Deleting Sales Order
  const [delorderId, setdelorderId]=useState("")
  const deletedSOrder=async(id)=>{
    const response= await fetch(`http://localhost:5000/api/salesorder/deleteorder/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Order Deleted Successfully");
      getSalesData();
    }
    else{
      console.log("Order Deleted Failed");
      console.log(json);
    }
  }

  //Function(Secondary) For Getting Data Of Sales Order That Is To Be Edited
  const [editId, setEditId]=useState("");
  const[ebrokerName, esetBrokerName]=useState("");
  const[epaymentTerm, esetpaymentTerm]=useState("");
  const[ecomment, esetcomment]=useState("");
  //As in the mm/dd/yyyy format
  const[edispatchMonth, esetdispatchMonth]=useState("");
  const[edispatchDay, esetdispatchDay]=useState("");
  const[edispatchYear, esetdispatchYear]=useState("");
  const getDataForEdit=async(id)=>{
    setEditId(id);
    const response=await fetch(`http://localhost:5000/api/salesorder/getorderdetails/${id}`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    esetBrokerName(json.brokerName);
    esetpaymentTerm(json.paymentTerm);
    esetcomment(json.comment)
    var tempdate=json.mainDispatchDate;
    var mm=tempdate.charAt(0)+tempdate.charAt(1);
    var dd=tempdate.charAt(3)+tempdate.charAt(4);
    var yyyy=tempdate.charAt(6)+tempdate.charAt(7)+tempdate.charAt(8)+tempdate.charAt(9);
    esetdispatchMonth(mm);
    esetdispatchDay(dd);
    esetdispatchYear(yyyy);
  }
  const eonChange1=(event)=>{
    esetBrokerName(event.target.value)
  }
  const eonChange2=(event)=>{
    esetpaymentTerm(event.target.value)
  }
  const eonChange3=(event)=>{
    esetcomment(event.target.value)
  }
  const eonChange4=(event)=>{
    esetdispatchDay(event.target.value)
  }
  const eonChange5=(event)=>{
    esetdispatchMonth(event.target.value)
  }
  const eonChange6=(event)=>{
    esetdispatchYear(event.target.value)
  }

  //Function(Primary) For Editing Sales Order's Details
  const editSOrder=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/salesorder/editsalesorder/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({brokerName:ebrokerName, paymentTerm:epaymentTerm, comment:ecomment, mainDispatchDate:edispatchMonth+"/"+edispatchDay+"/"+edispatchYear})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Sales Order Edited Successfully");
      getSalesData();
    }
    else{
      console.log("Sales Order Edition Failed");
      console.log(json);
    }
  }

  //Function(Primary) For Dispatching Whole Order
  const [dispatchId, setDispatchId]=useState("")
  const dispatchOrder=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/salesorder/dispatchallorder/${id}`, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Order dispatched Successfully...");
      getSalesData();
    }
    else{
      console.log("Order Cannot Be Dispatched, error");
      console.log(json);
    }
  }

  //Function(Primary) For Adding New Product To Sales Order
  const [apicategoryId, setapicategoryId]=useState(-1);
  //apiProductId will Be Set Directly By onChange function of the select 
  const [apiproductId, setapiproductId]=useState(-1);
  const [newpdata, setnewPdata]=useState({nquantity:"", nppp:""})
  const onChangenp=(event)=>{
    setnewPdata({...newpdata, [event.target.name]: event.target.value});
  }
  const addProductToOrder=async(id)=>{
    let categoryName="", productName="";
    categoryModal.map((data)=>{
      if(data.categoryId==apicategoryId)
      {
        categoryName=data.pcname;
      }
    })
    productsOfCatModal.map((data)=>{
      if(data.productId==apiproductId)
      {
        productName=data.productName;
      }
    })
    const response=await fetch(`http://localhost:5000/api/salesorder/addsalesorderproduct/${id}`, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({categoryId:apicategoryId, categoryName:categoryName, productId:apiproductId, productName:productName, quantity:newpdata.nquantity, perPicePrice:newpdata.nppp, dispatchingFrom:"0", dispatchDate:"00/00/0000"})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Product Added to the Sales Order successfully");
      document.location.reload();
    }
    else{
      console.log("Product Does Not Added, Error");
      console.log(json);
    }
  }


  //Function(Secondary) For Getting Data Of Category For AddNewProductModal
   let ItemCat=[];
   //For selection Choice in AddNewProductModal
   const [categoryModal, setCategoryModal] = useState(ItemCat)
   const [addproductId, setAddproductId]=useState("")
   const getCategoryData=async(id)=>{
    setAddproductId(id); 
    const response=await fetch('http://localhost:5000/api/getdata/getcategories', {
       method: 'GET',
       headers:{
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('token')
       },
     })
     const json=await response.json();
     setCategoryModal(json)
   }

  //Function(Secondary) For NewproductModal's Product According To Category And Setting Final categoryId
  const prodItem=[];
  const [productsOfCatModal, setProductsOfCatModal] = useState(prodItem)
  const productbycategoryIdforModal=async(categoryId)=>{
  if(categoryId!=-1)
  {
    setapicategoryId(categoryId);  
    const response=await fetch(`http://localhost:5000/api/getdata/getproductofcategory`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'categoryId': categoryId
        },
      })
      const json=await response.json();
      setProductsOfCatModal(json);
    }
  }

  //Function(Primary) For Deleting Sales Order's Product
  const deletedSOrderproduct=async(id)=>{
    const response= await fetch(`http://localhost:5000/api/salesorder/deleteproduct/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Product Deleted Successfully");
      getSalesData();
      document.location.reload();
    }
    else{
      console.log("Product Deleted Failed");
      console.log(json);
    }
  }

  //Function(Primary) For Editing Product Of Sale's Order
  const esponChange1=(event)=>{
    setespquantity(event.target.value)
  }
  const esponChange2=(event)=>{
    setesPppp(event.target.value)
  }
  const editsproduct=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/salesorder/editsalesproduct/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({quantity: espquantity, perPicePrice:esPppp})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Product Edited Successfully");
      document.location.reload();
    }
    else{
      console.log("Product Edition Failed, Error");
      console.log(json);
    }
  }

  //Function(Primary) For Managing Status Of Product Of Sales Order
  const managespStatus=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/salesorder/managestatus/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({quantity: espquantity, perPicePrice:esPppp})
    })
  }



  // starting of kachra
  //For managestatusModal
  const [note, setNote] = useState();
  const onChange = (event) => {
      setNote({ ...note, [event.target.name]: [event.target.value] })
  }
  const statusData = [
      {
          'id': '1',
          'status': 'To Be Planned'
      },
      {
          'id': '2',
          'status': 'To Be Ordered/Produced'
      },
      {
          'id': '3',
          'status': 'To Be Packed'
      },
      {
          'id': '2',
          'status': 'To Be Shiped'
      },
  ]
  const [getStatus, setStatus] = useState(statusData);
  const wareHouseData = [
      {
          'id': '1',
          'warehouse': 'w1',
          'quantity': '5000'
      },
      {
          'id': '1',
          'warehouse': 'w2',
          'quantity': '3000'
      },
      {
          'id': '1',
          'warehouse': 'w3',
          'quantity': '2500'
      },
  ]
  const [getwhdata, setwhdata] = useState(wareHouseData);
  //Closing of managestatusmodal kachra
//Closing of kachra 
  
let i=1;
  return (
    // Staring
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      {/* <DeleteSalesModal /> */}
      <div class="modal fade" id="DeleteSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
          </div>
          <div class="modal-body">
            Once It Is Been Deleted, It Cannot Be Recovered
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deletedSOrder(delorderId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* <DeleteSalesModal's Product/> */}
      <div class="modal fade" id="DeleteSalesModalproduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
          </div>
          <div class="modal-body">
            Once It Is Been Deleted, It Cannot Be Recovered
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deletedSOrderproduct(sprodDelId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* <Edit Sale's Product Modal /> */}
      <div class="modal fade" id="EditSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Sales Order Product</h5>
                    </div>
                    <div class="modal-body">
                        Edit The Thing You Want To Change, Otherwise Not Make Change In It
                        <hr/>
                        <form>
                            <label class="form-label">Quantity Of Product</label>
                            <input type="number" class="form-control text-center" id="espquantity" name="espquantity" value={espquantity} onChange={esponChange1} required />

                            <label class="form-label">Per-Piece Price</label>
                            <input type="number" class="form-control text-center" id="esPppp" name="esPppp" value={esPppp} onChange={esponChange2} required />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{editsproduct(seditId)}} class="btn btn-secondary" data-bs-dismiss="modal">Change</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}
     {/* AddToSalesModal */}
     <div class="modal fade" id="AddNewOrder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Sales Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="mb-3">
                <label class="form-label">Enter Company Name To Whom Order Is</label>
                    <input type="text" name="salesDealer" value={neworderData.salesDealer} onChange={onChangenod} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Broker Name Who Booked Order</label>
                    <input type="text" name="brokerName" value={neworderData.brokerName} onChange={onChangenod} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Payment Terms(In Days)</label>
                    <input type="number" name="paymentTerm" value={neworderData.paymentTerm} onChange={onChangenod} style={{width: '75px', height: '32px'}} class="form-control text-center mx-auto" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Average Dispatch Date Of Order(dd/mm/yyyy)</label>
                    <div className='row mx-auto'>
                    <select id='dispatchDate' name='dispatchDay' onChange={onChangenod} style={{width: '63px', marginLeft: '125px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='01'>01</option>
                      <option selected value='02'>02</option>
                      <option selected value='03'>03</option>
                      <option selected value='04'>04</option>
                      <option selected value='05'>05</option>
                      <option selected value='06'>06</option>
                      <option selected value='07'>07</option>
                      <option selected value='08'>08</option>
                      <option selected value='09'>09</option>
                      <option selected value='10'>10</option>
                      <option selected value='11'>11</option>
                      <option selected value='12'>12</option>
                      <option selected value='13'>13</option>
                      <option selected value='14'>14</option>
                      <option selected value='15'>15</option>
                      <option selected value='16'>16</option>
                      <option selected value='17'>17</option>
                      <option selected value='18'>18</option>
                      <option selected value='19'>19</option>
                      <option selected value='20'>20</option>
                      <option selected value='21'>21</option>
                      <option selected value='22'>22</option>
                      <option selected value='23'>23</option>
                      <option selected value='24'>24</option>
                      <option selected value='25'>25</option>
                      <option selected value='26'>26</option>
                      <option selected value='27'>27</option>
                      <option selected value='28'>28</option>
                      <option selected value='29'>29</option>
                      <option selected value='30'>30</option>
                      <option selected value='31'>31</option>
                    </select>
                    <select id='dispatchMonth' name='dispatchMonth' onChange={onChangenod} style={{width: '63px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                    <option selected value={0}>0</option>
                      <option selected value='01'>01</option>
                      <option selected value='02'>02</option>
                      <option selected value='03'>03</option>
                      <option selected value='04'>04</option>
                      <option selected value='05'>05</option>
                      <option selected value='06'>06</option>
                      <option selected value='07'>07</option>
                      <option selected value='08'>08</option>
                      <option selected value='09'>09</option>
                      <option selected value='10'>10</option>
                      <option selected value='11'>11</option>
                      <option selected value='12'>12</option>
                    </select>
                    <select id='dispatchYear' name='dispatchYear' onChange={onChangenod} style={{width: '75px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='2022'>2022</option>
                      <option selected value='2023'>2023</option>
                      <option selected value='2024'>2024</option>
                    </select>
                    </div>
                    <label class="form-label">Enter Comment(If Any)</label>
                    <textarea name="comment" value={neworderData.comment} onChange={onChangenod} class="form-control text-center" id="comment" aria-describedby="emailHelp" required />
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{addnewSorder()}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* EditSalesModal */}
     <div class="modal fade" id="EditSalesOrder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Sales Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <strong>Once Details Being Changed, The Action Cannot Be Reverted, Change The Fields That Are To Be Edited</strong>
            <hr/>
            <form>
                <div class="mb-3">
                    <label class="form-label">Broker Name Who Booked Order</label>
                    <input type="text" name="ebrokerName" value={ebrokerName} onChange={eonChange1} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Payment Terms(In Days)</label>
                    <input type="number" name="epaymentTerm" value={epaymentTerm} onChange={eonChange2} style={{width: '75px', height: '32px'}} class="form-control text-center mx-auto" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Average Dispatch Date Of Order(dd/mm/yyyy)</label>
                    <div className='row mx-auto'>
                    <select id='dispatchDate' name='edispatchDay' value={edispatchDay} onChange={eonChange4} style={{width: '63px', marginLeft: '125px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='01'>01</option>
                      <option selected value='02'>02</option>
                      <option selected value='03'>03</option>
                      <option selected value='04'>04</option>
                      <option selected value='05'>05</option>
                      <option selected value='06'>06</option>
                      <option selected value='07'>07</option>
                      <option selected value='08'>08</option>
                      <option selected value='09'>09</option>
                      <option selected value='10'>10</option>
                      <option selected value='11'>11</option>
                      <option selected value='12'>12</option>
                      <option selected value='13'>13</option>
                      <option selected value='14'>14</option>
                      <option selected value='15'>15</option>
                      <option selected value='16'>16</option>
                      <option selected value='17'>17</option>
                      <option selected value='18'>18</option>
                      <option selected value='19'>19</option>
                      <option selected value='20'>20</option>
                      <option selected value='21'>21</option>
                      <option selected value='22'>22</option>
                      <option selected value='23'>23</option>
                      <option selected value='24'>24</option>
                      <option selected value='25'>25</option>
                      <option selected value='26'>26</option>
                      <option selected value='27'>27</option>
                      <option selected value='28'>28</option>
                      <option selected value='29'>29</option>
                      <option selected value='30'>30</option>
                      <option selected value='31'>31</option>
                    </select>
                    <select id='dispatchMonth' name='edispatchMonth' value={edispatchMonth} onChange={eonChange5} style={{width: '63px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='01'>01</option>
                      <option selected value='02'>02</option>
                      <option selected value='03'>03</option>
                      <option selected value='04'>04</option>
                      <option selected value='05'>05</option>
                      <option selected value='06'>06</option>
                      <option selected value='07'>07</option>
                      <option selected value='08'>08</option>
                      <option selected value='09'>09</option>
                      <option selected value='10'>10</option>
                      <option selected value='11'>11</option>
                      <option selected value='12'>12</option>
                    </select>
                    <select id='dispatchYear' name='edispatchYear' value={edispatchYear} onChange={eonChange6} style={{width: '75px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='2022'>2022</option>
                      <option selected value='2023'>2023</option>
                      <option selected value='2024'>2024</option>
                    </select>
                    </div>
                    <label class="form-label">Comment</label>
                    <textarea name="ecomment" value={ecomment} onChange={eonChange3} class="form-control text-center" id="comment" aria-describedby="emailHelp" required />
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{editSOrder(editId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* <AddItemModal /> */}
      <div class="modal fade" id="AddProductToSalesOrder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product To Order</h5>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Select The Product Category</label>
                                
                                <div class="dropdown">
                                    <select class="form-select form-select-sm mb-3" onClick={async(event)=>{productbycategoryIdforModal(event.target.value)}} aria-label=".form-select-lg example">
                                        <option value={-1}>Select</option>
                                        {/* Here we had saved the value in const, Instead we have to use the from json */}
                                        {categoryModal.map((cat) => {
                                            return <option value={cat.categoryId}>{cat.pcname}</option>
                                        })}
                                    </select>
                                </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Select The Product</label>
                                    {/* For taking the value from the database of the saved category use following method, where notes comes from the database, and instead it you can take anyt name */}

                                    <div class="dropdown">
                                        <select class="form-select form-select-sm mb-3" onClick={async(event)=>{setapiproductId(event.target.value)}} aria-label=".form-select-lg example">
                                            <option value={-1}>Select</option>
                                            {/* Here we had saved the value in const, Instead we have to use the from json */}
                                            {productsOfCatModal.map((itm) => {
                                                return <option value={itm.productId}>{itm.productName}</option>
                                            })}
                                        </select>
                                    </div>
                                    </div>

                                    <label class="form-label">Enter Quantity Of Product</label>
                                    <input type="number" class="form-control text-center" id="Itemquty" name="nquantity" onChange={onChangenp} required />
                                    
                                    <label class="form-label">Enter Per-Piece Price</label>
                                    <input type="number" class="form-control text-center" id="Itemprice" name="nppp" onChange={onChangenp} required />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{addProductToOrder(addproductId)}} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}
      {/* <DispatchedAllModal/> */}
      <div class="modal fade" id="DispatchSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Conform Notification</h5>
          </div>
          <div class="modal-body">
            Once It Is Been Dispatched, It Cannot Be Reverted, And The Stock Related All The Things Would Be Maked Automatically Dispatched
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{dispatchOrder(dispatchId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* <ManageStatusModal/> */}
      <div class="modal fade" id="ManageStatusModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Manage Status Of Order #334</h5>
                    </div>
                    <div class="modal-body">
                        Edit The Thing You Want To Change, Otherwise Not Make Change In It
                        <hr />
                        <form>
                            {/* The system would be maked that the information would be shown and some of them would be permited to change */}

                            <strong><label class="form-label">Product Name: "Product Name Here:"</label></strong>
                            <strong><label class="form-label">Product Category: "Product Categoty Here"</label></strong>
                            <strong><label class="form-label">Total Product Sales Quantity: "Quantity Here"</label></strong>
                            <hr/>
                            <label class="form-label mt-1">Select The Product Status</label>
                            <div class="dropdown">
                                <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                    <option selected>Select</option>
                                    {/* Here we had saved the value in const, Instead we have to use the from json */}
                                    {getStatus.map((itm) => {
                                        return <option value={itm.status}>{itm.status}</option>
                                    })}
                                </select>
                            </div>

                            <label class="form-label mt-1">Select From Which Warehouse The Stock Is To Be Dispatched(If More Than One, Than Select More Than One)</label>
                            <hr />
                            {getwhdata.map((choice) => {
                                return <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value={`option${choice.id}`} />
                                    <label class="form-check-label" for="inlineCheckbox3">{choice.warehouse} | Quantity Of Item Present :{choice.quantity} | Dis. Qty. <input type="number" style={{height: '25px', width: '95px'}} class="form-control text-center" id="Itemprice" name="ItemPrice" onChange={onChange} required /> </label>
                                </div>


                            })}

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-secondary">Change</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}

      <h2 className='pt-3'><strong>Your Sales Orders</strong></h2>
      <div className='row d-flex justify-content-center'>

        {Sname.map((QCompnay) => {
          return <div key={QCompnay._id} className={`col-md-10 my-4`}>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"><strong>Order Number #{i++}</strong></h4>
                <p class="card-text"><strong>{QCompnay.salesDealer}</strong>, Days Left For Dispatch: <strong>{DateDifference(QCompnay.mainDispatchDate)}</strong><br/>Broker Name: <strong>{QCompnay.brokerName}</strong>, Payment Terms: <strong>{QCompnay.paymentTerm} Days</strong><br/>Comment: <strong>{QCompnay.comment}</strong>, SalesOrderId: <strong>{QCompnay.SalesOrderId}</strong></p>
                <div className='table-responsive'>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity No.'s</th>
                        <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                        <th scope="col">Dispatching Status</th>
                        <th scope='col'>Dispatching From</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Manage Status</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <GetProductOfSales SalesOrderId={QCompnay.SalesOrderId}/>
                  </table>
                </div>
                <p>Total Order Amount: <strong>{QCompnay.totalAmount}</strong></p>
                <hr />
                <button type="button" onClick={()=>{getCategoryData(QCompnay._id)}} class="btn" data-bs-toggle="modal" data-bs-target="#AddProductToSalesOrder"><img src={add_item_image} width='120'></img></button>
                <hr />
                <button type="button" onClick={()=>{setDispatchId(QCompnay._id)}} class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#DispatchSalesModal">All Order Dispatched</button>
                <button type="button" onClick={()=>{getDataForEdit(QCompnay._id)}} class="btn btn-info mx-2" data-bs-toggle="modal" data-bs-target="#EditSalesOrder">Edit</button>
                <button type="button" onClick={()=>{setdelorderId(QCompnay._id)}} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteSalesModal">Delete</button>
                {/* <!-- Button trigger modal --> */}
              </div>
            </div>
          </div>
        })}

        <div className={`col-md-6 my-4`}>
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddNewOrder"><img src={plus} width='55'></img><strong> Add Sales Order</strong></button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangeSalesOrder
