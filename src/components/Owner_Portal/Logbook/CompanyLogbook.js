import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {ViewActions} from '../../../store/view-slice'

function CompanyLogbook() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    //Function For Fetching Data Of Logbook
    const [logbookData, setLogBookData]=useState([])
    const [noData, setnoData]=useState("no");
    const getLogbookData=async()=>{
        const response=await fetch('http://localhost:5000/api/getdata/getlogbookdata', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken')
            }
        })
        const data=await response.json();
        if(data.length==0)
        {
            setnoData("yes");
        }
        // Convert (js array) to (json object)
        let JsonObject = await JSON.parse(JSON.stringify(data.comment));

        // JsonObject
        setLogBookData(JsonObject);
    }

    //Checking
    const pageStarting=()=>{
        dispatch(ViewActions.do_view_owner())
    }
    const Check=()=>{
        if(localStorage.getItem('cmptoken')==null)
        {
            navigate("/companylogin")
        }
    }

    useState(()=>{
        getLogbookData();
    })

    let i=1; 
    return (
        <div className='bg-warning pb-5'>
          {Check()}
          {pageStarting()}
          <h1 className='py-5'><strong>OWNER PORTAL COMPANY'S DATA CHANGES LOGBOOK</strong></h1>    
          <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
          <h6 className='pt-3'  style={{color: 'red'}}><strong>*Here User:-1 Indicates Changes Are Made By Company Itself</strong></h6>
          <h6 className='pt-3'  style={{color: 'red'}}><strong>*Here The format Of Details Is As: userId: Change-Done Date Time</strong></h6>
          <div className='row d-flex justify-content-center'>
          <div className='row d-flex justify-content-center'>
          <div className={`col-md-10 my-4`}>
          
          <div className='table-responsive'>
                    <table className='table table-hover'>
                    <thead>
                      <tr>
                        <th scope="col"><strong>Sr. No.</strong></th>
                        <th scope="col"><strong>Detais Of Change Made</strong></th>
                      </tr>
                    </thead>
                    <tbody>
                    {noData=="yes"?<><hr/><p><strong>No Products Exists, Add To View</strong></p></>:logbookData.map((de)=>{
                        return <tr>
                        <td><strong>{i++}.</strong></td>
                        <td><strong>{de}</strong></td>
                        {/* <hr/> */}
                        </tr>
                     })}
                     </tbody>
                  </table>
                </div>
          </div>
      </div>
          </div>
          </div>
        </div>
      )
    }

export default CompanyLogbook
