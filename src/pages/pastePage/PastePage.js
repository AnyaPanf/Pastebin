import './PastePage.css'
import close_black from './close_black.png'
import close_white from './close_white.png'
import { useState, useEffect, useContext } from "react"
import { ThemeContext } from '../../App'

export const PastePage = ({ title, price, category }) => {
    const theme = useContext(ThemeContext);

    return (
        <section className="post">
            <div className="container">
                <div className="post__wrapper">
                    <div className='post__content'>
                        <h3 className="post__title">{title}</h3>
                        <div className="post__subtitle"><span>Privacy: </span><p>{title}</p></div>
                        <div className="post__subtitle"><span>Deadline: </span><p>{price}</p></div>
                        <div className="post__subtitle"><span>Paste text: </span><p>{category}</p>
                        </div>
                    </div >

                    <div className='post__circle post__circle-green'></div>
                    <div className='post__circle post__circle-violet'></div>
                    <div className='post__circle post__circle-blue'></div>
                    <div className='post__circle post__circle-pink'></div>
                    <div className='post__circle post__circle-yellow'></div>
                    <div className='post__circle post__circle-orange'></div>
                    <div className='post__circle post__circle-lghtblue'></div>
                </div>
            </div>
        </section >
    )
}
