import main_img from "./main.png"
import logo from './logo_black.png'
import './Main.css'
import { Auth } from "../../components/auth/Auth"
import { Registration } from "../../components/registration/Registration"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"

export const Main = () => {
    const [openAuth, setOpenAuth] = useState(false)
    const [openReg, setOpenReg] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "SET_A_LOGIN", token: Cookies.get("token") })
    }, [])

    const handleAuth = () => {
        setOpenAuth(!openAuth)
    }

    const handleReg = () => {
        setOpenReg(!openReg)
    }

    return (
        <div>
            <section className="topbar">
                <div className="container">
                    <div className="topbar__wrapper">
                        <div className="topbar__logo">
                            <div className='topbar__img'>
                                <img src={logo} />
                            </div>
                            <p className='topbar__name'>Pastebin Light</p>
                        </div>
                        <div className='topbar__btns'>
                            <button type='submit' className='topbar__btn topbar__btn-signin' onClick={handleAuth}>Sign in</button>
                            <button type='submit' className='topbar__btn topbar__btn-join' onClick={handleReg}>Join</button>
                        </div>
                    </div>
                    <div style={{ display: openAuth ? 'block' : 'none' }}>
                        <Auth handleAuth={handleAuth} />
                        <div className='topbar__overlay'></div>
                    </div>
                    <div style={{ display: openReg ? 'block' : 'none' }}>
                        <Registration handleReg={handleReg} />
                        <div className='topbar__overlay'></div>
                    </div>
                </div>
            </section>

            <main className="main">
                <div className="container">
                    <div className="main__wrapper">
                        <div className="main__text">
                            <p className="main__title">A simple app to share your notes</p>
                            <button className="main__btn" onClick={handleReg}>Create your account</button>
                            <a className="main__signin" onClick={handleAuth}>Already a member? Sign in</a>
                        </div>
                        <div className="main__img">
                            <img src={main_img} />
                            <div className="main__animation main__animation-pink float"></div>
                            <div className="main__animation main__animation-green float"></div>
                            <div className="main__animation main__animation-yellow float"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
