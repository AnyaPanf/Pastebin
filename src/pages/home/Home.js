import { useState, useEffect, useContext } from "react"
import './Home.css'
import { ThemeToggle } from "../../components/themeToggle/ThemeToggle";
import moment from "moment/moment";
import { useDispatch, useSelector } from 'react-redux';
import { sendRecord, getAllPublicRecords } from "../../redux/action";
import { ThemeContext } from '../../App'
import { PastePage } from "../pastePage/PastePage";
import { NavLink } from "react-router-dom";

const initialValue = {
    text: "",
    title: "",
    isPrivate: "Public",
    deadLine: moment().add(1, 'hour').format(),
}

export const Home = () => {
    const newPostId = useSelector((state) => state.createOneRecord)
    const allRecords = useSelector((state) => state.getAllPublicRecords)
    const dispatch = useDispatch()
    const [newPost, setNewPost] = useState(initialValue)
    const [lastTenPosts, setLastTenPosts] = useState([])
    const { theme, toggleTheme } = useContext(ThemeContext);

    console.log(lastTenPosts);
    const getTenLastPosts = (records) => {
        setLastTenPosts(records.slice(records.length - 10, records.length))
    }

    useEffect(() => {

        dispatch(getAllPublicRecords())
        getTenLastPosts(allRecords)
    }, [])

    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const sendPost = () => {
        if (newPost.isPrivate === "Public") {
            newPost.isPrivate = false
        } else {
            newPost.isPrivate = true
        }

        if (newPost.deadLine === "1 hour") {
            newPost.deadLine = moment().add(1, 'hour').format();
        } else if (newPost.deadLine === "1 day") {
            newPost.deadLine = moment().add(1, 'day').format();
        } else if (newPost.deadLine === "1 week") {
            newPost.deadLine = moment().add(1, 'week').format();
        } else if (newPost.deadLine === "1 month") {
            newPost.deadLine = moment().add(1, "months").format();
        }
        dispatch(sendRecord(newPost))
    }

    return (
        <section className="home">
            <div className="container">
                <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
                <div className="home__wrapper">
                    <div className="home__content">
                        <div className="home__head">
                            <h2 className="home__title home__title-paste">New Paste</h2>
                            <div className="home__color home__color-blue"></div>
                        </div>
                        <div className="home__setting"><span >Title:</span> <input className="home__desc" placeholder="Your paste title" type="text" name="title" onChange={handleChange} /></div>
                        <div className="home__setting"><span >Paste Exposure:</span> <select name="isPrivate" onChange={handleChange} defaultValue={initialValue.isPrivate} className="home__input">
                            <option>Public</option>
                            <option>Private</option>
                        </select></div>
                        <div className="home__setting"><span >Deadline:</span>
                            <select name="deadLine" type="date" onChange={handleChange} className="home__input">
                                <option>1 hour</option>
                                <option>1 day</option>
                                <option>1 week</option>
                                <option>1 month</option>
                            </select></div>
                        <div className="home__paste"><input className="home__text" placeholder="Write something..." name="post" type="text" onChange={handleChange} /></div>
                        <div><button name="date" onClick={sendPost} className="home__submit">Paste</button></div>
                    </div>
                    <div className="home__latest">
                        <div className="home__head">
                            <h2 className="home__title home__title-latest">Latest Pastes</h2>
                            <div className="home__color home__color-green"></div>
                        </div>
                        <div className="home__post">
                            {lastTenPosts.map((post) => {
                                return <div className="home__topic"><NavLink to='/post' id={post.id}>{post.title}</NavLink>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


