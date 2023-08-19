import React, { useState } from 'react';
import { AiOutlineStock, AiFillInfoCircle, AiFillHome } from "react-icons/ai";
import "./style.css";
import { Link } from 'react-router-dom';

function Header() {
    const [info, setInfo] = useState(false);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand user-select-none">
                        <AiOutlineStock />
                        React Stock Market App
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className='nav-link' to="/">
                                <AiFillHome className='size-large' />
                            </Link>
                            <a className="nav-link cursor-pointer">
                                <AiFillInfoCircle className='size-large'
                                    onClick={() => { info === false ? setInfo(true) : setInfo(false) }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div> {info === true ? 
                    (<div className='mt-3 shadow p-3 mb-5 bg-body-tertiary rounded'>
                        <p className='fw-bold'> Welcome to React Stock Market App </p>
                        <p> You are able to search, see and add to the list which company and stock you want to see </p>
                        <p> You will see a lot of details through click on stock name at the list </p>
                        <p> Also there is a delete button for delete company from the list </p>
                        <p> toggle above-mentioned icon for open or close this information message </p>
                    </div>)
                : ""} 
            </div>
        </div>
    )
}

export default Header;