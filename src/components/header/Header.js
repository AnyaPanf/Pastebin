import './Header.css'
import { ThemeContext } from '../../App'
import { useContext } from 'react'
import logo from './logo_white.png'
import logo_black from './logo_black.png'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { BurgerMenu } from '../menu/BurgerMenu'

export const Header = () => {
    const theme = useContext(ThemeContext);

    const dispatch = useDispatch()
    const handleClick = () => {
        Cookies.remove('token')
        dispatch({ type: "SET_A_LOGIN", token: "" })
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__logo">
                        <div className='header__img'>
                            <img src={theme.theme === "light" ? logo_black : logo} />
                        </div>
                        <p className='header__name'>Pastebin Light</p>
                    </div>
                    <nav className='header__btns'>
                        <NavLink to='/' className='header__btn'>Home</NavLink>
                        <NavLink to='/public' className='header__btn'>Public pastes</NavLink>
                        <NavLink to='/acc' className='header__btn'>Your pastes</NavLink>
                    </nav>
                    <NavLink to='/'><button type='submit' className='header__btn header__btn-logout' onClick={handleClick}>Log out</button></NavLink>
                    <BurgerMenu />
                </div>
            </div>
        </header>
    )
}
