// Home.js
import React, { useEffect } from 'react';
import '../style/Home.css'
import { MdInsertEmoticon } from "react-icons/md";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolled');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="container-fluid p-0 mt-lg-5 ">
      <section className="services  text-center py-5 p-3">
       <div className="title w-50 mx-auto">
       <h1 className="mb-4 mt-lg-5 text-white">What You Get with Our Services</h1>
        <p className="mb-5 text-white">
          We craft extremely responsive websites that are tailored specifically to take care of your e-firm be it educational, Real Estate, Hotels & SPA websites and others as well. In a nutshell? We’ll help you get the best.
          Below is the list of websites that we build exclusively meeting our client’s demand:
        </p>
       </div>
        <div className="row mx-auto">
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card  py-4 ">
              <div className="card-body">
              <MdInsertEmoticon className='icon-emogi mb-3 fs-3 text-primary' />

                <h3 className="card-title">HealthCare Website</h3>
                <p className="card-text">We create engaging, smart websites that manage your services better through our amazing healthcare web solutions. Our skilled... </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">Real Estate Website</h3>
                <p className="card-text">Get the top-of-the-line real estate websites that meet your property bookings, home loans...</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">Law Firm Websites</h3>
                <p className="card-text">Hire us, a leading IT firm to get a reliable law firm website, giving you a smooth way to communicate with others and... </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">Travel Websites</h3>
                <p className="card-text">Embark on your journey with interactive travel websites. Discover, plan, and experience the world like never before.</p>
              </div>
            </div>
          </div>
          </div>
          <div className='row mx-auto mt-lg-5'>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">Educational Websites</h3>
                <p className="card-text">Get professional and reliable e-learning websites that ensure student engagement. We have ready-made structures & learning... </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">E-commerce Websites</h3>
                <p className="card-text">Boost your e-commerce sales and revenue by embedding a delightful product information management system. We build fast...</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">MLM Website</h3>
                <p className="card-text">Build a platform of easy reward and track their stats to calculate the ROI of your investments to make proper decisions...</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col col-sm-12 mb-4">
            <div className="card py-4">
              <div className="card-body">
                <MdInsertEmoticon className='mb-3 fs-3 text-primary' />

                <h3 className="card-title">CMS Website</h3>
                <p className="card-text">We create blogging websites and portfolio websites as per your requirements. Helping you build and customize without hassle...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="offerings text-center py-5">
        <h4 className="text-warning ">Comprehensive Service Offerings</h4>
        <h2 className="mb-4">What Included With Our Services</h2>
        <div className="offerings-content w-75 mx-auto d-flex flex-column align-items-center">
          <h3 className="">Faster-Loading & Budget-Friendly Web Development</h3>
          <p className="mb-4 text-muted">
            We deploy cutting-edge website development technologies like PWA and JAMstack, combining the best frontend technologies in the web development process like UI/UX design, Frontend and Backend...
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
