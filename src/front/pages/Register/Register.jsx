import React from 'react'

export const Register = () => {
  return (
    <div>
        <h1>Register</h1>
        <form>
            <div>
            <label htmlFor="username">Name:</label>
            <input type="text" id="username" name="username" required />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            </div>
            <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}
