import React from 'react'

export const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
	const [reEnteredPassword, setReEnteredPassword] = useState("")

  return (
    <div>
        <h1>Register</h1>
        <form>
            <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required onChange={(e) => setReEnteredPassword(e.target.value)}/>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}
