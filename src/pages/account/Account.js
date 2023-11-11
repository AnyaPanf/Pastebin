import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { ThemeContext } from '../../App'
import "./Account.css"
import { Pagination } from "../../components/pagination/Pagination"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAllUserRecords } from "../../redux/action"
import Cookies from "js-cookie"


export const Account = () => {
    const dispatch = useDispatch()
    const allUserRecords = useSelector((state) => state.getAllUserRecords)
    const theme = useContext(ThemeContext);
    const pastesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastPaste = currentPage * pastesPerPage;
    const indexOfFirstPaste = indexOfLastPaste - pastesPerPage;
    const currentPastes = allUserRecords.slice(indexOfFirstPaste, indexOfLastPaste)

    useEffect(() => {
        dispatch(getAllUserRecords())
    }, [])

    const handleDeleteUser = async () => {
        const { data } = await axios(
            // `...${e.target.id} records/records/{recordID}`
            "https://29e4-212-42-120-155.ngrok-free.app/api/users/me", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,
                "ngrok-skip-browser-warning": "69420"
            }
        }
        )
        Cookies.remove('token', 'username')
        dispatch({ type: "SET_A_LOGIN", token: "" })
    }

    const handleDelete = async (e) => {
        console.log(e.target.id);
        const { data } = await axios(
            // `...${e.target.id} records/records/{recordID}`
            `https://58bd-212-42-120-155.ngrok-free.app/api/records/records/${e.target.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,
                "ngrok-skip-browser-warning": "69420"
            }
        }
        )
    }

    const getOneRecord = async (id) => {
        let {data} = await axios(`https://58bd-212-42-120-155.ngrok-free.app/api/records/records/${id}`,
        {
          //`${apiLink}/publicRecord`
      method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get("token")}`,                            
              "ngrok-skip-browser-warning": "69420",
          }})
        dispatch({
          type: "SET_A_ONE_RECORD", oneRecord: data  })
      }
      
      const handleDetails = (e) => {
    
        getOneRecord(e.target.id)
    
        
    
      }
     

    return (
        <section className="acc">
            <div className="container">
                <div className="acc__titlegroup">
                    <h2 className="acc__title">{Cookies.get("username")}'s Pastebin</h2> <button className="acc__delete-acc" onClick={handleDeleteUser} >Delete my Account</button>
                    <div className="acc__color"></div>
                </div>
                <div className="acc__wrapper">
                    <div className="acc__table">
                        <div className="acc__head">
                            <p>Paste Title</p>
                            <p>Date Created</p>
                            <p>Deadline</p>
                            <p>Delete Paste</p>
                        </div>
                        {currentPastes.map((paste) => {
                            return <div className="acc__lines">
                                <NavLink to='/post' className="acc__line acc__line-title" id={paste.id} onClick={handleDetails}>{paste.title}</NavLink>
                                <NavLink to='/post' className="acc__line" id={paste.id} onClick={handleDetails} >{paste.dateCreated.slice(0, 10)}</NavLink>
                                <NavLink to='/post' className="acc__line" id={paste.id} onClick={handleDetails} >{paste.deadLine.slice(0, 10)}</NavLink>
                                <p className="acc__line acc__line-btn" id={paste.id} onClick={handleDelete}>DELETE</p>
                            </div>
                        })}
                    </div>
                    <Pagination pastes={allUserRecords}
                        pastesPerPage={pastesPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </section>
    )
}