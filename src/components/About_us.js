import React from 'react'
import {Link} from'react-router-dom';
function About_us() {
  return (
    <div className='bg-warning'>
        <h1 className='pt-3'><strong>About Us</strong></h1>
        <div className='container'>
        <p className='pt-3'><strong>NDS SOFTWARE & DESGINING is a leading Responsive Web development and designing professional company in Ahmedabad. We provide qualitative services and customer support. Our professional and expert team provides excellent services to our customers which matches with their requirements. We also provide the attractive and creative customize designing and development Site.</strong></p>
        <p><strong>NDS SOFTWARE & DESGINING is a leading Website Design Company in India and is known for producing most responsive Web Designs. With excellence on focus every time, we strive hard to deliver best of the best quality to you every time you deal with us!</strong></p>
        <p><strong>NDS SOFTWARE & DESGINING is a leading Website Designing and Website Development Company in India. Kaival Infotech has a number of experts or website designers whose provide the best services to your website in Ahmedabad, Baroda, Anand, Ankleshwar etc.</strong></p>
        <p><strong>We design your new websites and also redesign your existing websites. We provide customized services according to customer needs and requirements. Our professional team provides the best web development services in india.</strong></p>
        <h3><strong>We Design the websites of the type :</strong></h3>
        <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Responsive Website</strong></li>
                    <li className="list-group-item"><strong>Ecommerce Website</strong></li>
                    <li className="list-group-item"><strong>Website Re Designing</strong></li>
                    <li className="list-group-item"><strong>Dynamic & Static Web Designing</strong></li>
                </ul>
       </div>
        <Link type="button" to="/contactus" className="btn btn-success px-5 my-5"><strong>Contact Us</strong></Link> 
    </div>
  )
}

export default About_us
