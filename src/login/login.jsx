import React, { useEffect, useState } from 'react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')

    if (savedUser) {
      setCurrentUser(savedUser)
    }
  }, [])

  //Mock login
  function handleLogin(event) {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase();
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]')

    if (!normalizedEmail || !password) {
      setMessage('Please enter email and password')
      return
    }

    if (!accounts.includes(normalizedEmail)) {
      setMessage('Account not found. Please create an account.')
      return
    }

    //Mock authentication
    localStorage.setItem('currentUser', normalizedEmail)
    setCurrentUser(normalizedEmail)
    setPassword('')
    setMessage('Login successful')
  }

  //Mock account creation
  function handleCreateAccount() {
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      setMessage("Please enter an email and password.")
      return;
    }
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]")

    if (accounts.includes(normalizedEmail)) {
      setMessage("An account with this email already exists.")
      return
    }

    accounts.push(normalizedEmail);
    localStorage.setItem("accounts", JSON.stringify(accounts))
    localStorage.setItem("currentUser", normalizedEmail)

    setCurrentUser(normalizedEmail)
    setPassword('')
    setMessage('Account created successfully')
  }

  //Logout
  function handleLogout() {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    setEmail('')
    setPassword('')
    setMessage('You have been logged out.')
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
