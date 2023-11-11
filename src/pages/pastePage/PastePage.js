import './PastePage.css'
import { useState, useEffect, useContext } from "react"
import { ThemeContext } from '../../App'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export const PastePage = ({ title, price, category }) => {
    const theme = useContext(ThemeContext);

    const oneRecord = useSelector((state) => state.getOneRecord)
    console.log(oneRecord)

    return (
        <section className="post">
            <div className="container">
                <div className="post__wrapper">
                    <div className='post__content'>
                        <h3 className="post__title">{ oneRecord.title}</h3>
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
