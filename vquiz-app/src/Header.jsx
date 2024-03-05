import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling

function Header({ isLoggedIn, onLogout }) {
    return (
        <header className="header">
            <div className="header-brand">
                <h1>Brand Name</h1>
            </div>
            <div className="header-buttons">
                {isLoggedIn ? (
                    <button onClick={onLogout}>Logout</button>
                ) : (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
