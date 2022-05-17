import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function PageUnauthorized() {
    const navigate = useNavigate()
  return (
    <div className="page-unauthorized">
        <h1>Oops!</h1>
        <h3>401 - UNAUTHORIZED ACCESS</h3>
        <p>The page needs user authorization</p>
        <button onClick={() => navigate('/')}>LOGIN NOW</button>
    </div>
  )
}
