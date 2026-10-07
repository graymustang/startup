import React from "react";

export function Login() {
    return (<div className="login-card">
        <h2>Login</h2>

        <form className="login-form">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email"/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
            </div>

            <button type="submit" className="btn btn-success">Login</button>
            <button type="button" className="btn btn-outline-success">Create Account</button>
        </form>

        <div className="current-user">
            <h3>Current User</h3>
            <p>Logged in as: <span>Username</span></p>
        </div>
    </div>
    )
}