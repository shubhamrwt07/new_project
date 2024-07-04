import React from 'react';
import '../style/Footer.css'; // Import the CSS file for styling
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer fixed-ottom">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12 col-lg-4 ">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
          <div className="col-12 px-lg-5 col-lg-4 col-md-4 col-sm-12 d-flex flex-column">
      <Link className='nav-link text-white' to='/'>Home</Link>
      <Link className='nav-link text-white' to='/dashboard'>Dashboard</Link>
      <Link className='nav-link text-white' to='/button'>Button</Link>
      <Link className='nav-link text-white' to='/product'>Product</Link>
    </div>
          <div className="col-md-4 px-5 col-lg-4 col-12">
            <h3>Contact Us</h3>
            <p className='m-0'>Email: pankajpundir228gmail.com</p>
            <p>Phone: +1234567890</p>
            <div className="social-media">
      <FaInstagram className='icon instagram' />
      <FaFacebook className='icon facebook' />
      <FaWhatsapp className='icon whatsapp' />
      <FaTwitter className='icon twitter' />
    </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
