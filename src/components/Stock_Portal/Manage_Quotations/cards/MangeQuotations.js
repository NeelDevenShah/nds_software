import React, { useState, useEffect} from 'react'

import plus from '../../../../images/stockPortal_images/plus.png'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'
import GetQuotationProducts from './GetQuotationProducts'
import Context from '../../../../Context'
import {useContext} from 'react'

function ManageQuotations() {

  const context=useContext(Context);
  const {delprodId, editquantity, setEditquantity, editppp, seteditppp, quotId, seteditQuotId}=context;

    //For Error Notification
    const [showError, setError]=useState("");

  //At the loading of the page this would run first
  useEffect(()=>{
    getQData();
  }, [])

  const qarr=[];
  const [Qdata, setcmpQdata]=useState(qarr);
  //For Getting Data Of Quotation
  const getQData=async()=>{
    const response=await fetch(`http://localhost:5000/api/getdata/getquotations`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      })
      const json=await response.json();
      setcmpQdata(json);
  }  

  const [newqdata, setNewqdata]=useState({compName:""})
  //For Adding New Quotation
  const addquotation=async()=>{
    console.log(newqdata.compName)
    if(newqdata.compName=="")
    {
      setError("Please Enter Right Information");
      document.getElementById("errorModal").click();
    }
    else{
      const response=await fetch(`http://localhost:5000/api/quotation/addquotation`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({dealer: newqdata.compName, totalAmount:0})
        })
        const json=await response.json();
        if(json.success)
        {
          getQData();
        }
        else{
          setError(json.error);
          document.getElementById("errorModal").click();
        }
    }   
  }
  const onChangeForNewQ=(event)=>{
    setNewqdata({...newqdata, [event.target.name]: event.target.value})
  }

  //For Deleting Quotation
  const makedeletedquotation=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/quotation/deletequotation/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    if(json.success)
    {
      getQData();
    }
    else{
      setError(json.error);
        document.getElementById("errorModal").click();
    }
  }

  //To Get Data Of Category For AddNewProduct Modal
  let ItemCat=[];
  const [categoryModal, setCategoryModal] = useState(ItemCat)
  const getCategoryData=async()=>{
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

//For Giving Data For Selection In AddNewProduct Data
const Item = []
const [productsOfCatModal, setProductsOfCatModal] = useState(Item)
const [apicategoryId, setapicategoryId]=useState(-1);
//apiProductId will Be Set Directly By onChange function of the select 
const [apiproductId, setapiproductId]=useState(-1);
//For NewproductModal's Product According To Category And Setting Final categoryId
const productbycategoryIdforModal=async(categoryId)=>{
  if(categoryId!=-1)
  {
    setapicategoryId(categoryId);  
    const response=await fetch(`http://localhost:5000/api/getdata//getproductofcategory`, {
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

  //Function For Adding New product To The Quotation
  const [nqprodData, setNqprodData]=useState({nqpquantity:"", nqpPPP:""})
  const addnewproducttoquot=async(id)=>{
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

        if(apicategoryId=="" || categoryName=="" || apiproductId=="" || productName=="" || nqprodData.nqpquantity=="" || nqprodData.nqpPPP=="")
        {
          setError("Please Enter Right Information");
          document.getElementById("errorModal").click();
        }
        else{
          const response=await fetch(`http://localhost:5000/api/quotation/addproduct/${id}`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({categoryId:apicategoryId, categoryName:categoryName, productId:apiproductId, productName:productName, quantity:nqprodData.nqpquantity, perPicePrice:nqprodData.nqpPPP})
          })
          const json=await response.json();
          if(json.success)
          {
            document.location.reload();
          }
          else{
            setError(json.error);
            document.getElementById("errorModal").click();
          }
    }
  }

   //For New Product's Quantity And ppp
   const onChange3=(event)=>{
    setNqprodData({...nqprodData, [event.target.name]: event.target.value})
   }

  const handleAddnewModal=async(id)=>{
    getCategoryData();
    setnewProdQid(id);
  }

  //For Adding The Whole Order To The Sales Order
  const [datatosales, setdatatosales]=useState({brokername:"", paymentNum:"", dispatchDay:"", dispatchMonth:"", dispatchYear:"", comment:""})
  const onChange4=(event)=>{
    setdatatosales({...datatosales, [event.target.name]: event.target.value})
  }
  const [tosalesId, setTosalesId]=useState(0);
  const sendItToSales=async()=>{
    if(datatosales.brokername=="" || datatosales.paymentNum=="" || datatosales.dispatchDay=="" || datatosales.dispatchMonth=="" || datatosales.dispatchYear=="")
    {
      setError("Please Enter Right Information");
      document.getElementById("errorModal").click();
    }
    else{
      const response=await fetch(`http://localhost:5000/api/quotation/addtosales/${tosalesId}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({brokerName:datatosales.brokername, paymentTerm:datatosales.paymentNum, comment:datatosales.comment, mainDispatchDate:datatosales.dispatchDay+"/"+datatosales.dispatchMonth+"/"+datatosales.dispatchYear})
        })
        const json=await response.json();
        if(json.success)
        {
          getQData();
        }
        else{
          setError(json.error);
            document.getElementById("errorModal").click();
        }
    }
  }

  const [newprodQid, setnewProdQid]=useState(0);
  let QdelqId=0, i=1;
  return (

    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      {/* AddToSalesModal */}
      <div class="modal fade" id="AddToSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adding To Sales Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Been Added To The Sales Order, The Action Cannot Be Reverted
            <hr/>
            <form>
                <div class="mb-3">
                    <label class="form-label">Enter Broker Name Who Booked Order</label>
                    <input type="text" name="brokername" value={datatosales.brokername} onChange={onChange4} class="form-control text-center" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Payment Terms(In Days)</label>
                    <input type="number" name="paymentNum" value={datatosales.paymentNum} onChange={onChange4} style={{width: '75px', height: '32px'}} class="form-control text-center mx-auto" id="comp" aria-describedby="emailHelp" required />
                    <label class="form-label">Enter Average Dispatch Date Of Sales Order</label>
                    <div className='row mx-auto'>
                    <select id='dispatchDate' name='dispatchDay' onChange={onChange4} style={{width: '63px', marginLeft: '125px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                    <option selected value={1}>1</option>
                      <option selected value={2}>2</option>
                      <option selected value={3}>3</option>
                      <option selected value={4}>4</option>
                      <option selected value={5}>5</option>
                      <option selected value={6}>6</option>
                      <option selected value={7}>7</option>
                      <option selected value={8}>8</option>
                      <option selected value={9}>9</option>
                      <option selected value={10}>10</option>
                      <option selected value={11}>11</option>
                      <option selected value={12}>12</option>
                      <option selected value={13}>13</option>
                      <option selected value={14}>14</option>
                      <option selected value={15}>15</option>
                      <option selected value={16}>16</option>
                      <option selected value={17}>17</option>
                      <option selected value={18}>18</option>
                      <option selected value={19}>19</option>
                      <option selected value={20}>20</option>
                      <option selected value={21}>21</option>
                      <option selected value={22}>22</option>
                      <option selected value={23}>23</option>
                      <option selected value={24}>24</option>
                      <option selected value={25}>25</option>
                      <option selected value={26}>26</option>
                      <option selected value={27}>27</option>
                      <option selected value={28}>28</option>
                      <option selected value={29}>29</option>
                      <option selected value={30}>30</option>
                      <option selected value={31}>31</option>
                    </select>
                    <select id='dispatchMonth' name='dispatchMonth' onChange={onChange4} style={{width: '63px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                    <option selected value={0}>0</option>
                      <option selected value={1}>1</option>
                      <option selected value={2}>2</option>
                      <option selected value={3}>3</option>
                      <option selected value={4}>4</option>
                      <option selected value={5}>5</option>
                      <option selected value={6}>6</option>
                      <option selected value={7}>7</option>
                      <option selected value={8}>8</option>
                      <option selected value={9}>9</option>
                      <option selected value={10}>10</option>
                      <option selected value={11}>11</option>
                      <option selected value={12}>12</option>
                    </select>
                    <select id='dispatchYear' name='dispatchYear' onChange={onChange4} style={{width: '75px', marginLeft: '5px'}} class="form-select form-select-sm" aria-label=".form-select-lg example">
                      <option selected value={2022}>2022</option>
                      <option selected value={2023}>2023</option>
                      <option selected value={2024}>2024</option>
                    </select>
                    </div>
                    <label class="form-label">Enter Comment(If Any)</label>
                    <textarea name="comment" value={datatosales.comment} onChange={onChange4} class="form-control text-center" id="comment" aria-describedby="emailHelp" required />
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{sendItToSales()}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* Delete Quotation Modal */}
      <div class="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Is Been Deleted, It Cannot Be Recovered
          </div>
          <div class="modal-footer">
            <button type="button" onClick={QdelqId=0} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{makedeletedquotation(QdelqId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* AddQuotation Modal */}
      <div class="modal fade" id="AddQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Quotataion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Enter The Name Of Company To Whom Quotation Is To Be Given</label>
                                <input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" value={newqdata.compName} onChange={onChangeForNewQ} required />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{addquotation()}} class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}
      {/* Modal Code */}
      {/* <!-- Button trigger modal --> */}
<button type="button" id="errorModal" class="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Quotation Page Error</h5>
        </div>
      <div class="modal-body">
        {showError}
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Understood</button>
      </div>
    </div>
  </div>
</div>
      {/*  */}

      <h2 className='pt-3'><strong>Your Given Quotations</strong></h2>
      <div className='row d-flex justify-content-center'>

        {Qdata.map((QcmpDetail)=>{
          return  <div key={QcmpDetail._id} className={`col-md-6 my-4`}>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title"><strong>Quotation #{i++}</strong></h4>
              <p class="card-text"><strong>Dealer: {QcmpDetail.dealer}, QuotationId: {QcmpDetail.quotationId}</strong></p>
              <div className='table-responsive'>
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Product Category</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <GetQuotationProducts key={QcmpDetail._id+1} quotationId={QcmpDetail.quotationId}/>
              </table>
              </div>
              <p>Total Quotation Amount: <strong>{QcmpDetail.totalAmount}</strong></p>
              <hr/>
               {/* Add New Item/Product Modal */}
      <div class="modal fade" id="AddToQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Select The Product Category</label>
                                <div class="dropdown">
                                    <select id='selectCategory' class="form-select form-select-sm mb-3" aria-label=".form-select-lg example" onChange={async(event)=>{productbycategoryIdforModal(event.target.value)}}>
                                        <option selected value={-1}>Select</option>
                                        {categoryModal.map((cat) => {
                                            return <option value={cat.categoryId}>{cat.pcname}</option>
                                        })}
                                    </select>
                                </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Select The Product</label>
                                    <div class="dropdown">
                                        <select id='products' class="form-select form-select-sm mb-3" aria-label=".form-select-lg example" onChange={async(event)=>{setapiproductId(event.target.value)}}>
                                            <option selected value={-1}>Select</option>
                                            {productsOfCatModal.map((itm) => {
                                                return <option value={itm.productId}>{itm.productName}</option>
                                            })}
                                        </select>
                                    </div>
                                    </div>

                                    <label class="form-label">Enter Quantity Of Product</label>
                                    <input type="number" name= "nqpquantity" value={nqprodData.nqpquantity} onChange={onChange3} class="form-control text-center" id="Itemquty" required />
                                    <label class="form-label">Enter Per-Piece Price</label>
                                    <input type="number" name="nqpPPP" value={nqprodData.nqpPPP} onChange={onChange3} class="form-control text-center" id="Itemprice" required />
                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>(addnewproducttoquot(newprodQid))} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>

      {/*  */}
              <button type="button" onClick={()=>{handleAddnewModal(QcmpDetail._id)}} class="btn" data-bs-toggle="modal" data-bs-target="#AddToQuotationModal"><img src={add_item_image} width='120'></img></button>
              <hr />
              <button type="button" onClick={()=>{setTosalesId(QcmpDetail._id)}} class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#AddToSalesModal">Add To Sales Order</button>
              <button type="button" onClick={QdelqId=QcmpDetail._id} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</button>
              {/* <!-- Button trigger modal --> */}
            </div>
          </div>
        </div>
        })}

        <div className={`col-md-5 my-4`}>
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddQuotationModal"><img src={plus} width='55'></img><strong> Add New Quotation</strong></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageQuotations
