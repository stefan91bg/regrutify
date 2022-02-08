import React, { useContext } from 'react';
import './header.scss'
import { Link } from 'react-router-dom'
import { authCtx } from '../../App'

function Header() {
  const { setToken } = useContext(authCtx)

  return (
    <div className="header">
      <Link to='/'><h1>Regrutify</h1></Link>
      {
        localStorage.getItem('token') ?
          <Link to='/'><button onClick={() => {
            setToken('')
            localStorage.clear()
          }}>LOGOUT</button></Link> :
          <Link to='/login'><button>LOGIN</button></Link>
      }
    </div>
  );
}

export default Header;