import React, { useContext, useState } from 'react'
import './login-page.scss'
import Header from '../../Components/Header/Header.jsx'
import { Redirect } from 'react-router-dom'
import { authCtx } from '../../App'
function LoginPage() {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { setToken } = useContext(authCtx)


  const logIn = () => {
    fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email: user,
        password: pass
      })
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          localStorage.setItem('token', res.accessToken)
          setToken(localStorage.getItem('token'));
        }
        else {
          setErrorMessage(res)
        }
      })
  }
  return (
    <div>
      <Header></Header>
      {localStorage.getItem('token') && <Redirect to='/admin/reports' />}
      <div className='login'>
        <label htmlFor="username" >Email: </label>
        <input type="text"
          name="username"
          onChange={(e) => setUser(e.target.value)}>
        </input>
        <label htmlFor="password">Password: </label>
        <input type="password"
          name="password"
          onChange={(e) => {
            setPass(e.target.value)
            setErrorMessage('')
          }} />
        <p>{errorMessage && `*${errorMessage}`}</p>
        <button type="submit" onClick={() => logIn()}>LOG IN</button>
      </div>
    </div>
  );
}

export default LoginPage;