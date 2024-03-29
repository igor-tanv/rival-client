import React, { useState } from "react"
import { Link } from "react-router-dom"

import { apiFetch } from "../../modules/api-fetch"

import redirectToProfile from "../../hooks/redirect-to-profile"

import TextField from "../../ui/text-field"
import Button from "../../ui/button"

export default function Login({ }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault();
    setError(null)
    apiFetch("sessions", "POST", {
      email, password
    }).then(json => {
      if (json.error) {
        setError(json.error)
        setEmail("")
        setPassword("")
        return
      }
      redirectToProfile(json.id, json.jwt)

    }).catch(error => {
      setError("Sorry, there was a server error, please contact igor!")

      return
    })
  }


  return (
    <div className='login-container'>
      <form onSubmit={onSubmit}>
        <h3>Sign in<br /> to your <span>Rival</span> account</h3>
        {error && <span className="error">{error}</span>}
        <TextField
          type='text'
          label='Your email'
          value={email}
          onChange={(val) => setEmail(val)}
        />

        <TextField
          type='password'
          label='Password'
          value={password}
          onChange={(val) => setPassword(val)}
        />
        <div style={{ textAlign: "center" }}>
          <Button type='submit' style={{ minWidth: "50vw" }}>Log in</Button>
        </div>
      </form>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <Link to="/password/email">
          <h6>Forgot Password</h6>
        </Link>
      </div>

    </div>
  )
}