// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../style/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 100],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
    <div className="container-fluid container-dashboard mt-lg-5 bg-secondary">
    <div className="row row-dashboard mt-lg-5  mx-auto ">
        <div className="col-md-3 ">
          <div className="card  card-dashboard text-white bg-primary mb-3">
            <div className="card-body ">
              <h5 className="card-title text-white">Primary Card</h5>
              <p className="card-text text-white">Some quick example text to build on the card card-dashboardtitle and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-dashboard text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title text-white">Secondary Card</h5>
              <p className="card-text text-white">Some quick example text to build on the card card-dashboardtitle and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-dashboard text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title text-white">Success Card</h5>
              <p className="card-text text-white">Some quick example text to build on the card card-dashboardtitle and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-dashboard text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title text-white">Danger Card</h5>
              <p className="card-text text-white">Some quick example text to build on the card card-dashboardtitle and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid   ">
     

      <div className="row row-dashboard">
        <div className="col-md-12">
          <div className="car card-dashboard mb-4">
            <div className="card-header">Line Chart</div>
            <div className="card-body">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Dashboard;
