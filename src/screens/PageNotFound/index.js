import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function PageNotFound() {
    const navigate = useNavigate()
  return (
    <div className="page-not-found">
        <h1>Oops!</h1>
        <h3>404 - PAGE NOT FOUND</h3>
        <p>The page you are looking for might be removed or temporarily unavailable</p>
        <button onClick={() => navigate('/')}>GOTO HOMEPAGE</button>
    </div>
  )
}
