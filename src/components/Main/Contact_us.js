import React from 'react'
import {useDispatch} from 'react-redux';
import {ViewActions} from '../../store/view-slice';
import map_image from '../../images/main_images/map_image.png'

function Contact_us() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main())
    window.scrollTo(0, 0);
  }
  return (
    <div className='bg-warning'>
        {pageStarting()}
        <img src={map_image} style={{width:'100%'}}></img>
        <div className='container'>
        <h1 className='pt-4 text-right'><strong>Contact US</strong></h1>
        <h1 className='text-danger'><strong>NDS SOFTWARE & DESGINING</strong></h1>
        <h4 className='text-left text-danger'><strong>B/102 Ghanshyam Park Society,<br/>Canal Road, Ghodasar,<br/>
        Ahmedabad-50, Gujrat, India<br/></strong></h4>
        <div className='container'>
        <hr/>
        </div>
        <h4><strong>Mobile: 8980552390<br/>Mail: neeldevenshah@gmail.com</strong></h4><br/>
        </div>
    </div>
  )
}

export default Contact_us
