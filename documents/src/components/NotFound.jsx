import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

function NotFound () {
  return (
    <div>
        <main className='container'>
            <div className="row justify-content-center mt-3 mb-2">
                <div className="col-md-8">
                    <h2 className='text-center fw-bold text-danger'> This Page Not Found!  </h2>
                    <p className='text-center'>
                        <Link className='Link' to="/"> Click here to go to main page </Link>
                    </p>
                </div>
            </div>
        </main>
    </div>
  )
};

export default NotFound;