import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.scss'
export const AppHeader = () => {
  return (
    <header className='header'>
        <div className='container header__container'>
            <h1 className='header__title'>GameLandia</h1>
            <nav className='header__nav-bar nav-bar'>
                <ul className='nav-bar__links'>
                    <li><Link className='nav-bar__link' to='/'>Main</Link></li>
                    <li className='nav-bar__link'>Games</li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
