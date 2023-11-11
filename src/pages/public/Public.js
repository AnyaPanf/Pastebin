import './Public.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Pagination } from "../../components/pagination/Pagination"
import { ThemeContext } from '../../App'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPublicRecords } from '../../redux/action'
import Cookies from 'js-cookie'

export const Public = () => {
  const [pasteDetail, setPasteDetail] = useState("")
  const [user, setUser] = useState([])
  const [pasteDelete, setPasteDelete] = useState("")
  const [publicPastes, setPublicPastes] = useState([])
  const theme = useContext(ThemeContext);
  const allPublicRecord = useSelector((state) => state.getAllPublicRecords)
  const pastesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPaste = currentPage * pastesPerPage;
  const indexOfFirstPaste = indexOfLastPaste - pastesPerPage;
  const currentPastes = allPublicRecord.slice(indexOfFirstPaste, indexOfLastPaste)
  const dispatch = useDispatch()
console.log(allPublicRecord)
  useEffect(() => {
    dispatch(getAllPublicRecords())
  }, [])

  const getOneRecord = async (id) => {
    let {data} = await axios(`https://29e4-212-42-120-155.ngrok-free.app/api/records/records/${id}`,
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
 
  console.log(publicPastes);

  return (
    <section className="public">
      <div className="container">
        <div className="public__titlegroup">
          <h2 className="public__title">Public Pastebin</h2>
          <div className="public__color"></div>
        </div>
        <div className="public__wrapper">
          <div className="public__table">
            <div className="public__head">
              <p>Paste Title</p>
              <p>Date Created</p>
              <p>Deadline</p>
            </div>
            {currentPastes.map((paste) => {
              return <div className="public__lines">
                <NavLink to='/post' className="public__line public__line-title" id={paste.id} onClick={handleDetails}>{paste.title}</NavLink>
                <NavLink to='/post' className="public__line" id={paste.id} onClick={handleDetails}>{paste.dateCreated.slice(0, 10)}</NavLink>
                <NavLink to='/post' className="public__line" id={paste.id} onClick={handleDetails}>{paste.deadLine.slice(0, 10)}</NavLink>
              </div>
            })}
          </div>
          <Pagination
            pastes={allPublicRecord}
            pastesPerPage={pastesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  )
}
