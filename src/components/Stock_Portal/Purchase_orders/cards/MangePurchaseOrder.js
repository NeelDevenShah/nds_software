import React, { useState, useEffect, useContext} from 'react'
import plus from '../../../../images/stockPortal_images/plus.png'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'
import Context from '../../../../Context';
import GetProductOfPurchase from './GetProductOfPurchase';

//In this page, when the order is been added the status and dispatching form should be in the to be planned, And that can be changed from the order status managment portal
function MangePurchaseOrder() {
  
  const context=useContext(Context);
    const {prodDelId, setprodDelId, prodEditId, setprodEditId, epquantity, setepquantity, ePppp, setePppp}=context;
  //At the loading of the page this would run first
  useEffect(()=>{
    getPOrderInfo();
  }, [])

  //Function(Primary) For Loading Details Of Purchase Order
  const orderDetail=[];
  const [POrderDetails, setPOrderDetails] = useState(orderDetail)
  const getPOrderInfo=async()=>{
    const response= await fetch('http://localhost:5000/api/getdata/purchaseorders', {
      method: 'GET',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
      },
    })
    const json=await response.json();
    console.log(json)
    setPOrderDetails(json);
  }

  //Function(Secondary) For Getting Remaining Days For Arrival
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

  //Function(Primary) For Adding New Purchase Product
  const [newoData, setnewoData]=useState({purchaseDealer:"", brokerName:"", paymentTerm:"", comment:"", arrivalMonth:"", arrivalDay:"", arrivaYear:""})
  const onChangenewoData=(event)=>{
    setnewoData({...newoData, [event.target.name]: event.target.value});
  }
  const AddpOrder=async()=>{
    const response=await fetch('http://localhost:5000/api/purchaseorder/addneworder', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({purchaseDealer:newoData.purchaseDealer, brokerName:newoData.brokerName, paymentTerm:newoData.paymentTerm, comment:newoData.comment, totalAmount:0, mainArrivingDate:newoData.arrivalMonth+"/"+newoData.arrivalDay+"/"+newoData.arrivaYear})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Order Added Successfully");
      getPOrderInfo();
    }
    else{
      console.log("Order has been not added, error");
      console.log(json);
    }
  }

  //Function(Primary) For Deleting Purchase Order
  const [delId, setDelId]=useState(0)
  const deleteOrder=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/purchaseorder/deleteorder/${id}`, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
      },
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Order Deleted Successfull");
      getPOrderInfo();
    }
    else{
      console.log("Error, Order Deletion Failed");
      console.log(json)
    }
  }

  //Function(Primary) For Editing The Purchase Order's Details
  const [ePeditId, setePeditId]=useState(0);

  const [ebrokerName, setebrokerName]=useState(0);
  const [epaymentTerm, setepaymentTerm]=useState(0);
  const [ecomment, setecomment]=useState(0);
  const [earrivalMonth, setearrivalMonth]=useState(0);
  const [earrivalDay, setearrivalDay]=useState(0);
  const [earrivalYear, setearrivalYear]=useState(0);
  const editPOrder=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/purchaseorder/editpurchaseorder/${id}`, {
      method: 'PUT',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({brokerName:ebrokerName, paymentTerm:epaymentTerm, comment:ecomment, mainArrivingDate:earrivalMonth+"/"+earrivalDay+"/"+earrivalYear})
    })
    const json=response.json();
    if(json.success)
    {
      console.log("Order Edited Successfully");
    }
    else{
      console.log("Order Has been not edited, error");
      console.log(json)
    }
  }

  //Function(Secondary) For Getting Details Of Order For Editing Order
    const geteOrderDetail=async(id)=>{
    setePeditId(id)
      const response=await fetch(`http://localhost:5000/api/purchaseorder/getorderdetailbyid/${id}`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    })
    const json=await response.json();
    setebrokerName(json.brokerName);
    setepaymentTerm(json.paymentTerm);
    setecomment(json.comment);
    var tempdate=json.mainArrivingDate;
    var mm=tempdate.charAt(0)+tempdate.charAt(1);
    var dd=tempdate.charAt(3)+tempdate.charAt(4);
    var yyyy=tempdate.charAt(6)+tempdate.charAt(7)+tempdate.charAt(8)+tempdate.charAt(9);
    setearrivalMonth(mm);
    setearrivalDay(dd);
    setearrivalYear(yyyy);
  }
  const eponchange1=(event)=>{
    setebrokerName(event.target.value);
  }
  const eponchange2=(event)=>{
    setepaymentTerm(event.target.value);
  }
  const eponchange3=(event)=>{
    setearrivalDay(event.target.value);
  }
  const eponchange4=(event)=>{
    setearrivalMonth(event.target.value);
  }
  const eponchange5=(event)=>{
    setearrivalYear(event.target.value);
  }
  const eponchange6=(event)=>{
    setecomment(event.target.value);
  }

  //Function(Primary) For Making Order To Be Arrived
  const [arrivedId, setArrivedId]=useState(0);
  const makeoArrived=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/purchaseorder/dispatchallorder/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("All order arrived successfully");
      getPOrderInfo();
    }
    else{
      console.log("Order Not Maked Arrived, Error");
      console.log(json);
    }
  }

  //Function(Primary) For Adding New Product To Purchase Order
  const [orderId, setOrderId]=useState(0);
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
    const response=await fetch(`http://localhost:5000/api/purchaseorder/addpurchaseproduct/${id}`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({categoryId:apicategoryId, categoryName:categoryName, productId:apiproductId, productName:productName, quantity:newpdata.nquantity, perPicePrice:newpdata.nppp, status:"To Be Planned", arrivingat:"0", arrivingDate:"00/00/0000"})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Product Added To Order Successfully");
      document.location.reload();
    }
    else{
      console.log("Product Is Not Addedd Successfully, Error");
      console.log(json);
    }
  }

  //Function(Secondary) For Getting Data Of Category For AddNewProductModal
  let ItemCat=[];
  //For selection Choice in AddNewProductModal
  const [categoryModal, setCategoryModal] = useState(ItemCat)
  const getCategoryData=async(id)=>{
    setOrderId(id); 
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

  //Function(Primary) For Deleting Product Of Order
  const deleteProduct=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/purchaseorder/deleteproduct/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Product Added To Order Successfull")
      document.location.reload();
    }
    else{
      console.log("Product Added to order Failed, Error");
      console.log(json);
    }
  } 

  //Function(Primary) For Editing Purchase Product's Info
  const eponChange1=(event)=>{
    setepquantity(event.target.value);
  }
  const eponChange2=(event)=>{
    setePppp(event.target.value);
  }
  const editProduct=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/purchaseorder/editpurchaseproduct/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({quantity:epquantity, perPicePrice:ePppp})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Product Edited Successfully");
      document.location.reload();
    }
    else{
      console.log("Product edition failed, error");
    }
  }


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
      {/* <AddItemModal /> */}
      <div class="modal fade" id="AddProductToPurchase" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <button type="button" onClick={()=>{addProductToOrder(orderId)}} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
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
      {/* <Edit Purchase's Product Modal /> */}
      <div class="modal fade" id="EditPurchaseprodModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Purchase Order Product</h5>
                    </div>
                    <div class="modal-body">
                        Edit The Thing You Want To Change, Otherwise Not Make Change In It
                        <hr/>
                        <form>
                            <label class="form-label">Quantity Of Product</label>
                            <input type="number" class="form-control text-center" id="epquantity" name="epquantity" value={epquantity} onChange={eponChange1} required />

                            <label class="form-label">Per-Piece Price</label>
                            <input type="number" class="form-control text-center" id="ePppp" name="ePppp" value={ePppp} onChange={eponChange2} required />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{editProduct(prodEditId)}} class="btn btn-secondary" data-bs-dismiss="modal">Change</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}
      {/* AddToPurchaseModal */}
     <div class="modal fade" id="AddPurchaseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Purchase Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="mb-3">
                <label class="form-label">Enter Company Name By Whom Order Is Comming</label>
                    <input type="text" name="purchaseDealer" value={newoData.purchaseDealer} onChange={onChangenewoData} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Broker Name Who Booked Order</label>
                    <input type="text" name="brokerName" value={newoData.brokerName} onChange={onChangenewoData} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Payment Terms(In Days)</label>
                    <input type="number" name="paymentTerm" value={newoData.paymentTerm} onChange={onChangenewoData} style={{width: '75px', height: '32px'}} class="form-control text-center mx-auto" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Average Dispatch Date Of Order(dd/mm/yyyy)</label>
                    <div className='row mx-auto'>
                    <select id='dispatchDate' name='arrivalDay' onChange={onChangenewoData} style={{width: '63px', marginLeft: '125px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
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
                    <select id='dispatchMonth' name='arrivalMonth' onChange={onChangenewoData} style={{width: '63px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
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
                    <select id='dispatchYear' name='arrivaYear' onChange={onChangenewoData} style={{width: '75px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='2022'>2022</option>
                      <option selected value='2023'>2023</option>
                      <option selected value='2024'>2024</option>
                    </select>
                    </div>
                    <label class="form-label">Enter Comment(If Any)</label>
                    <textarea name="comment" value={newoData.comment} onChange={onChangenewoData} class="form-control text-center" id="comment" aria-describedby="emailHelp" required />
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{AddpOrder()}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
    {/* <DeletePurchaseModal/> */}
    <div class="modal fade" id="DeletePurchaseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button type="button" onClick={()=>{deleteOrder(delId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
    {/*  */}
    {/* <Delete Purchase Product Modal/> */}
    <div class="modal fade" id="DeletePurchaseproductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button type="button" onClick={()=>{deleteProduct(prodDelId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
    {/*  */}
    {/* <ArrivedOrderModal/> */}
    <div class="modal fade" id="ArrivedOrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Conform Notification</h5>
          </div>
          <div class="modal-body">
            Once It Is Been Arrived, It Cannot Be Reverted, And The Stock Related All The Things Would Be Maked Automatically Arrived
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{makeoArrived(arrivedId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
    {/*  */}
    {/* EditPurchaseModal */}
    <div class="modal fade" id="EditPurchaseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <input type="text" name="ebrokerName" value={ebrokerName} onChange={eponchange1} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Payment Terms(In Days)</label>
                    <input type="number" name="epaymentTerm" value={epaymentTerm} onChange={eponchange2} style={{width: '75px', height: '32px'}} class="form-control text-center mx-auto" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Average Dispatch Date Of Order(dd/mm/yyyy)</label>
                    <div className='row mx-auto'>
                    <select id='dispatchDate' name='earrivalDay' value={earrivalDay} onChange={eponchange3} style={{width: '63px', marginLeft: '125px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
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
                    <select id='dispatchMonth' name='earrivalMonth' value={earrivalMonth} onChange={eponchange4} style={{width: '63px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
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
                    <select id='dispatchYear' name='earrivaYear' value={earrivalYear} onChange={eponchange5} style={{width: '75px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value='2022'>2022</option>
                      <option selected value='2023'>2023</option>
                      <option selected value='2024'>2024</option>
                    </select>
                    </div>
                    <label class="form-label">Comment</label>
                    <textarea name="ecomment" value={ecomment} onChange={eponchange6} class="form-control text-center" id="comment" aria-describedby="emailHelp" required />
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{editPOrder(ePeditId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      <h2 className='pt-3'><strong>Your Purchase Orders</strong></h2>
      <div className='row d-flex justify-content-center'>

        {POrderDetails.map((porderdetail) => {
          return <div key={porderdetail._id} className={`col-md-10 my-4`}>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"><strong>Order Number #{i++}</strong></h4>
                <p class="card-text"><strong>{porderdetail.purchaseDealer}</strong>, Days Left For Arrival: <strong>{DateDifference(porderdetail.mainArrivingDate)}</strong><br/>Broker Name: <strong>{porderdetail.brokerName}</strong>, Payment Terms: <strong>{porderdetail.paymentTerm} Days</strong><br/>Comment: <strong>{porderdetail.comment}</strong>, PurchaseOrderId: <strong>{porderdetail.purchaseOrderId}</strong></p>
                <div className='table-responsive'>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity No.'s</th>
                        <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                        <th scope="col">Arriving Status</th>
                        <th scope="col">Arriving At</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Manage Status</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <GetProductOfPurchase purchaseOrderId={porderdetail.purchaseOrderId}/>
                  </table>
                </div>
                <p>Total Order Amount: <strong>{porderdetail.totalAmount}</strong></p>
                <hr />
                <button type="button" onClick={()=>{getCategoryData(porderdetail._id)}} class="btn" data-bs-toggle="modal" data-bs-target="#AddProductToPurchase"><img src={add_item_image} width='120'></img></button>
                <hr />
                <button type="button" onClick={()=>{setArrivedId(porderdetail._id)}} class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#ArrivedOrderModal">All Order Arrived</button>
                <button type="button" onClick={()=>{geteOrderDetail(porderdetail._id)}} class="btn btn-info mx-2" data-bs-toggle="modal" data-bs-target="#EditPurchaseModal">Edit</button>
                <button type="button" onClick={()=>{setDelId(porderdetail._id)}} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeletePurchaseModal">Delete</button>
                {/* <!-- Button trigger modal --> */}
              </div>
            </div>
          </div>
        })}

        <div className={`col-md-6 my-4`}>
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddPurchaseModal"><img src={plus} width='55'></img><strong> Add Purchase Order</strong></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangePurchaseOrder
