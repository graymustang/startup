import React from "react";

export function Login() {
    return (<div class="login-card">
        <h2>Login</h2>

        <form class="login-form">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your email"/>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Enter your password"/>
            </div>

            <button type="submit" class="btn btn-success">Login</button>
            <button type="button" class="btn btn-outline-success">Create Account</button>
        </form>

        <div class="current-user">
            <h3>Current User</h3>
            <p>Logged in as: <span>Username</span></p>
        </div>
    </div>
    )
}