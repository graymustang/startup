import React, { useEffect, useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCurrentUser(null);
  }, []);

  //Mock login
  async function handleLogin(event) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: normalizedEmail,
          password: password,
        }),
      });

      if (!response.ok) {
        setMessage("Invalid email or password");
        return;
      }

      const user = await response.json();

      setCurrentUser(user.email);
      setPassword("");
      setMessage("Login successful");
    } catch {
      setMessage("Unable to connect to the server");
    }
  }

  //Mock account creation
  async function handleCreateAccount() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("Please enter an email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: normalizedEmail,
          password: password,
        }),
      });

      if (response.status === 409) {
        setMessage("An account with this email already exists.");
        return;
      }

      if (!response.ok) {
        setMessage("Unable to create account");
        return;
      }

      const user = await response.json();

      setCurrentUser(user.email);
      setPassword("");
      setMessage("Account created successfully");
    } catch {
      setMessage("Unable to connect to the server");
    }
  }

  //Logout

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setCurrentUser(null);
      setEmail("");
      setPassword("");
      setMessage("You have been logged out.");
    } catch {
      setMessage("Unable to log out. Please try again.");
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        {!currentUser && (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>

              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>{" "}
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </form>
        )}

        {message && <p className="mt-3">{message}</p>}

        <div className="current-user">
          <h3>Current User</h3>

          {currentUser ? (
            <>
              <p>
                Logged in as: <span>{currentUser}</span>
              </p>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p>Not logged in</p>
          )}
        </div>
      </div>
    </section>
  );
}
