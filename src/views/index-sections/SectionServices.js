import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components
const SectionServices = () => {
  
  return(
    <React.Fragment>
    <section id="services" className="container">
        <h2 className="display-4 text-center mt-5 mb-3">Our Services</h2>
        
        <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                  <img className="card-img-top" src="design.jpg" alt="Design">
                  <div className="card-body">
                    <h4 className="card-title">Design</h4>
                    <p className="card-text">Deliver the best user experience 
                    with our carefully designed responsive websites and applications!</p>
                  </div>
                  <div className="card-footer py-4">
                    <a href="#" className="btn btn-secondary">See portfolio &raquo;</a>
                  </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                  <img className="card-img-top" src="development.jpg" alt="Development">
                  <div className="card-body">
                    <h4 className="card-title">Development</h4>
                        <p className="card-text">You need software that works on every device. 
                        Leverage the latest technologies and the most powerful tools!</p>
                  </div>
                  <div className="card-footer py-4">
                    <a href="#" className="btn btn-secondary">See projects &raquo;</a>
                  </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                  <img className="card-img-top" src="analytics.jpg" alt="Analytics">
                  <div className="card-body">
                    <h4 className="card-title">Analytics</h4>
                    <p className="card-text">Consult our experts to set up proper goals and 
                    find the best stack for your next application!</p>
                  </div>
                  <div className="card-footer py-4">
                    <a href="#" className="btn btn-secondary">See testimonials &raquo;</a>
                  </div>
              </div>
            </div>
        </div>
      </section>
    <React.Fragment/>
  );
}

export default SectionServices;





{/*  function SectionServices() {
  return (
    <React.Fragment>
    <section id="services" className="container">
        <h2 className="display-4 text-center mt-5 mb-3">Our Services</h2>
        
        <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                  <img className="card-img-top" src="design.jpg" alt="Design">
                  <div className="card-body">
                    <h4 className="card-title">Design</h4>
                    <p className="card-text">Deliver the best user experience 
                    with our carefully designed responsive websites and applications!</p>
                  </div>
                  <div className="card-footer py-4">
                    <a href="#" className="btn btn-secondary">See portfolio &raquo;</a>
                  </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                  <img className="card-img-top" src="development.jpg" alt="Development">
                  <div className="card-body">
                    <h4 className="card-title">Development</h4>
                        <p className="card-text">You need software that works on every device. 
                        Leverage the latest technologies and the most powerful tools!</p>
                  </div>
                  <div className="card-footer py-4">
                    <a href="#" className="btn btn-secondary">See projects &raquo;</a>
                  </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                  <img className="card-img-top" src="analytics.jpg" alt="Analytics">
                  <div className="card-body">
                    <h4 className="card-title">Analytics</h4>
                    <p className="card-text">Consult our experts to set up proper goals and 
                    find the best stack for your next application!</p>
                  </div>
                  <div className="card-footer py-4">
                    <a href="#" className="btn btn-secondary">See testimonials &raquo;</a>
                  </div>
              </div>
            </div>
        </div>
      </section>
    <<React.Fragment>/>
  );
}  */}

